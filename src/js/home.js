// ---------------- GSAP Character + Panel Animation ----------------
window.addEventListener("load", () => {
  const character = document.getElementById("character");
  const textRef = document.getElementById("typewriter");
  const petalsContainer = document.getElementById("petals-container");
  const characterPattern = document.getElementById("character-pattern");
  const charSparkles = document.querySelector('#char-sparkles');
  const bannerStars = document.querySelector("#banner-stars");
  const landingTimelineStars = document.querySelector("#landing-timelinestars");
  let typewriterTL = null; 

  function playInitialTimeline() {
    gsap.set(character, {
      opacity: 0,
      webkitMaskImage: "radial-gradient(circle at center, black 100%, transparent 100%)",
      maskImage: "radial-gradient(circle at center, black 100%, transparent 100%)",
      webkitMaskSize: "0% 0%",
      maskSize: "0% 0%",
      webkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      webkitMaskPosition: "center",
      maskPosition: "center",
    });

    // ================= Panel 1 Timeline =================
    const panel1TL = gsap.timeline();
    panel1TL.fromTo(
      characterPattern,
      { opacity: 0 },
      { opacity: 0.5, duration: 3, ease: "power1.in" }
    );
    panel1TL.to(character, {
      duration: 3,
      opacity: 1,
      WebkitMaskSize: "300% 300%",
      maskSize: "300% 300%",
      ease: "power1.in",
    });

    return panel1TL;
  }
  
  const initialTL = playInitialTimeline();
  initialTL.eventCallback("onComplete", () => {
    startPetals();
    runTypewriter(textRef);
    startSparklesdots();
    gsap.to(character, {
      scale: 1.1,
      rotate: -5,
      duration: 10,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  });



  // ================= Typewriter Function ================= //
  function runTypewriter(el, { loop = true, onComplete = null } = {}) {
    if (typewriterTL) typewriterTL.kill();
    el.innerHTML = "";
    gsap.set(el, { opacity: 1 });

    const words = ["OM NAMO", "BHAGAWATE", "VASUDEVAYA"];
    typewriterTL = gsap.timeline({
      repeat: loop ? -1 : 0,
      repeatDelay: loop ? 0.5 : 0,
    });

    words.forEach((word, idx) => {
      //create spans for each character
      typewriterTL.add(() => {
        el.innerHTML = "";
        const chars = word.split("");
        chars.forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char === " " ? "\u00A0" : char;
          el.appendChild(span);
        });

        //Smooth linear fade across the word
        gsap.fromTo(
          el.querySelectorAll("span"),
          { opacity: 0, xPercent: 20 }, 
          {
            opacity: 1,
            xPercent: 0,
            duration: 1.2,
            ease: "power2.out",
            stagger: { each: 0, amount: 0.6 }, 
          }
        );
      });

      //Hold the word
      typewriterTL.to({}, { duration: 2 });

      //Smooth fade-out before next
      if (idx < words.length - 1) {
        typewriterTL.to(el, { opacity: 0, duration: 1, ease: "power1.inOut" });
        typewriterTL.set(el, { opacity: 1 });
      } else {
        typewriterTL.to(el, { opacity: 0, duration: 1, ease: "power1.inOut" });
      }
    });

    if (onComplete) typewriterTL.eventCallback("onComplete", onComplete);

    return typewriterTL;
  }
  // ================= end Typewriter Function ================= //


  // ================= Petals ================= //
  const petalsConfig = {
    maxPetals: 20,
    spawnInterval: 500,
    fallDuration: [15, 25],
    driftX: [-100, 100],
    petalSize: ["w-12", "h-12"],
  };
  let petalsActive = false;
  let lastPetalTime = 0;
  // Preload petals
  const petalImages = Array.from({ length: 2 }, (_, i) => `assets/images/petal/petal${i + 1}.svg`);
  const preloadedPetals = petalImages.map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });
  function startPetals() {
    if (petalsActive) return;
    petalsActive = true;
    petalsContainer.innerHTML = "";
    lastPetalTime = performance.now();
    requestAnimationFrame(animatePetals);
  }
  function stopPetals() {
    petalsActive = false;
    petalsContainer.innerHTML = "";
  }
  function animatePetals(time) {
    if (!petalsActive) return;

    const currentCount = petalsContainer.children.length;
    if (currentCount < petalsConfig.maxPetals && time - lastPetalTime > petalsConfig.spawnInterval) {
      createPetal();
      lastPetalTime = time;
    }

    requestAnimationFrame(animatePetals);
  }
  function createPetal() {
    const img = preloadedPetals[Math.floor(Math.random() * preloadedPetals.length)].cloneNode(true);
    img.className = `absolute ${petalsConfig.petalSize.join(" ")}`;
    img.style.left = `${Math.random() * 100}vw`;
    img.style.top = "-10%";
    img.style.opacity = gsap.utils.random(0.7, 1); 
    img.alt = "Falling petal";
    petalsContainer.appendChild(img);

    const duration = gsap.utils.random(...petalsConfig.fallDuration);
    const drift = gsap.utils.random(...petalsConfig.driftX);

    gsap.to(img, {
      y: "110vh",
      x: `+=${drift}`,
      rotation: gsap.utils.random(-180, 180),
      opacity: 0.8,
      scale: gsap.utils.random(0.8, 1.2),
      duration: duration,
      ease: "linear",
      onComplete: () => img.remove(),
    });
  }
  //Pause/resume on tab visibility
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopPetals();
    else startPetals();
  });
  // ==========end petals=========== //


  // ================= Sparkles ================= //
  function sparklesdots(i) {
    const size = Math.ceil(Math.random() * 3); // more variety
    const root = document.createElement('span');
    root.classList.add('star', `size-${size}`);
    
    // Optional: random hue for color variation
    const hue = 40 + Math.random() * 60; // golden-yellow range
    root.style.filter = `hue-rotate(${hue}deg) brightness(${0.8 + Math.random() * 0.4})`;
    
    return root;
  }

  function sparklesdotsClear() {
    if (charSparkles) charSparkles.innerHTML = '';
  }

  function sparklesdotsInit() {
    if (!charSparkles) return;
    sparklesdotsClear();
    for (let i = 0; i < 60; i++) {
      charSparkles.appendChild(sparklesdots(i));
    }
  }

  function startSparklesdots() {
    if (!charSparkles) return;
    if (charSparkles.children.length === 0) sparklesdotsInit();
    gsap.to(charSparkles, { opacity: 1, duration: 1, ease: "power2.out" });
  }

  // ================= end Sparkles ================= //


  // ===============banner stars=============== //
  if (!bannerStars) return;
  const bannerStarsCenter = {
    x: bannerStars.clientWidth / 2,
    y: bannerStars.clientHeight / 2,
  };
  const createBannerStar = (i) => {
    const size = Math.round(Math.random() + 1);
    const root = document.createElement("span");
    root.style.top = `${bannerStarsCenter.y}px`;
    root.style.left = `${bannerStarsCenter.x}px`;
    root.classList.add("star", `size-${size}`, `axis-${i}`);
    return root;
  };
  const clearBannerStars = () => {
    bannerStars.innerHTML = "";
  };
  const bannerStarsInit = () => {
    clearBannerStars();
    for (let i = 0; i < 360; i++) {
      bannerStars.appendChild(createBannerStar(i));
    }
  };
  bannerStarsInit(); 
  // =============end banner stars============== //


  // ============ home timeline stars ========== //
  if (!landingTimelineStars) return; 
  const landingTimelineStarscenter = {
    x: landingTimelineStars.clientWidth / 2,
    y: landingTimelineStars.clientHeight / 2 - landingTimelineStars.clientHeight * 0.1,
  };
  const landingTimelineCreateStar = (i) => {
    const size = Math.round(Math.random() + 1);
    const star = document.createElement("span");
    star.style.top = `${landingTimelineStarscenter.y}px`;
    star.style.left = `${landingTimelineStarscenter.x}px`;
    star.classList.add("star", `size-${size}`, `axis-${i}`);
    return star;
  };
  const landingTimelineClearStars = () => {
    landingTimelineStars.innerHTML = "";
  };
  const landingTimelineStarsInit = () => {
    landingTimelineClearStars();
    for (let i = 0; i < 360; i++) {
      landingTimelineStars.appendChild(landingTimelineCreateStar(i));
    }
  };
  landingTimelineStarsInit();
  // =========end home timeline stars ========= //


  // ============ star adn pattern rotation ======== //
  gsap.to("#banner-stars, #character-pattern", {
    rotate: 360,
    duration: 100,
    ease: "none",
    repeat: -1
  });
  // ============ end star adn pattern rotation ======== //
});


// ============= home comic hover effect =========== //
document.addEventListener("DOMContentLoaded", () => {
  const centerComic = document.querySelector(".swiper-slide-active .center-comic .img img");
  const movieImage = document.querySelector(".swiper-slide-active .movie-image");

  if (!centerComic || !movieImage) return;

  centerComic.addEventListener("mouseenter", () => {
    const tl = gsap.timeline();

    tl.to(movieImage, {
      scale: 0.4,
      duration: 1,
      ease: "power1.inOut",
      transformOrigin: "center center"
    }, 0) 

    .to(centerComic, {
      scale: 1.7,
      duration: 1,
      ease: "power1.inOut",
      transformOrigin: "top center"
    }, 0); 
  });

  centerComic.addEventListener("mouseleave", () => {
    const tl = gsap.timeline();

    tl.to(movieImage, {
      scale: 1,
      duration: 1,
      ease: "power1.inOut"
    }, 0)

    .to(centerComic, {
      scale: 1,
      duration: 1,
      ease: "power1.inOut",
      transformOrigin: "top center"
    }, 0);
  });
});
// ========== end home comic hover effect ========= //
