let productsData = [];
let currentSort = "popularity";

fetch("assets/json/product-list.json")
  .then(res => res.json())
  .then(data => {
    productsData = data;
    initialize();
  })
  .catch(err => console.error("Error loading products:", err));

function initialize() {
  const productGrid = document.getElementById("productGrid");
  const paginationEl = document.getElementById("pagination");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const sortSelect = document.getElementById("sort");
  const inStockCheckbox = document.getElementById("inStock");
  const outOfStockCheckbox = document.getElementById("outOfStock"); // optional if you have one
  const colorFilters = document.querySelectorAll(".colorFilter");
  const productCount = document.getElementById("productCount");
  const categoryFilters = document.querySelectorAll(".categoryFilter");

  // 🟢 Price range elements
  const minRange = document.getElementById("minPrice");
  const maxRange = document.getElementById("maxPrice");
  const minPriceValue = document.getElementById("minPriceValue");
  const maxPriceValue = document.getElementById("maxPriceValue");
  const sliderTrack = document.querySelector(".slider-track");

  // 🟢 Detect category from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromURL = urlParams.get("category");

  let selectedCategories = ["All"];
  if (categoryFromURL) {
    selectedCategories = [categoryFromURL];
  }

  let currentPage = 1;
  const itemsPerPage = 8;

  // 🟢 Category filter
  categoryFilters.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if (checkbox.value === "All") {
        if (checkbox.checked) {
          categoryFilters.forEach(c => {
            if (c.value !== "All") c.checked = false;
          });
        }
      } else {
        const allCheckbox = document.querySelector('.categoryFilter[value="All"]');
        if (allCheckbox) allCheckbox.checked = false;
      }

      selectedCategories = [...categoryFilters]
        .filter(c => c.checked)
        .map(c => c.value);

      if (selectedCategories.length === 0) {
        const allCheckbox = document.querySelector('.categoryFilter[value="All"]');
        if (allCheckbox) allCheckbox.checked = true;
        selectedCategories = ["All"];
      }

      currentPage = 1;
      renderProducts();

      // 🟢 Update URL on sidebar category change
      const newUrl = new URL(window.location);
      if (selectedCategories.length === 1 && selectedCategories[0] !== "All") {
        newUrl.searchParams.set("category", selectedCategories[0]);
      } else {
        newUrl.searchParams.delete("category");
      }
      window.history.replaceState({}, "", newUrl);
    });
  });


  // 🟢 Top Category List (Above the Page)
  const topCategories = document.querySelectorAll(".cat-list li");

  topCategories.forEach(li => {
    li.addEventListener("click", () => {
      topCategories.forEach(item => item.classList.remove("active"));
      li.classList.add("active");

      const selectedCat = li.dataset.category;

      categoryFilters.forEach(c => {
        if (c.value === selectedCat) {
          c.checked = true;
        } else if (selectedCat === "All") {
          if (c.value === "All") c.checked = true;
          else c.checked = false;
        } else {
          if (c.value !== selectedCat) c.checked = false;
        }
      });

      selectedCategories = [selectedCat];

      if (selectedCat === "All") {
        selectedCategories = ["All"];
      }

      currentPage = 1;
      renderProducts();

      const newUrl = new URL(window.location);
      newUrl.searchParams.set("category", selectedCat);
      window.history.replaceState({}, "", newUrl);
    });
  });

  // 🟢 Highlight top category if URL param exists
  if (categoryFromURL) {
    const topCategories = document.querySelectorAll(".cat-list li");
    topCategories.forEach((li) => {
      if (li.dataset.category === categoryFromURL) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  }


  // 🟢 Dual Price Range
  const minGap = 500;
  const priceMin = parseInt(minRange.min);
  const priceMax = parseInt(maxRange.max);

  function updateSliderTrack() {
    const percent1 = ((minRange.value - priceMin) / (priceMax - priceMin)) * 100;
    const percent2 = ((maxRange.value - priceMin) / (priceMax - priceMin)) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #ccc ${percent1}% , #222 ${percent1}% , #222 ${percent2}%, #ccc ${percent2}%)`;
  }

  function updatePriceValues() {
    minPriceValue.textContent = `${minRange.value}`;
    maxPriceValue.textContent = `${maxRange.value}`;
    renderProducts();
  }

  minRange.addEventListener("input", () => {
    if (parseInt(maxRange.value) - parseInt(minRange.value) <= minGap) {
      minRange.value = parseInt(maxRange.value) - minGap;
    }
    updateSliderTrack();
    updatePriceValues();
  });

  maxRange.addEventListener("input", () => {
    if (parseInt(maxRange.value) - parseInt(minRange.value) <= minGap) {
      maxRange.value = parseInt(minRange.value) + minGap;
    }
    updateSliderTrack();
    updatePriceValues();
  });

  updateSliderTrack();
  updatePriceValues();

  // 🟢 Other Filters
  if (inStockCheckbox) inStockCheckbox.addEventListener("change", renderProducts);
  if (outOfStockCheckbox) outOfStockCheckbox.addEventListener("change", renderProducts);
  if (sortSelect) sortSelect.addEventListener("change", e => {
    currentSort = e.target.value;
    renderProducts();
  });
  colorFilters.forEach(chk => chk.addEventListener("change", renderProducts));


  // 🟢 Update Category Counts (Always use full dataset)
  function updateCategoryCounts(baseData = productsData) {
    const allCount = baseData.length;

    categoryFilters.forEach(cb => {
      const label = cb.closest("label");
      if (!label) return;

      let countSpan = label.querySelector(".count");
      if (!countSpan) {
        countSpan = document.createElement("span");
        countSpan.className = "count";
        label.appendChild(countSpan);
      }

      let count = 0;
      if (cb.value === "All") {
        count = allCount;
      } else {
        // Always count from full productsData (not filtered list)
        count = productsData.filter(p =>
          p.category.toLowerCase().includes(cb.value.toLowerCase())
        ).length;
      }

      countSpan.textContent = ` (${count})`;
    });
  }


  // 🟢 Update Availability Counts
  function updateAvailabilityCounts(filteredData = productsData) {
    const totalInStock = filteredData.filter(p => p.inStock).length;
    const totalOutOfStock = filteredData.filter(p => !p.inStock).length;

    const inStockLabel = document.querySelector("label[for='inStock']");
    const outOfStockLabel = document.querySelector("label[for='outOfStock']");

    if (inStockLabel) {
      let span = inStockLabel.querySelector(".count");
      if (!span) {
        span = document.createElement("span");
        span.className = "count";
        inStockLabel.appendChild(span);
      }
      span.textContent = ` (${totalInStock})`;
    }

    if (outOfStockLabel) {
      let span = outOfStockLabel.querySelector(".count");
      if (!span) {
        span = document.createElement("span");
        span.className = "count";
        outOfStockLabel.appendChild(span);
      }
      span.textContent = ` (${totalOutOfStock})`;
    }
  }


  // 🟢 Sort Dropdown UI Logic (inside initialize)
  const sortBox = document.getElementById("sortBox");
  const sortDropdown = document.getElementById("sortDropdown");
  const sortValue = document.getElementById("sortValue");

  if (sortBox && sortDropdown && sortValue) {
    sortBox.addEventListener("click", (e) => {
      e.stopPropagation();
      sortBox.classList.toggle("open");
      const dropdown = sortBox.querySelector(".dropdown-list");
      if (dropdown) {
        dropdown.style.maxHeight = sortBox.classList.contains("open")
          ? dropdown.scrollHeight + "px"
          : "0";
      }
    });

    sortDropdown.querySelectorAll('input[name="sort"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        const label = radio.parentElement.textContent.trim();
        sortValue.textContent = label;
        currentSort = radio.value;
        sortBox.classList.remove("open");
        const dropdown = sortBox.querySelector(".dropdown-list");
        if (dropdown) dropdown.style.maxHeight = "0";

        // ✅ Sorting now works because it's inside initialize()
        renderProducts();
      });
    });

    document.addEventListener("click", (e) => {
      if (!sortBox.contains(e.target)) {
        sortBox.classList.remove("open");
        const dropdown = sortBox.querySelector(".dropdown-list");
        if (dropdown) dropdown.style.maxHeight = "0";
      }
    });
  }


  // 🟢 Render products
  function renderProducts() {
    updateCategoryCounts(productsData);
    updateAvailabilityCounts(productsData);

    let filtered = productsData.filter(p => {
      const matchesCategory =
        selectedCategories.includes("All") ||
        selectedCategories.some(cat =>
          p.category.toLowerCase().includes(cat.toLowerCase())
        );
      const matchesPrice = p.newPrice >= +minPrice.value && p.newPrice <= +maxPrice.value;
      const matchesStock =
        (!inStockCheckbox || !inStockCheckbox.checked || p.inStock) &&
        (!outOfStockCheckbox || !outOfStockCheckbox.checked || !p.inStock);
      const selectedColors = [...colorFilters].filter(c => c.checked).map(c => c.value);
      const matchesColor = selectedColors.length === 0 || selectedColors.some(c => p.colors.includes(c));

      return matchesCategory && matchesPrice && matchesStock && matchesColor;
    });

    // Sorting
    switch (currentSort) {
      case "priceLow":
        filtered.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case "priceHigh":
        filtered.sort((a, b) => b.newPrice - a.newPrice);
        break;
      case "new":
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case "popularity":
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
    }

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const visible = filtered.slice(start, start + itemsPerPage);

    productGrid.innerHTML = "";
    visible.forEach(p => {
      const div = document.createElement("div");
      div.className = "product fade-in";
      div.innerHTML = `
        ${p.isNew ? '<div class="badge tag-new">New</div>' : ""}
        <img src="${p.image}" alt="${p.name}" />
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="flex gp-2 flex-wrap aie jcsb">
            <div class="flex flex-col gp-2">
              <div class="product-prices">
                <span class="new-price">₹${p.newPrice}</span>
                <span class="old-price">₹${p.oldPrice}</span>
              </div>
              ${
                p.colors.length > 0
                  ? `<div class="color-dots">
                      ${p.colors.map(c => `<div class="dot" style="background:${c}"></div>`).join("")}
                    </div>`
                  : ""
              }
            </div>
            ${
              p.buyNowLink
                ? `<a href="${p.buyNowLink}" class="fill-secondary buy-now-btn" target="_blank">Buy Now</a>`
                : ""
            }
          </div>
        </div>
      `;
      productGrid.appendChild(div);
    });

    if (productCount) productCount.textContent = `${filtered.length} items`;

    // Update counts based on filtered list
    updateCategoryCounts(productsData);
    updateAvailabilityCounts(productsData);

    // Pagination rendering
    paginationEl.innerHTML = "";

    if (totalPages > 1) {
      const screenWidth = window.innerWidth;
      const maxVisible = screenWidth < 480 ? 3 : 5;

      const createButton = (label, page, isActive = false, isDisabled = false) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.disabled = isDisabled;
        btn.className = `page-btn ${isActive ? "active" : ""}`;
        if (!isDisabled) {
          btn.onclick = () => {
            currentPage = page;
            renderProducts();
          };
        }
        return btn;
      };

      paginationEl.appendChild(createButton("«", currentPage - 1, false, currentPage === 1));

      let pages = [];
      if (totalPages <= maxVisible) {
        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      } else {
        if (currentPage <= Math.ceil(maxVisible / 2)) {
          pages = [...Array(maxVisible - 1).keys()].map(i => i + 1).concat(["...", totalPages]);
        } else if (currentPage >= totalPages - Math.floor(maxVisible / 2)) {
          pages = [1, "...", ...Array(maxVisible - 1).keys().map(i => totalPages - (maxVisible - 2) + i)];
        } else {
          pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
        }
      }

      pages.forEach(p => {
        if (p === "...") {
          const span = document.createElement("span");
          span.className = "dots";
          span.textContent = "...";
          paginationEl.appendChild(span);
        } else {
          paginationEl.appendChild(createButton(p, p, p === currentPage));
        }
      });

      paginationEl.appendChild(createButton("»", currentPage + 1, false, currentPage === totalPages));
    }
  }

  renderProducts();
}


// 🟢 Accordion Logic
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const group = header.closest(".filter-group");
    const content = group.querySelector(".accordion-content");
    const active = group.classList.contains("active");

    document.querySelectorAll(".filter-group.active").forEach(g => {
      if (g !== group) {
        g.classList.remove("active");
        const c = g.querySelector(".accordion-content");
        c.style.maxHeight = c.scrollHeight + "px";
        requestAnimationFrame(() => (c.style.maxHeight = "0"));
      }
    });

    if (active) {
      group.classList.remove("active");
      content.style.maxHeight = content.scrollHeight + "px";
      requestAnimationFrame(() => (content.style.maxHeight = "0"));
    } else {
      group.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// 🟢 Sort Dropdown UI Logic
// document.addEventListener("DOMContentLoaded", () => {
//   const sortBox = document.getElementById("sortBox");
//   const sortDropdown = document.getElementById("sortDropdown");
//   const sortValue = document.getElementById("sortValue");

//   if (!sortBox || !sortDropdown || !sortValue) return;

//   sortBox.addEventListener("click", e => {
//     e.stopPropagation();
//     sortBox.classList.toggle("open");
//     const dropdown = sortBox.querySelector(".dropdown-list");
//     if (dropdown) {
//       dropdown.style.maxHeight = sortBox.classList.contains("open")
//         ? dropdown.scrollHeight + "px"
//         : "0";
//     }
//   });

//   sortDropdown.querySelectorAll('input[name="sort"]').forEach(radio => {
//     radio.addEventListener("change", () => {
//       const label = radio.parentElement.textContent.trim();
//       sortValue.textContent = label;
//       currentSort = radio.value;
//       sortBox.classList.remove("open");
//       const dropdown = sortBox.querySelector(".dropdown-list");
//       if (dropdown) dropdown.style.maxHeight = "0";

//       // ✅ Reapply sorting to the filtered list
//       if (typeof renderProducts === "function") renderProducts();
//     });

//   });

//   document.addEventListener("click", e => {
//     if (!sortBox.contains(e.target)) {
//       sortBox.classList.remove("open");
//       const dropdown = sortBox.querySelector(".dropdown-list");
//       if (dropdown) dropdown.style.maxHeight = "0";
//     }
//   });
// });


// 🟢 Mobile Filter Dropdown Toggle
const filterToggle = document.getElementById("filterToggle");
const filtersContainer = document.querySelector(".filters");

if (filterToggle && filtersContainer) {
  filterToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent click from bubbling up
    if (window.innerWidth <= 768) {
      const isOpen = filtersContainer.classList.toggle("open");
      filterToggle.classList.toggle("open", isOpen);
      document.body.classList.toggle("filters-open", isOpen);
    }
  });

  // Close filter on click outside
  document.addEventListener("click", (e) => {
    const isClickInside =
      filtersContainer.contains(e.target) || filterToggle.contains(e.target);
    if (!isClickInside && filtersContainer.classList.contains("open")) {
      filtersContainer.classList.remove("open");
      filterToggle.classList.remove("open");
      document.body.classList.remove("filters-open");
    }
  });

  // Auto close filters when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      filtersContainer.classList.add("open");
      filterToggle.classList.remove("open");
      document.body.classList.remove("filters-open");
    } else if (!filtersContainer.classList.contains("open")) {
      document.body.classList.remove("filters-open");
    }
  });
}

