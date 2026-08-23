alert("SCRIPT ÇALIŞIYOR");let cart = [];
let selectedProduct = {
  name: "",
  price: 0,
  photos: []
};
let currentPhoto = 0;
// SEPET
function openCart() {
  document.getElementById("cartPanel").classList.add("open");
}
function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
}
function addToCart(name, price, sizeId) {
  const size = document.getElementById(sizeId).value;
  if (size === "") {
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
  let count = 0;
  let total = 0;
  const cartItems =
    document.getElementById("cartItems");
  cartItems.innerHTML = "";
  cart.forEach(function(item, index) {
    count += item.quantity;
    total +=
      item.price *
      item.quantity;
    cartItems.innerHTML += `
      <div class="cart-item">
        <strong>${item.name}</strong>
        <p>Beden: ${item.size}</p>
        <p>
          ${item.price * item.quantity} TL
        </p>
        <div class="quantity">
          <button
            onclick="changeQuantity(${index}, -1)"
          >
            −
          </button>
          <span>
            ${item.quantity}
          </span>
          <button
            onclick="changeQuantity(${index}, 1)"
          >
            +
          </button>
        </div>
        <button
          class="remove"
          onclick="removeItem(${index})"
        >
          Ürünü kaldır
        </button>
      </div>
    `;
  });
  document.getElementById("cartCount").textContent =
    count;
  document.getElementById("cartTotal").textContent =
    total;
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
// ÜRÜN DETAYI
function openProduct(name, price, photos) {
  selectedProduct.name = name;
  selectedProduct.price = price;
  selectedProduct.photos = photos;
  currentPhoto = 0;
  document.getElementById("detailName").textContent =
    name;
  document.getElementById("detailPrice").textContent =
    price;
  document.getElementById("detailImage").src =
    photos[0];
  document
    .getElementById("productDetail")
    .classList
    .add("active");
}
function changePhoto(direction) {
  currentPhoto += direction;
  if (
    currentPhoto >=
    selectedProduct.photos.length
  ) {
    currentPhoto = 0;
  }
  if (currentPhoto < 0) {
    currentPhoto =
      selectedProduct.photos.length - 1;
  }
  document.getElementById("detailImage").src =
    selectedProduct.photos[currentPhoto];
}
function closeProduct() {
  document
    .getElementById("productDetail")
    .classList
    .remove("active");
}
function addDetailToCart() {
  const size =
    document.getElementById("detailSize").value;
  if (size === "") {
    alert("Lütfen beden seç.");
    return;
  }
  cart.push({
    name:
      selectedProduct.name,
    price:
      selectedProduct.price,
    size:
      size,
    quantity:
      1
  });
  updateCart();
  closeProduct();
  openCart();
}
// SİPARİŞ
function checkout() {
  if (cart.length === 0) {
    alert("Sepetin boş.");
    return;
  }
  alert(
    "Sipariş sistemi şu anda demo aşamasında."
  );
}
