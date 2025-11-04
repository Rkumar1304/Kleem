document.addEventListener("DOMContentLoaded", async () => {

  // Utility: Load JSON
  async function loadJSON(path) {
    const res = await fetch(path);
    return await res.json();
  }

  // --- Merchant Banner ---
  const banners = await loadJSON("assets/json/merchandise/merchant-banners.json");
  const bannerWrapper = document.getElementById("merchantBannerWrapper");
  bannerWrapper.innerHTML = banners.map(b => `
    <div class="swiper-slide">
      <div class="box relative">
        <div class="imgarea w-full h-full">
          <img loading="lazy" src="${b.image}" class="object-cover w-full h-full" alt="${b.title}" />
        </div>
        <div class="info absolute w-full flex flex-col">
          <div class="title font-bold leading1">${b.title}</div>
          <p class="text-18 font-normal">${b.description}</p>
          <a href="javascript:void(0)" class="fill-secondary btn-explore">Explore Now</a>
        </div>
      </div>
    </div>
  `).join('');

  // --- Feature Categories ---
  const categories = await loadJSON("assets/json/merchandise/feature-categories.json");
  const catList = document.getElementById("featureCategoryList");

  // 🟢 Add data-category attribute using c.name
  catList.innerHTML = categories
    .map(
      (c) => `
      <li class="flex aic gp-2" data-category="${c.name}">
        <a href="javascript:void(0)" class="cat-img rounded-full overflow-hidden">
          <img src="${c.image}" alt="${c.name}" class="object-cover w-full h-full" />
        </a>
        <span class="text-black text-center">${c.name}</span>
      </li>
    `
    )
    .join("");

  // 🟢 Category click redirects to product list page
  catList.addEventListener("click", (e) => {
    const li = e.target.closest("li[data-category]");
    if (!li) return;

    const selectedCategory = li.dataset.category;

    // Redirect to product-list.html with category in URL query
    window.location.href = `product-list.html?category=${encodeURIComponent(selectedCategory)}`;
  });



  // --- Explore Slider ---
  const exploreSlides = await loadJSON("assets/json/merchandise/explore-slides.json");
  const exploreWrapper = document.getElementById("exploreWrapper");
  exploreWrapper.innerHTML = exploreSlides.map(e => `
    <div class="swiper-slide">
      <div class="box relative">
        <div class="imgarea w-full h-full">
          <img src="${e.image}" class="object-cover w-full h-full" alt="${e.title}" />
        </div>
        <div class="info container-fluid absolute flex flex-col">
          <div class="flex flex-col gp-1">
            <div class="title leading1">${e.title}</div>
            <p>${e.description}</p>
          </div>
          <a href="javascript:void(0)" class="fill-secondary btn-explore">Explore Now</a>
        </div>
      </div>
    </div>
  `).join('');

  // --- Trending Products ---
  const trending = await loadJSON("assets/json/merchandise/trending-products.json");
  const trendingWrapper = document.getElementById("trendingWrapper");
  trendingWrapper.innerHTML = trending.map(p => `
    <div class="swiper-slide">
      <div class="w-full relative prod-img bg-product2">
        <img src="${p.image}" alt="${p.name}" class="object-cover w-full h-full" />
        ${p.isNew ? '<div class="tag-new absolute">New</div>' : ''}
      </div>
      <div class="product-info flex flex-col w-full">
        <div class="product-title text-16 text-gray-13 font-medium">${p.name}</div>
        <div class="flex gp-2 aic flex-wrap jcsb">
          <div class="flex gp-2 aic">
            <span class="product-price text-16">&#8377;${p.price.toFixed(2)}</span>
            ${p.oldPrice ? `<span class="product-old-price text-gray-40">&#8377;${p.oldPrice.toFixed(2)}</span>` : ''}
          </div>
          ${
            p.buyNowLink
              ? `<a href="${p.buyNowLink}" class="fill-secondary buy-now-btn" target="_blank">Buy Now</a>`
              : ""
          }
        </div>
      </div>
    </div>
  `).join('');

  // --- Category Tabs ---
  const tabs = await loadJSON("assets/json/merchandise/category-tabs.json");
  Object.keys(tabs).forEach(tabKey => {
    const tabContent = document.getElementById(`tab-${tabKey}`);
    tabContent.innerHTML = `
      <div class="swiper category-slider common-cat-slider">
        <div class="flex jcc aic gp-2 arrows">
          <div class="swiper-button-prev common-cat-prev">
            <svg class="fill-none">
              <use xlink:href="./assets/icons/icons.svg#angleRight"></use>
            </svg>
          </div>
          <div class="swiper-button-next common-cat-next">
            <svg class="fill-none">
              <use xlink:href="./assets/icons/icons.svg#angleRight"></use>
            </svg>
          </div>
        </div>
        <div class="swiper-wrapper">
          ${tabs[tabKey].map(p => `
            <div class="swiper-slide">
              <div class="w-full relative prod-img bg-white">
                <img src="${p.image}" alt="${p.name}" class="object-cover w-full h-full" />
                ${p.isNew ? '<div class="tag-new absolute">New</div>' : ''}
              </div>
              <div class="product-info flex flex-col w-full">
                <div class="product-title text-16 text-gray-13 font-medium">${p.name}</div>
                <div class="flex gp-2 aic flex-wrap jcsb">
                  <div class="flex gp-2 aic">
                    <span class="product-price text-16">&#8377;${p.price.toFixed(2)}</span>
                    ${p.oldPrice ? `<span class="product-old-price text-gray-40">&#8377;${p.oldPrice.toFixed(2)}</span>` : ''}
                  </div>
                  ${
                    p.buyNowLink
                      ? `<a href="${p.buyNowLink}" class="fill-secondary buy-now-btn" target="_blank">Buy Now</a>`
                      : ""
                  }
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  // ✅ Initialize Swipers after content loaded
  setTimeout(() => {
    new Swiper('.merchant-banner-slider', { 
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
    new Swiper('.explore-slider', { 
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
    new Swiper('.trending-slider', { 
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

    document.querySelectorAll('.category-slider').forEach(categorySliderEl => {
      new Swiper(categorySliderEl, {
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
    });
  }, 100);

});

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
