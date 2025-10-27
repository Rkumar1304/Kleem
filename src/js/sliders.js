//merchant slider//
const merchSwiper = new Swiper(".merch-swiper", {
  slidesPerView: 3,
  spaceBetween: 48,
  loop: false,
  navigation: {
    nextEl: ".merchant-next",
    prevEl: ".merchant-prev",
  },
  mousewheel: {
    forceToAxis: true,
    sensitivity: 3
  },
  breakpoints: {
    1024: { slidesPerView: 3, spaceBetween: 48, },
    768: { slidesPerView: 2, spaceBetween: 30, },
    0: { slidesPerView: 2, spaceBetween: 8, },
  },
});
//end merchant slider//


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
  const timelineSwiper = new Swiper(".timeline-swiper", {
    autoHeight: true,
    autoplay: {
      delay: 500,
      disableOnInteraction: false
    },
    mousewheel: {
      forceToAxis: true,
      sensitivity: 3
    },
    speed: 1000,
    direction: "horizontal",
    navigation: {
      nextEl: ".timeline-next",
      prevEl: ".timeline-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    loop: true,
    effect: "slide",
    spaceBetween: 100,
    on: {
      init: function () {
        const switches = document.querySelectorAll(".swiper-pagination-custom .swiper-pagination-switch");
        switches.forEach((el, index) => {
          el.classList.toggle("active", index === 0);
        });
      },
      slideChangeTransitionStart: function () {
        const switches = document.querySelectorAll(".swiper-pagination-custom .swiper-pagination-switch");
        switches.forEach((el, index) => {
          el.classList.toggle("active", index === timelineSwiper.realIndex);
        });
      }
    }
  });

  // Pause autoplay on hover — only if container exists
  const swiperContainer = document.querySelector(".timeline-swiper");
  if (swiperContainer) {
    swiperContainer.addEventListener("mouseenter", () => timelineSwiper.autoplay.stop());
    swiperContainer.addEventListener("mouseleave", () => timelineSwiper.autoplay.start());
  }

  // Add click event for custom pagination
  const customSwitches = document.querySelectorAll(".swiper-pagination-custom .swiper-pagination-switch");
  customSwitches.forEach((switchEl, index) => {
    switchEl.addEventListener("click", () => {
      timelineSwiper.slideTo(index);
      customSwitches.forEach(el => el.classList.remove("active"));
      switchEl.classList.add("active");
    });
  });
});
//end timelineslider aboutus//


//swiper tabs sliders//
const categorySwipers = [];
document.querySelectorAll('.category-slider').forEach((categorySliderEl) => {
  const swiperInstance = new Swiper(categorySliderEl, {
    slidesPerView: 3,
    spaceBetween: 40,
    mousewheel: {
      forceToAxis: true,
      sensitivity: 3
    },
    navigation: {
      nextEl: categorySliderEl.querySelector('.common-cat-next'),
      prevEl: categorySliderEl.querySelector('.common-cat-prev'),
    },
    loop: false,
    speed: 2000,
    breakpoints: {
      1025: { slidesPerView: 3, spaceBetween: 40, },
      768: { slidesPerView: 2, spaceBetween: 40, },
      0: { slidesPerView: 2, spaceBetween: 12, },
    },
  });

  categorySwipers.push(swiperInstance);
});
//end swiper tabs sliders//


// ---- Tab switching logic ----
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');

    // Toggle active state
    tabButtons.forEach((b) => b.classList.remove('active'));
    tabContents.forEach((c) => c.classList.remove('active'));

    btn.classList.add('active');
    const activeTab = document.getElementById(`tab-${target}`);
    activeTab.classList.add('active');
    setTimeout(() => {
      activeTab.querySelectorAll('.category-slider').forEach((categorySliderEl) => {
        if (categorySliderEl.swiper) categorySliderEl.swiper.update();
      });
    }, 50);
  });
});


//merchant banner slider//
const merchantBannerSlider = new Swiper('.merchant-banner-slider', {
  slidesPerView: 2,
  spaceBetween: 8,
  mousewheel: {
    forceToAxis: true,
    sensitivity: 3
  },
  pagination: {
    el: '.merchant-banner-slider .swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },  
  navigation: {
    nextEl: '.merchant-banner-slider .swiper-button-next',
    prevEl: '.merchant-banner-slider .swiper-button-prev',
  },
  breakpoints: {
    1024: { slidesPerView: 2 },
    768: { slidesPerView: 1 },
    0: { slidesPerView: 1 },
  },
});
//end merchant banner slider//

//explore slider//
const exploreSlider = new Swiper('.explore-slider', {
  slidesPerView: 1,
  spaceBetween: 0,
  mousewheel: {
    forceToAxis: true,
    sensitivity: 3
  },
  pagination: {
    el: '.explore-slider .swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },  
  navigation: {
    nextEl: '.explore-slider .swiper-button-next',
    prevEl: '.explore-slider .swiper-button-prev',
  },
});
//end explore slider//


//trending slider//
const trendingSlider = new Swiper('.trending-slider', {
  slidesPerView: 3,
  spaceBetween: 40,
  loop: false,
  speed: 600,
  mousewheel: {
    forceToAxis: true,
    sensitivity: 3
  },
  pagination: {
    el: '.trending-slider .swiper-pagination',
    clickable: true,
    dynamicBullets: false,
  },
  navigation: {
    nextEl: '.trending-next',
    prevEl: '.trending-prev',
  },
  breakpoints: {
    1025: { slidesPerView: 3, spaceBetween: 40, },
    768: { slidesPerView: 2, spaceBetween: 40, },
    0: { slidesPerView: 2, spaceBetween: 12, },
  },
});
//end trending slider//


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


// news events //
const newsEventSwiper = new Swiper(".event-swiper", {
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
    sensitivity: 3
  },
  breakpoints: {
    1024: { slidesPerView: 2 },
    768: { slidesPerView: 2 },
    0: { slidesPerView: 1 },
  },
});
// end news events //










