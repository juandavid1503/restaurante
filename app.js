// Lista de productos
const products = [
  { id: 1, name: 'Hamburguesa isleña', price: 15000 },
  { id: 2, name: 'Hamburguesa costeña', price: 15000 },
  { id: 3, name: 'Hamburguesa gaucha', price: 12000 },
  { id: 4, name: 'Hamburguesa doble carne', price: 20000 },
  { id: 5, name: 'Choripan', price: 10000 },
  { id: 6, name: 'Coca cola', price: 4000 },
  { id: 7, name: 'Sprite', price: 4000 },
  { id: 8, name: 'Corona', price: 7000 },
  { id: 9, name: 'Francesa', price: 4000 },
  { id: 10, name: 'Casco', price: 4000 },
];

let cart = [];

// Renderizar la lista de productos
const productList = document.getElementById('product-list');
products.forEach(product => {
  const productEl = document.createElement('div');
  productEl.classList.add('product');
  productEl.innerHTML = `
    <h3>${product.name}</h3>
    <p>Precio: $${product.price}</p>
    <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
  `;
  productList.appendChild(productEl);
});

// Agregar producto al carrito
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

// Renderizar el carrito
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemEl = document.createElement('div');
    itemEl.classList.add('cart-item');
    itemEl.innerHTML = `
      <p>${item.name} x${item.quantity} - $${item.price * item.quantity}</p>
      <button onclick="updateQuantity(${item.id}, 1)">+</button>
      <button onclick="updateQuantity(${item.id}, -1)">-</button>
      <button onclick="removeFromCart(${item.id})">Eliminar</button>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  document.getElementById('total-price').innerText = `Total: $${total}`;
}

// Actualizar la cantidad de un producto en el carrito
function updateQuantity(productId, change) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) {
      removeFromCart(productId);
    } else {
      renderCart();
    }
  }
}

// Eliminar un producto del carrito
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

// Realizar el pedido (vaciar el carrito)
function checkout() {
  if (cart.length === 0) {
    alert('El carrito está vacío.');
    return;
  }
  alert('¡Pedido realizado con éxito!');
  cart = [];
  renderCart();
}

// Cambiar entre páginas
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}
