// ---------------- Audio mute/unmute ----------------
const audio = document.getElementById("bg-audio");
const audioToggle = document.getElementById("audio-toggle");

// Start muted on load
window.addEventListener("load", () => {
  audio.muted = true;
  audioToggle.innerText = "🔇";
  audio.play().catch(err => console.log("Autoplay muted:", err));
});

// Only toggle when button is clicked
audioToggle.addEventListener("click", () => {
  // Toggle mute state
  audio.muted = !audio.muted;
  audioToggle.innerText = audio.muted ? "🔇" : "🔊";

  // Try to play only when unmuted
  if (!audio.muted) {
    audio.play().catch(err => console.log("Play failed:", err));
  }
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

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent triggering document click
  menuToggle.classList.toggle("active");
  navBar.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const isClickInsideMenu = navBar.contains(e.target) || menuToggle.contains(e.target);
  if (!isClickInsideMenu) {
    menuToggle.classList.remove("active");
    navBar.classList.remove("active");
  }
});


window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 800); // match transition duration
});