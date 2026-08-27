let cart = [];

let selectedProduct = {
  name: "",
  price: 0,
  image: "",
  size: ""
};


// ====================
// SEPETİ AÇ
// ====================

function openCart() {
  document.getElementById("cartPanel")?.classList.add("open");
}


// ====================
// SEPETİ KAPAT
// ====================

function closeCart() {
  document.getElementById("cartPanel")?.classList.remove("open");
}


// ====================
// ÜRÜN DETAYI
// ====================

function openProduct(name, price, image) {

  selectedProduct = {
    name: name,
    price: price,
    image: image,
    size: ""
  };

  document.getElementById("detailName").textContent = name;
  document.getElementById("detailPrice").textContent = price + " TL";
  document.getElementById("detailImage").src = image;

  document.querySelectorAll(".size").forEach(function(button) {
    button.classList.remove("selected");
  });

  document.getElementById("productDetail").classList.add("active");

  document.body.style.overflow = "hidden";
}


// ====================
// ÜRÜN DETAYI KAPAT
// ====================

function closeProduct() {

  document.getElementById("productDetail").classList.remove("active");

  document.body.style.overflow = "auto";
}


// ====================
// BEDEN SEÇ
// ====================

function selectSize(button, size) {

  document.querySelectorAll(".size").forEach(function(item) {
    item.classList.remove("selected");
  });

  button.classList.add("selected");

  selectedProduct.size = size;
}


// ====================
// SEPETE EKLE
// ====================

function addToCart() {

  if (!selectedProduct.name) {
    alert("Önce ürün seç!");
    return;
  }

  if (!selectedProduct.size) {
    alert("Lütfen beden seç!");
    return;
  }

  const existingItem = cart.find(function(item) {
    return (
      item.name === selectedProduct.name &&
      item.size === selectedProduct.size
    );
  });

  if (existingItem) {

    existingItem.quantity++;

  } else {

    cart.push({
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      size: selectedProduct.size,
      quantity: 1
    });

  }

  updateCart();

  alert(
    selectedProduct.name +
    " (" +
    selectedProduct.size +
    ") sepete eklendi!"
  );

  closeProduct();
}


// ====================
// ADET ARTIR
// ====================

function increaseQuantity(index) {

  cart[index].quantity++;

  updateCart();
}


// ====================
// ADET AZALT
// ====================

function decreaseQuantity(index) {

  cart[index].quantity--;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


// ====================
// SEPETTEN SİL
// ====================

function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();
}


// ====================
// SEPETİ GÜNCELLE
// ====================

function updateCart() {

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {

    cartItems.innerHTML = "Sepet boş.";

    cartTotal.textContent = "Toplam: 0 TL";

    if (cartCount) {
      cartCount.textContent = "0";
    }

    return;
  }

  let total = 0;
  let count = 0;

  cartItems.innerHTML = "";

  cart.forEach(function(item, index) {

    const itemTotal =
      item.price * item.quantity;

    total += itemTotal;
    count += item.quantity;

    const itemElement =
      document.createElement("div");

    itemElement.className = "cart-item";

    itemElement.innerHTML = `

      <div class="cart-item-name">
        ${item.name}
      </div>

      <div class="cart-item-info">
        Beden: ${item.size}
      </div>

      <div class="cart-item-info">
        ${item.price} TL
      </div>

      <div style="
        display:flex;
        align-items:center;
        gap:10px;
        margin-top:12px;
      ">

        <button
          onclick="decreaseQuantity(${index})"
          style="
            width:35px;
            height:35px;
            border:1px solid #ccc;
            background:white;
            font-size:20px;
            cursor:pointer;
          "
        >
          −
        </button>

        <strong style="
          min-width:25px;
          text-align:center;
          font-size:17px;
        ">
          ${item.quantity}
        </strong>

        <button
          onclick="increaseQuantity(${index})"
          style="
            width:35px;
            height:35px;
            border:1px solid #ccc;
            background:#111;
            color:white;
            font-size:20px;
            cursor:pointer;
          "
        >
          +
        </button>

      </div>

      <div class="cart-item-info" style="margin-top:10px;">
        Ara toplam: ${itemTotal} TL
      </div>

      <button
        onclick="removeFromCart(${index})"
        style="
          margin-top:10px;
          padding:7px 12px;
          border:1px solid #ddd;
          background:white;
          cursor:pointer;
        "
      >
        Ürünü kaldır
      </button>
    `;

    cartItems.appendChild(itemElement);
  });

  cartTotal.textContent =
    "Toplam: " + total + " TL";

  if (cartCount) {
    cartCount.textContent = count;
  }
}


// ====================
// BAŞLANGIÇ
// ====================

console.log("VEYRO SCRIPT ÇALIŞIYOR");

updateCart();
