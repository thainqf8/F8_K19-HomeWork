const productList = document.querySelector('.product-list');
const cartQuantity = document.querySelector('.cart-quantity');
const quantityProducts = document.querySelector('.quantity-products');
const sidebarContent = document.querySelector('.sidebar-content');
const searchInput = document.querySelector('.search input');

let cartCount = 0;
let allProducts = [];

// 1. Lấy dữ liệu API
async function getProducts() {
  showSkeletonLoading();

  try {
    const res = await fetch('https://fakestoreapi.com/products');
    allProducts = await res.json();
    
    // Giả lập load 1.5s để ngắm hiệu ứng Skeleton Glassmorphism
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    renderSidebar(allProducts);
    renderProducts(allProducts);
  } catch (error) {
    productList.innerHTML = '<p style="text-align:center; width:100%; color: var(--red);">Lỗi tải dữ liệu!</p>';
  }
}

function showSkeletonLoading() {
  const dummyArray = Array.from({ length: 8 }); 
  
  productList.innerHTML = dummyArray.map(() => `
    <div class="product-card glass-panel" style="pointer-events: none;">
      <div style="padding: 10px 14px; border-bottom: 1px solid var(--glass-border);">
        <div class="skeleton skeleton-category"></div>
      </div>
      
      <div class="skeleton skeleton-img"></div>
      
      <div class="product-info">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-title-2"></div>
        <div class="skeleton skeleton-rate"></div>
        
        <div class="price-action-wrap">
          <div class="skeleton skeleton-price"></div>
          <div class="skeleton skeleton-btn"></div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderSidebar(products) {
  const countMap = {};
  products.forEach(p => {
    countMap[p.category] = (countMap[p.category] || 0) + 1;
  });

  let sidebarHTML = `
    <div class="categorie-item active" data-category="all">
      <span>Tất cả sản phẩm</span>
      <span class="categorie-count">${products.length}</span>
    </div>
  `;

  for (const [category, count] of Object.entries(countMap)) {
    const catName = category.charAt(0).toUpperCase() + category.slice(1);
    sidebarHTML += `
      <div class="categorie-item" data-category="${category}">
        <span>${catName}</span>
        <span class="categorie-count">${count}</span>
      </div>
    `;
  }
  sidebarContent.innerHTML = sidebarHTML;
}

function renderProducts(products) {
  quantityProducts.textContent = products.length;
  
  if (products.length === 0) {
    productList.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:var(--text-gray);">Không tìm thấy sản phẩm nào.</p>';
    return;
  }

  productList.innerHTML = products.map(p => `
    <div class="product-card glass-panel"> 
      <p class="product-category">${p.category}</p>
      
      <div class="product-image">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
      </div>
      
      <div class="product-info">
        <h3 class="product-name">${p.title}</h3>
        <div class="product-rating">
          <i class="bi bi-star-fill"></i>
          <span class="product-rating-text">${p.rating.rate}</span>
          <span class="product-rating-count">(${p.rating.count})</span>
        </div>
        
        <div class="price-action-wrap">
          <p class="product-price">$${p.price.toFixed(2)}</p>
          <button class="btn-add-cart">
            <span class="btn-tooltip">Thêm vào giỏ hàng</span>
            <i class="bi bi-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterData() {
  const activeItem = document.querySelector('.categorie-item.active');
  const activeCat = activeItem ? activeItem.dataset.category : 'all';
  const term = searchInput.value.toLowerCase().trim();
  
  let filtered = activeCat === 'all' ? allProducts : allProducts.filter(p => p.category === activeCat);
  
  if (term) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(term) || 
      p.category.toLowerCase().includes(term)
    );
  }
  renderProducts(filtered);
}

document.addEventListener('click', (e) => {
  const catItem = e.target.closest('.categorie-item');
  if (catItem) {
    document.querySelectorAll('.categorie-item').forEach(el => el.classList.remove('active'));
    catItem.classList.add('active');
    filterData();
  }

  const btnCart = e.target.closest('.btn-add-cart');
  if (btnCart) {
    cartCount++;
    cartQuantity.textContent = cartCount;

    btnCart.classList.add('active');
    btnCart.querySelector('i').className = 'bi bi-check2';

    setTimeout(() => {
      btnCart.classList.remove('active');
      btnCart.querySelector('i').className = 'bi bi-cart-plus';
    }, 1000);
  }
});

searchInput.addEventListener('input', filterData);

getProducts();