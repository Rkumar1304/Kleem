//about swiper home//
document.addEventListener("DOMContentLoaded", function() {
  const aboutSwiperHome = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    speed: 6000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".mySwiper .swiper-button-next",
      prevEl: ".mySwiper .swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1.5 },
      768: { slidesPerView: 2.5 },
      1024: { slidesPerView: 4.5 },
    },
  });

  const myswiperEl = document.querySelector('.mySwiper');
  if (myswiperEl) {
    myswiperEl.addEventListener('mouseenter', () => aboutSwiperHome.autoplay.stop());
    myswiperEl.addEventListener('mouseleave', () => aboutSwiperHome.autoplay.start());
  }
});
//end about swiper home//


//join team slider//
document.addEventListener("DOMContentLoaded", function() {
  const joinTeamSlider = new Swiper(".join-team-slider", {
    spaceBetween: 0,
    slidesPerView: 'auto',
    loop: true,
    freeMode: true,
    autoplay: {
      delay: 0,
      disableOnInteraction:false,
    },
    speed: 3000,
    // If we need pagination
    pagination: '.join-team-slider .swiper-pagination',
    // Navigation arrows
    nextButton: '.join-team-slider .swiper-button-next',
    prevButton: '.join-team-slider .swiper-button-prev',
  });
  const joinTeamSliderEl = document.querySelector('.join-team-slider');
  if (joinTeamSliderEl) {
    joinTeamSliderEl.addEventListener('mouseenter', () => joinTeamSlider.autoplay.stop());
    joinTeamSliderEl.addEventListener('mouseleave', () => joinTeamSlider.autoplay.start());
  }
});
//end join team slider//


//home page circle timeline slider//
const timelineSwiper = new Swiper(".timeline-slider", {
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 3,
  slideToClickedSlide: true,
  speed: 1000,
  navigation: {
    nextEl: ".timeline-next",
    prevEl: ".timeline-prev"
  },
  effect: "creative",
  creativeEffect: {
    perspective: true,
    limitProgress: 3,
    prev: {
      translate: ["-95%", "45%", 0],
      rotate: [0, 0, -45],
      origin: "bottom"
    },
    next: {
      translate: ["95%", "45%", 0],
      rotate: [0, 0, 45],
      origin: "bottom"
    }
  },
  breakpoints: {
    1024: { slidesPerView: 3 },
    768: { slidesPerView: 3 },
    0: { slidesPerView: 1 },
  },
});
//end home page circle timeline slider//


//aboute page banner slider//
const aboutbanner = new Swiper(".full-banner-slider", {
  slidesPerView: 1,
  effect: 'fade',
  navigation: {
    nextEl: ".full-banner-slider .swiper-button-next",
    prevEl: ".full-banner-slider .swiper-button-prev"
  },
  pagination: {
    el: ".full-banner-slider .swiper-pagination"
  },
  loop: true,
  mousewheel: {
    forceToAxis: true,
    sensitivity: 3
  },
  autoplay: {
    delay: 2000,
  },
  speed: 2000
});
//end aboute page banner slider//


//teams member slider//
const teamSlider = new Swiper('.team-slider', {
  slidesPerView: 3,
  spaceBetween: 64,
  mousewheel: {
    forceToAxis: true,
    sensitivity: 3
  },
  navigation: {
    nextEl: '.team-next',
    prevEl: '.team-prev',
  },
  breakpoints: {
    1025: { slidesPerView: 3, spaceBetween: 64 },
    768: { slidesPerView: 2, spaceBetween: 64 },
    0: { slidesPerView: 2, spaceBetween: 24 },
  },
});
//end teams member slider//


//feature work slider//
const featureWorkSliderEl = document.querySelector('.feature-work-slider');
if (featureWorkSliderEl) {
  const featureWorkSlider = new Swiper(featureWorkSliderEl, {
    loop: true,
    slidesPerView: 'auto',
    grabCursor: true,
    slideToClickedSlide: true,
    centeredSlides: true,
    spaceBetween: 0,
    speed: 1000,
    mousewheel: {
      forceToAxis: true,
      sensitivity: 3
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".feature-next",
      prevEl: ".feature-prev"
    },
  });

  const featureWorkFrame = featureWorkSliderEl.querySelector('.fixed-frame');
  const featureWorkSlideVideos = new Map();

  // --- Update Frame ---
  function updateFeatureWorkFrame() {
    const activeSlide = featureWorkSliderEl.querySelector('.swiper-slide-active');
    if (!activeSlide) return;

    const slideRect = activeSlide.getBoundingClientRect();
    const containerRect = featureWorkFrame.parentElement.getBoundingClientRect();

    const top = slideRect.top - containerRect.top;
    const left = slideRect.left - containerRect.left;
    const width = slideRect.width;
    const height = slideRect.height;

    featureWorkFrame.style.transition = 'all 0.8s ease-in-out';
    featureWorkFrame.style.top = `${top}px`;
    featureWorkFrame.style.left = `${left}px`;
    featureWorkFrame.style.width = `${width}px`;
    featureWorkFrame.style.height = `${height}px`;

    const video = featureWorkSlideVideos.get(activeSlide);
    if (video) {
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.display = 'block';
      video.style.position = 'absolute';
      video.style.top = '0';
      video.style.left = '0';
      video.style.objectFit = 'cover';
      video.style.zIndex = '5';
    }
  }

  // --- Pause non-active videos ---
  function featureWorkPauseNonActiveVideos() {
    const activeSlide = featureWorkSliderEl.querySelector('.swiper-slide-active');
    featureWorkSlideVideos.forEach((video, slide) => {
      const icon = slide.querySelector('.icon');
      const thumbnail = slide.querySelector('.image img');
      if (slide !== activeSlide) {
        video.pause();
        if (icon) icon.style.display = 'flex';
        if (thumbnail) thumbnail.style.display = 'block';
        video.style.display = 'none';
      } else {
        video.play();
        if (icon) icon.style.display = 'none';
        if (thumbnail) thumbnail.style.display = 'none';
      }
    });
  }

  // --- Stop autoplay ---
  function featureWorkStopAutoplay() {
    if (featureWorkSlider.autoplay.running) featureWorkSlider.autoplay.stop();
  }

  // Stop autoplay on user interaction
  // featureWorkSliderEl.addEventListener('mouseenter', featureWorkStopAutoplay);
  // featureWorkSliderEl.addEventListener('mousedown', featureWorkStopAutoplay);
  // featureWorkSliderEl.addEventListener('touchstart', featureWorkStopAutoplay);
  // featureWorkSlider.on('slideChangeTransitionStart', featureWorkStopAutoplay);

  // Update frame & pause videos on slide change
  featureWorkSlider.on('slideChangeTransitionEnd', () => {
    featureWorkPauseNonActiveVideos();
    updateFeatureWorkFrame();
  });
  window.addEventListener('resize', updateFeatureWorkFrame);

  // --- Wait for images to load ---
  const featureWorkSlideImages = featureWorkSliderEl.querySelectorAll('img');
  let featureWorkLoadedCount = 0;
  featureWorkSlideImages.forEach(img => {
    if (img.complete) featureWorkLoadedCount++;
    else img.addEventListener('load', () => {
      featureWorkLoadedCount++;
      if (featureWorkLoadedCount === featureWorkSlideImages.length) updateFeatureWorkFrame();
    });
  });
  if (featureWorkLoadedCount === featureWorkSlideImages.length) updateFeatureWorkFrame();
  setTimeout(updateFeatureWorkFrame, 1000);

  // --- Video Play Logic ---
  featureWorkSliderEl.querySelectorAll('.swiper-slide .icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation();
      // Stop autoplay when video plays
      featureWorkStopAutoplay(); 

      const slide = this.closest('.swiper-slide');
      const videoUrl = slide.dataset.video;
      const imageContainer = slide.querySelector('.image');
      const thumbnail = imageContainer.querySelector('img');

      let existingVideo = featureWorkSlideVideos.get(slide);
      if (existingVideo) {
        existingVideo.play();
        this.style.display = 'none';
        thumbnail.style.display = 'none';
        return;
      }

      thumbnail.style.display = 'none';
      this.style.display = 'none';

      const video = document.createElement('video');
      video.src = videoUrl;
      video.autoplay = true;
      video.controls = true;
      video.playsInline = true;

      video.style.width = '100%';
      video.style.height = '100%';
      video.style.position = 'absolute';
      video.style.top = '0';
      video.style.left = '0';
      video.style.objectFit = 'cover';
      video.style.zIndex = '5';
      imageContainer.appendChild(video);

      featureWorkSlideVideos.set(slide, video);

      const frameInterval = setInterval(updateFeatureWorkFrame, 50);

      video.addEventListener('ended', () => {
        video.remove();
        featureWorkSlideVideos.delete(slide);
        thumbnail.style.display = 'block';
        icon.style.display = 'flex';
        clearInterval(frameInterval);
        updateFeatureWorkFrame();
      });
    });
  });
}
//end feature work slider//


//timelineslider aboutus//
document.addEventListener("DOMContentLoaded", () => {
  const switches = document.querySelectorAll(".swiper-pagination-custom .swiper-pagination-switch");
  const customProgress = document.querySelector(".timeline-progressbar-fill");

  function updateTimelineProgress(index) {
    const total = switches.length;
    if (!total || !customProgress) return;

    const switchWidth = switches[0].offsetWidth; // e.g. 168px
    let fillWidth;

    // --- Your desired logic ---
    if (index === 0) {
      fillWidth = switchWidth / 2;
    } else if (index < total - 1) {
      fillWidth = (switchWidth / 2) + index * switchWidth;
    } else {
      fillWidth = total * switchWidth;
    }

    // apply width to the custom progress bar
    customProgress.style.width = `${fillWidth}px`;
  }

  const timelineSwiper = new Swiper(".timeline-swiper", {
    autoHeight: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    mousewheel: {
      forceToAxis: true,
      sensitivity: 3
    },
    speed: 2000,
    direction: "horizontal",
    navigation: {
      nextEl: ".timeline-next",
      prevEl: ".timeline-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar" // still required but hidden
    },
    loop: false,
    effect: "slide",
    spaceBetween: 100,
    on: {
      init: function () {
        switches.forEach((el, i) => el.classList.toggle("active", i === 0));
        updateTimelineProgress(this.activeIndex);
      },
      slideChangeTransitionStart: function () {
        switches.forEach((el, i) => el.classList.toggle("active", i === this.activeIndex));
        updateTimelineProgress(this.activeIndex);
      }
    }
  });

  // Pause autoplay on hover
  const swiperContainer = document.querySelector(".timeline-swiper");
  if (swiperContainer) {
    swiperContainer.addEventListener("mouseenter", () => timelineSwiper.autoplay.stop());
    swiperContainer.addEventListener("mouseleave", () => timelineSwiper.autoplay.start());
  }

  // Click to jump to specific slide
  switches.forEach((switchEl, index) => {
    switchEl.addEventListener("click", () => {
      timelineSwiper.slideTo(index);
      switches.forEach(el => el.classList.remove("active"));
      switchEl.classList.add("active");
      updateTimelineProgress(index);
    });
  });

  // Update progress bar on resize
  window.addEventListener("resize", () => {
    updateTimelineProgress(timelineSwiper.activeIndex);
  });
});
//end timelineslider aboutus//


// movie banner slider //
const movieBannerSlider = new Swiper(".movie-banner-slider", {
  slidesPerView: 1,
  effect: 'fade',
  navigation: {
    nextEl: ".movie-banner-slider .swiper-button-next",
    prevEl: ".movie-banner-slider .swiper-button-prev"
  },
  pagination: {
    el: ".banner-pagination",
    clickable: true,
    // dynamicBullets: true,
  },
  loop: true,
  mousewheel: {
    forceToAxis: true,
    sensitivity: 3
  },
  autoplay: {
    delay: 2000,
  },
  speed: 2000
});
// end movie banner slider //


// film reel slider //
document.addEventListener("DOMContentLoaded", function() {
  const filmReelslider = new Swiper(".filmreel-slider", {
    slidesPerView: 3,
    spaceBetween: 16,
    centeredSlides: false,
    loop: true,
    speed: 6000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".filmreel-slider .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".filmreel-slider .swiper-button-next",
      prevEl: ".filmreel-slider .swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1.5 },
      768: { slidesPerView: 2.5 },
      1024: { slidesPerView: 3.5 },
    },
  });

  const filmReelsliderEl = document.querySelector('.filmreel-slider');
  if (filmReelsliderEl) {
    filmReelsliderEl.addEventListener('mouseenter', () => filmReelslider.autoplay.stop());
    filmReelsliderEl.addEventListener('mouseleave', () => filmReelslider.autoplay.start());
  }
});
// end film reel slider //


//movie udpates slider//
document.addEventListener("DOMContentLoaded", function() {
  const movieUpdatesSlider = new Swiper(".movie-updates-slider", {
    slidesPerView: 3, 
    centeredSlides: false,
    loop: true,
    spaceBetween: 24,
    speed: 6000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".movie-updates-slider .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".movie-updates-slider .swiper-button-next",
      prevEl: ".movie-updates-slider .swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 12 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
    },
  });

  const movieUpdatesSliderEl = document.querySelector('.movie-updates-slider');
  if (movieUpdatesSliderEl) {
    movieUpdatesSliderEl.addEventListener('mouseenter', () => movieUpdatesSlider.autoplay.stop());
    movieUpdatesSliderEl.addEventListener('mouseleave', () => movieUpdatesSlider.autoplay.start());
  }
});
//end feature work slider//


// sliders //
document.addEventListener("DOMContentLoaded", () => {
  //event slider
  const eventSwiperWrapper = document.querySelector(".event-swiper .swiper-wrapper");
  if (eventSwiperWrapper) {
    fetch("assets/json/news.json")
      .then((res) => res.json())
      .then((newsData) => {
        eventSwiperWrapper.innerHTML = "";

        newsData.forEach((item) => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide events";
          slide.innerHTML = `
            <div class="flex flex-col gp-10 event-card">
              <div class="img flex aic jcc">
                <img loading="lazy" src="${item.img}" class="w-full h-full" alt="event" />
              </div>
              <div class="info flex flex-col gp-4">
                <p>${item.title}</p>
                <a href="${item.link}" target="_blank" class="fill-secondary btn-readmore">Read more</a>
              </div>
            </div>
          `;
          eventSwiperWrapper.appendChild(slide);
        });

        new Swiper(".event-swiper", {
          slidesPerView: 2,
          spaceBetween: 24,
          grabCursor: true,
          loop: false,
          navigation: {
            nextEl: ".merchant-next",
            prevEl: ".merchant-prev",
          },
          mousewheel: {
            forceToAxis: true,
            sensitivity: 3,
          },
          breakpoints: {
            1024: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          },
        });

        console.log("✅ Event slider loaded");
      })
      .catch((err) => console.error("❌ Error loading news:", err));
  }

  //merchant slider
  const productWrapper = document.getElementById("productWrapper");
  if (productWrapper) {
    fetch("assets/json/products.json")
      .then((res) => res.json())
      .then((products) => {
        productWrapper.innerHTML = "";

        products.forEach((product) => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide flex flex-col bg-sky-blue";
          slide.innerHTML = `
            <div class="product flex jcc aic w-full">
              <img loading="lazy" src="${product.img}" class="mx-auto" alt="${product.name}" />
            </div>
            <div class="info flex flex-col gp-3 p-4 w-full bg-white">
              <p class="text-black text-left h5">${product.name}</p>
              <div class="flex gp-2 jcsb aic prices">
                <p class="text-black price">${product.price}</p>
                <a href="${product.link}" target="_blank" class="fill-secondary">Buy Now</a>
              </div>
            </div>
          `;
          productWrapper.appendChild(slide);
        });

        new Swiper(".merch-swiper", {
          slidesPerView: 3,
          spaceBetween: 48,
          loop: false,
          navigation: {
            nextEl: ".merchant-next",
            prevEl: ".merchant-prev",
          },
          mousewheel: {
            forceToAxis: true,
            sensitivity: 3,
          },
          breakpoints: {
            1024: { slidesPerView: 3, spaceBetween: 48 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            0: { slidesPerView: 2, spaceBetween: 8 },
          },
        });

        console.log("✅ Merchant slider loaded");
      })
      .catch((err) => console.error("❌ Error loading products:", err));
  }
});











