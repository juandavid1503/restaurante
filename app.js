// Lista de productos
const products = [
  { id: 1, name: 'Hamburguesa isleña', price: 15000 },
  { id: 2, name: 'Hamburguesa costeña', price: 15000 },
  { id: 3, name: 'Hamburguesa gaucha', price: 15000 },
  { id: 4, name: 'Hamburguesa doble carne', price: 20000 },
  { id: 5, name: 'Hamburguesa especial', price: 12000 },
  { id: 6, name: 'Hamburguesa de temporada', price: 18000 },
  { id: 7, name: 'Hamburguesa jalisco', price: 15000 },
  { id: 8, name: 'Hamburguesa rosario', price: 16000 },
  { id: 9, name: 'Hamburguesa sencilla', price: 10000 },
  { id: 10, name: 'Hamburguesa pollo', price: 16000 },
];

let cart = [];

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
// Mostrar el modal de método de pago
function checkout() {
  if (cart.length === 0) {
    alert('El carrito está vacío.');
    return;
  }
  document.getElementById('payment-modal').style.display = 'flex';
}

// Confirmar el método de pago y realizar el pedido
function confirmPayment() {
  const paymentMethod = document.getElementById('payment-select').value;
  let paymentText;

  switch (paymentMethod) {
    case 'credit-card':
      paymentText = 'Tarjeta de Crédito';
      break;
    case 'debit-card':
      paymentText = 'Tarjeta de Débito';
      break;
    case 'cash':
      paymentText = 'Efectivo';
      break;
  }

  const confirmation = confirm(`¿Deseas realizar el pago con ${paymentText}?`);
  
  

// Cerrar el modal sin realizar el pedido
function closeModal() {
  document.getElementById('payment-modal').style.display = 'none';
}


  alert('¡Pago éxitoso!');
  cart = [];
  renderCart();
}
// Cambia entre las páginas
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');

  const checkoutButtonContainer = document.getElementById('checkout-button-container');
  if (pageId === 'cart-page') {
      checkoutButtonContainer.style.display = 'block'; // Mostrar en la página del carrito
  } else {
      checkoutButtonContainer.style.display = 'none'; // Ocultar en otras páginas
  }
}
