const products = [
  {id:1,title:'Noire Leather Wallet',price:1299,meta:'Genuine leather · limited',img:'https://picsum.photos/400/300?random=11'},
  {id:2,title:'Eclate Watch — Noir',price:5999,meta:'Minimal Swiss movement',img:'https://picsum.photos/400/300?random=22'},
  {id:3,title:'Midnight Hoodie',price:2199,meta:'Soft cotton, unisex',img:'https://picsum.photos/400/300?random=33'},
  {id:4,title:'Aurora Headphones',price:7999,meta:'Hi-fi wireless',img:'https://picsum.photos/400/300?random=44'},
  {id:5,title:'Gold Trim Sunglasses',price:3499,meta:'UV400 protection',img:'https://picsum.photos/400/300?random=55'},
  {id:6,title:'Limited Canvas Bag',price:999,meta:'Hand-stitched',img:'https://picsum.photos/400/300?random=66'}
];

const cart = {};

function renderProducts(){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  products.forEach(p => {
    const el = document.createElement('div'); el.className='product';
    el.innerHTML = `
      <div class="badge">New</div>
      <img src="${p.img}" alt="${p.title}">
      <div class="p-title">${p.title}</div>
      <div class="p-meta">${p.meta}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
        <div class="p-price">₹${p.price}</div>
        <div style="display:flex;gap:8px">
          <button class="btn" onclick="addToWishlist(${p.id})">♡</button>
          <button class="btn btn-primary" onclick="addToCart(${p.id})">Add</button>
        </div>
      </div>
    `;
    grid.appendChild(el);
  });
}

function addToCart(id){
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  pulseCart();
}

function addToWishlist(id){
  alert('Added to wishlist — feature coming soon!');
}

function updateCartUI(){
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  document.getElementById('cartCount').innerText = count;
  const itemsDiv = document.getElementById('cartItems');
  itemsDiv.innerHTML = '';
  let total = 0;
  for(const id in cart){
    const qty = cart[id];
    const prod = products.find(p=>p.id==id);
    total += prod.price * qty;
    const row = document.createElement('div');
    row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.padding='8px 0';
    row.innerHTML = `<div>${prod.title} <small style='color:var(--muted)'>×${qty}</small></div><div>₹${prod.price*qty}</div>`;
    itemsDiv.appendChild(row);
  }
  document.getElementById('cartTotal').innerText = `₹${total}`;
}

function toggleCart(){
  const el = document.getElementById('cartModal');
  el.style.display = el.style.display === 'none' || el.style.display === '' ? 'block' : 'none';
}

function checkout(){
  if(Object.keys(cart).length===0){ alert('Cart is empty!'); return; }
  alert('Checkout — integrating payments is the next step.');
}

function scrollToProducts(){
  document.getElementById('products').scrollIntoView({behavior:'smooth'});
}

function pulseCart(){
  const el = document.getElementById('cartFloat');
  if(!el) return;
  el.animate([
    {transform:'scale(1)'}, {transform:'scale(1.06)'}, {transform:'scale(1)'}
  ], {duration:420, easing:'ease'});
}

// init
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').innerText = new Date().getFullYear();
  renderProducts();
});
