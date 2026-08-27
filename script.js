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
  const cartPanel = document.getElementById("cartPanel");

  if (cartPanel) {
    cartPanel.classList.add("open");
  }
}


// ====================
// SEPETİ KAPAT
// ====================

function closeCart() {
  const cartPanel = document.getElementById("cartPanel");

  if (cartPanel) {
    cartPanel.classList.remove("open");
  }
}


// ====================
// ÜRÜN DETAYINI AÇ
// ====================

function openProduct(name, price, image) {

  console.log("ÜRÜN AÇILIYOR:", name);

  selectedProduct = {
    name: name,
    price: price,
    image: image,
    size: ""
  };

  const detailName = document.getElementById("detailName");
  const detailPrice = document.getElementById("detailPrice");
  const detailImage = document.getElementById("detailImage");
  const productDetail = document.getElementById("productDetail");

  if (detailName) {
    detailName.textContent = name;
  }

  if (detailPrice) {
    detailPrice.textContent = price + " TL";
  }

  if (detailImage) {
    detailImage.src = image;
  }

  // Önceki beden seçimini temizle
  document.querySelectorAll(".size").forEach(function(button) {
    button.classList.remove("selected");
  });

  if (productDetail) {
    productDetail.classList.add("active");
  }

  document.body.style.overflow = "hidden";
}


// ====================
// ÜRÜN DETAYINI KAPAT
// ====================

function closeProduct() {

  const productDetail =
    document.getElementById("productDetail");

  if (productDetail) {
    productDetail.classList.remove("active");
  }

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

  console.log("Seçilen beden:", size);
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
// SEPETİ GÜNCELLE
// ====================

function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");

  const cartCount =
    document.getElementById("cartCount");


  if (!cartItems || !cartTotal) {
    return;
  }


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
        ${item.price} TL × ${item.quantity}
      </div>

      <div class="cart-item-info">
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
// SEPETTEN ÜRÜN SİL
// ====================

function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();

}


// ====================
// SAYFA YÜKLENDİ
// ====================

console.log("VEYRO SCRIPT ÇALIŞIYOR");

updateCart();
