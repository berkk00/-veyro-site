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
// ÜRÜN DETAYI
// ====================

function openProduct(name, price, image) {

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

  document.querySelectorAll(".size").forEach(function(button) {
    button.classList.remove("selected");
  });

  if (productDetail) {
    productDetail.classList.add("active");
  }

  document.body.style.overflow = "hidden";
}


// ====================
// ÜRÜN DETAYI KAPAT
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

  closeProduct();

  openCart();
}


// ====================
// ADET ARTIR
// ====================

function increaseQuantity(index) {

  if (!cart[index]) return;

  cart[index].quantity =
    Number(cart[index].quantity) + 1;

  updateCart();
}


// ====================
// ADET AZALT
// ====================

function decreaseQuantity(index) {

  if (!cart[index]) return;

  cart[index].quantity =
    Number(cart[index].quantity) - 1;

  if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

  }

  updateCart();
}


// ====================
// SEPETTEN SİL
// ====================

function removeFromCart(index) {

  if (!cart[index]) return;

  cart.splice(index, 1);

  updateCart();
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


  // SEPET BOŞ

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div style="
        text-align:center;
        padding:30px 10px;
        color:#777;
      ">
        Sepet boş.
      </div>
    `;

    cartTotal.textContent =
      "Toplam: 0 TL";

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

    itemElement.className =
      "cart-item";


    itemElement.innerHTML = `

      <div style="
        display:flex;
        gap:12px;
        align-items:flex-start;
      ">

        <!-- ÜRÜN FOTOĞRAFI -->

        <img
          src="${item.image}"
          alt="${item.name}"
          style="
            width:80px;
            height:80px;
            object-fit:cover;
            background:#f5f5f5;
            flex-shrink:0;
          "
        >


        <!-- ÜRÜN BİLGİLERİ -->

        <div style="
          flex:1;
          min-width:0;
        ">

          <div class="cart-item-name">
            ${item.name}
          </div>

          <div class="cart-item-info">
            Beden: ${item.size}
          </div>

          <div class="cart-item-info">
            ${item.price} TL
          </div>


          <!-- ADET -->

          <div style="
            display:flex;
            align-items:center;
            gap:8px;
            margin-top:10px;
          ">

            <button
              type="button"
              onclick="decreaseQuantity(${index})"
              style="
                width:32px;
                height:32px;
                border:1px solid #ccc;
                background:#fff;
                font-size:20px;
                cursor:pointer;
              "
            >
              −
            </button>


            <span style="
              min-width:25px;
              text-align:center;
              font-weight:bold;
            ">
              ${item.quantity}
            </span>


            <button
              type="button"
              onclick="increaseQuantity(${index})"
              style="
                width:32px;
                height:32px;
                border:none;
                background:#111;
                color:#fff;
                font-size:20px;
                cursor:pointer;
              "
            >
              +
            </button>

          </div>

        </div>

      </div>


      <!-- ARA TOPLAM -->

      <div style="
        margin-top:10px;
        font-weight:bold;
      ">
        Ara toplam: ${itemTotal} TL
      </div>


      <!-- ÜRÜNÜ KALDIR -->

      <button
        type="button"
        onclick="removeFromCart(${index})"
        style="
          margin-top:8px;
          padding:7px 12px;
          border:1px solid #ddd;
          background:#fff;
          cursor:pointer;
        "
      >
        Ürünü kaldır
      </button>

    `;


    cartItems.appendChild(itemElement);

  });


  // TOPLAM

  cartTotal.textContent =
    "Toplam: " + total + " TL";


  // SEPET SAYISI

  if (cartCount) {
    cartCount.textContent = count;
  }

}


// ====================
// BAŞLANGIÇ
// ====================

console.log("VEYRO SCRIPT ÇALIŞIYOR");

updateCart();
