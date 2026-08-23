let cart = [];
let selectedProduct = {};

function addToCart(name, price, sizeId) {
  const size = document.getElementById(sizeId).value;

  if (!size) {
    alert("Lütfen beden seç.");
    return;
  }

  cart.push({
    name: name,
    price: price,
    size: size,
    quantity: 1
  });

  updateCart();
  openCart();
}

function updateCart() {
  const count = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  document.getElementById("cartCount").textContent = count;

  const items = document.getElementById("cartItems");
  items.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    items.innerHTML += `
      <div class="cart-item">
        <strong>${item.name}</strong>
        <br>
        Beden: ${item.size}
        <br>
        ${item.price * item.quantity} TL

        <div class="quantity">
          <button onclick="changeQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>

        <button class="remove" onclick="removeItem(${index})">
          Ürünü kaldır
        </button>
      </div>
    `;
  });

  document.getElementById("cartTotal").textContent = total;
}

function changeQuantity(index, amount) {
  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function openCart() {
  document.getElementById("cartPanel").classList.add("open");
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
}

function openProduct(name, price, image) {
  selectedProduct = {
    name: name,
    price: price,
    image: image
  };

  document.getElementById("detailName").textContent = name;
  document.getElementById("detailPrice").textContent = price;
  document.getElementById("detailImage").src = image;

  document.getElementById("productDetail").classList.add("active");
}

function closeProduct() {
  document.getElementById("productDetail").classList.remove("active");
}

function addDetailToCart() {
  const size = document.getElementById("detailSize").value;

  if (!size) {
    alert("Lütfen beden seç.");
    return;
  }

  cart.push({
    name: selectedProduct.name,
    price: selectedProduct.price,
    size: size,
    quantity: 1
  });

  updateCart();
  closeProduct();
  openCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Sepetin boş.");
    return;
  }

  alert(
    "Sipariş sistemi şu anda demo aşamasında."
  );
let currentPhoto = 0;

const productPhotos = [
  "IMG_1713.jpeg",
  "IMG_1715.jpeg",
  "IMG_1716.jpeg"
];

function changePhoto(direction) {
  currentPhoto = currentPhoto + direction;

  if (currentPhoto < 0) {
    currentPhoto = productPhotos.length - 1;
  }

  if (currentPhoto >= productPhotos.length) {
    currentPhoto = 0;
  }

  document.getElementById("detailImage").src =
    productPhotos[currentPhoto];
}

