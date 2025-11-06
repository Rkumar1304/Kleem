// ---------------- Global Audio Control (Cross-Page + Single Active Tab + Video Sync) ----------------
const audio = document.getElementById("bg-audio");
const audioToggle = document.getElementById("audio-toggle");
const videos = document.querySelectorAll("video"); // select all videos on the page

// Cross-tab communication channel
const channel = new BroadcastChannel("audio_control_channel");
let isPrimaryTab = true;

// --- Restore saved state ---
const savedState = JSON.parse(localStorage.getItem("audioState")) || { muted: true, time: 0 };
audio.muted = savedState.muted;
audio.currentTime = savedState.time || 0;

// --- Set correct icon ---
audioToggle.innerHTML = audio.muted
  ? `<img src='assets/images/icons/icon_audio_stop.png' alt='icon' width='20' height='20' />`
  : `<img src='assets/images/icons/icon_audio_play.png' alt='icon' width='20' height='20' />`;

// --- Apply audio-to-video sync on load ---
videos.forEach((v) => {
  v.muted = true; // default
});
if (!audio.muted) {
  videos.forEach((v) => (v.muted = true)); // ensure no video sound when audio is active
}

// --- Try to play (safe autoplay) ---
audio.play().catch((err) => console.log("Autoplay muted:", err));

// --- Cross-tab sync ---
channel.postMessage({ type: "ping" }); // ask if another tab is active
channel.onmessage = (e) => {
  const { type } = e.data;

  if (type === "ping") {
    if (!audio.muted) channel.postMessage({ type: "already_playing" });
  }

  if (type === "already_playing") {
    audio.muted = true;
    isPrimaryTab = false;
    audioToggle.innerHTML = `<img src='assets/images/icons/icon_audio_stop.png' alt='icon' width='20' height='20' />`;
  }

  // 🔹 Receive updates when another tab changes mute state
  if (type === "audio_state_update") {
    const { muted } = e.data;
    audio.muted = muted;
    if (!muted) {
      audio.play().catch(() => {});
      videos.forEach((v) => (v.muted = true));
    } else {
      audio.pause();
    }
    audioToggle.innerHTML = muted
      ? `<img src='assets/images/icons/icon_audio_stop.png' alt='icon' width='20' height='20' />`
      : `<img src='assets/images/icons/icon_audio_play.png' alt='icon' width='20' height='20' />`;
  }
};

// --- Audio toggle button ---
audioToggle.addEventListener("click", () => {
  const wasMuted = audio.muted;
  audio.muted = !audio.muted;

  // 🔹 When audio is unmuted → mute all videos globally
  if (!audio.muted) {
    videos.forEach((v) => (v.muted = true));
    audio.play().catch((err) => console.log("Play failed:", err));
    isPrimaryTab = true;
    channel.postMessage({ type: "already_playing" }); // mute others
  }

  // 🔹 Update icon
  audioToggle.innerHTML = audio.muted
    ? `<img src='assets/images/icons/icon_audio_stop.png' alt='icon' width='20' height='20' />`
    : `<img src='assets/images/icons/icon_audio_play.png' alt='icon' width='20' height='20' />`;

  // 🔹 Save and broadcast state
  localStorage.setItem(
    "audioState",
    JSON.stringify({ muted: audio.muted, time: audio.currentTime })
  );
  channel.postMessage({ type: "audio_state_update", muted: audio.muted });
});

// --- Periodic playback position save ---
setInterval(() => {
  localStorage.setItem(
    "audioState",
    JSON.stringify({ muted: audio.muted, time: audio.currentTime })
  );
}, 2000);

// ---------------- Video Interaction Logic ----------------
videos.forEach((video) => {
  video.muted = true;

  // When user unmutes the video manually
  video.addEventListener("volumechange", () => {
    if (!video.muted) {
      // 🔹 Mute all other videos
      videos.forEach((v) => {
        if (v !== video) v.muted = true;
      });

      // 🔹 Pause and mute background audio
      audio.pause();
      audio.muted = true;
      audioToggle.innerHTML = `<img src='assets/images/icons/icon_audio_stop.png' alt='icon' width='20' height='20' />`;
      localStorage.setItem("audioState", JSON.stringify({ muted: true, time: audio.currentTime }));
      channel.postMessage({ type: "audio_state_update", muted: true });
    } else {
      // 🔹 Resume background audio only if user had it on before
      const state = JSON.parse(localStorage.getItem("audioState"));
      if (state && !state.muted) {
        videos.forEach((v) => (v.muted = true));
        audio.muted = false;
        audio.play().catch((err) => console.log("Resume failed:", err));
        audioToggle.innerHTML = `<img src='assets/images/icons/icon_audio_play.png' alt='icon' width='20' height='20' />`;
        localStorage.setItem("audioState", JSON.stringify({ muted: false, time: audio.currentTime }));
        channel.postMessage({ type: "audio_state_update", muted: false });
      }
    }
  });

  // Optional: when video ends, resume background music if it was on before
  video.addEventListener("ended", () => {
    const state = JSON.parse(localStorage.getItem("audioState"));
    if (state && !state.muted) {
      videos.forEach((v) => (v.muted = true));
      audio.muted = false;
      audio.play().catch((err) => console.log("Resume failed:", err));
      audioToggle.innerHTML = `<img src='assets/images/icons/icon_audio_play.png' alt='icon' width='20' height='20' />`;
      channel.postMessage({ type: "audio_state_update", muted: false });
    }
  });
});

// ---------------- Mute audio when any video play icon is clicked ----------------
document.querySelectorAll(".icon img[src*='icon_play_video']").forEach((playIcon) => {
  playIcon.addEventListener("click", () => {
    // 🔹 Pause & mute background audio
    audio.pause();
    audio.muted = true;

    // 🔹 Update toggle icon
    audioToggle.innerHTML = `<img src='assets/images/icons/icon_audio_stop.png' alt='icon' width='20' height='20' />`;

    // 🔹 Save and broadcast state
    localStorage.setItem("audioState", JSON.stringify({ muted: true, time: audio.currentTime }));
    channel.postMessage({ type: "audio_state_update", muted: true });
  });
});







//header part to fixed
const header = document.getElementById("header");
const headerscrollPoint = 100;
window.addEventListener("scroll", () => {
  if (window.scrollY > headerscrollPoint) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});

//header nav for mobile
const menuToggle = document.getElementById("menuToggle");
const navBar = document.getElementById("navBar");
const menuOverlay = document.getElementById("menu-overlay");

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent triggering document click
  const isActive = menuToggle.classList.toggle("active");
  navBar.classList.toggle("active", isActive);
  menuOverlay.classList.toggle("active", isActive);
  document.body.classList.toggle("menu-open", isActive); // 👈 Add/remove class
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const isClickInsideMenu = navBar.contains(e.target) || menuToggle.contains(e.target);
  if (!isClickInsideMenu) {
    menuToggle.classList.remove("active");
    navBar.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open"); // 👈 Remove when closed
  }
});


window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 800); // match transition duration
});