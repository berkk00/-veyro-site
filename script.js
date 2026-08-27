let cart = [];

let selectedProduct = {
  name: "",
  price: 0,
  image: "",
  size: ""
};

let productPhotos = [];
let currentPhoto = 0;


// ============================
// SEPETİ AÇ
// ============================

function openCart() {
  const cartPanel = document.getElementById("cartPanel");

  if (cartPanel) {
    cartPanel.classList.add("open");
  }
}


// ============================
// SEPETİ KAPAT
// ============================

function closeCart() {
  const cartPanel = document.getElementById("cartPanel");

  if (cartPanel) {
    cartPanel.classList.remove("open");
  }
}


// ============================
// ÜRÜN DETAYINI AÇ
// ============================

function openProduct(name, price, image) {

  selectedProduct = {
    name: name,
    price: price,
    image: image,
    size: ""
  };

  document.getElementById("detailName").textContent = name;
  document.getElementById("detailPrice").textContent = price + " TL";


  // SİYAH ÜRÜNÜN GALERİSİ

  if (name.includes("Siyah")) {

    setProductPhotos([
      "IMG_1713.jpeg",
      "IMG_1715.jpeg",
      "IMG_1716.jpeg"
    ]);

  } else {

    setProductPhotos([
      image
    ]);

  }


  // BEDENLERİ SIFIRLA

  document.querySelectorAll(".size").forEach(function(button) {
    button.classList.remove("selected");
  });


  document.getElementById("productDetail").classList.add("active");

  document.body.style.overflow = "hidden";
}


// ============================
// ÜRÜN DETAYINI KAPAT
// ============================

function closeProduct() {

  const productDetail =
    document.getElementById("productDetail");

  if (productDetail) {
    productDetail.classList.remove("active");
  }

  document.body.style.overflow = "auto";
}


// ============================
// BEDEN SEÇ
// ============================

function selectSize(button, size) {

  document.querySelectorAll(".size").forEach(function(item) {
    item.classList.remove("selected");
  });

  button.classList.add("selected");

  selectedProduct.size = size;
}


// ============================
// GALERİYİ AYARLA
// ============================

function setProductPhotos(photos) {

  productPhotos = photos;
  currentPhoto = 0;

  showPhoto();
  createThumbnails();


  const arrows =
    document.querySelectorAll(".gallery-arrow");

  arrows.forEach(function(arrow) {

    if (productPhotos.length <= 1) {
      arrow.style.display = "none";
    } else {
      arrow.style.display = "flex";
    }

  });
}


// ============================
// FOTOĞRAF GÖSTER
// ============================

function showPhoto() {

  const detailImage =
    document.getElementById("detailImage");

  if (!detailImage || productPhotos.length === 0) {
    return;
  }

  detailImage.src =
    productPhotos[currentPhoto];
}


// ============================
// KÜÇÜK FOTOĞRAFLAR
// ============================

function createThumbnails() {

  const container =
    document.getElementById("thumbnailContainer");

  if (!container) {
    return;
  }

  container.innerHTML = "";


  productPhotos.forEach(function(photo, index) {

    const thumbnail =
      document.createElement("img");

    thumbnail.src = photo;

    thumbnail.alt = "Ürün fotoğrafı";

    thumbnail.className = "thumbnail";


    if (index === currentPhoto) {
      thumbnail.classList.add("active");
    }


    thumbnail.onclick = function() {

      currentPhoto = index;

      showPhoto();

      createThumbnails();

    };


    container.appendChild(thumbnail);

  });
}


// ============================
// ÖNCEKİ FOTOĞRAF
// ============================

function previousPhoto() {

  if (productPhotos.length <= 1) {
    return;
  }

  currentPhoto--;

  if (currentPhoto < 0) {
    currentPhoto =
      productPhotos.length - 1;
  }

  showPhoto();

  createThumbnails();
}


// ============================
// SONRAKİ FOTOĞRAF
// ============================

function nextPhoto() {

  if (productPhotos.length <= 1) {
    return;
  }

  currentPhoto++;

  if (currentPhoto >= productPhotos.length) {
    currentPhoto = 0;
  }

  showPhoto();

  createThumbnails();
}


// ============================
// SEPETE EKLE
// ============================

function addToCart() {

  if (!selectedProduct.name) {

    alert("Önce ürün seç!");

    return;
  }


  if (!selectedProduct.size) {

    alert("Lütfen beden seç!");

    return;
  }


  const existingItem =
    cart.find(function(item) {

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


// ============================
// ADET ARTIR
// ============================

function increaseQuantity(index) {

  if (!cart[index]) {
    return;
  }

  cart[index].quantity++;

  updateCart();
}


// ============================
// ADET AZALT
// ============================

function decreaseQuantity(index) {

  if (!cart[index]) {
    return;
  }

  cart[index].quantity--;


  if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

  }


  updateCart();
}


// ============================
// ÜRÜNÜ SİL
// ============================

function removeFromCart(index) {

  if (!cart[index]) {
    return;
  }

  cart.splice(index, 1);

  updateCart();
}


// ============================
// SEPETİ GÜNCELLE
// ============================

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


    cartTotal.innerHTML = `
      <div>
        Toplam: 0 TL
      </div>

      <button
        type="button"
        onclick="openOrderForm()"
        style="
          width:100%;
          margin-top:15px;
          padding:16px;
          border:none;
          background:#111;
          color:white;
          font-size:16px;
          font-weight:bold;
          cursor:pointer;
          opacity:0.5;
        "
      >
        SİPARİŞİ TAMAMLA
      </button>
    `;


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

        <img
          src="${item.image}"
          alt="${item.name}"
          style="
            width:80px;
            height:80px;
            object-fit:cover;
            background:#f5f5f5;
            flex-shrink:0;
            border-radius:8px;
          "
        >

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


      <div style="
        margin-top:10px;
        font-weight:bold;
      ">
        Ara toplam: ${itemTotal} TL
      </div>


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

  cartTotal.innerHTML = `

    <div>
      Toplam: ${total} TL
    </div>


    <button
      type="button"
      onclick="openOrderForm()"
      style="
        width:100%;
        margin-top:15px;
        padding:16px;
        border:none;
        background:#111;
        color:white;
        font-size:16px;
        font-weight:bold;
        cursor:pointer;
      "
    >
      SİPARİŞİ TAMAMLA
    </button>

  `;


  if (cartCount) {
    cartCount.textContent = count;
  }
}


// ============================
// SİPARİŞ FORMUNU AÇ
// ============================

function openOrderForm() {

  if (cart.length === 0) {

    alert("Sepetiniz boş.");

    return;
  }


  const orderForm =
    document.getElementById("orderForm");


  const orderSummary =
    document.getElementById("orderSummary");


  if (!orderForm) {
    return;
  }


  let total = 0;

  let summaryHTML = `
    <strong>Sipariş Özeti</strong>
    <br><br>
  `;


  cart.forEach(function(item) {

    const itemTotal =
      item.price * item.quantity;


    total += itemTotal;


    summaryHTML += `
      ${item.name}
      <br>
      Beden: ${item.size}
      <br>
      Adet: ${item.quantity}
      <br>
      ${itemTotal} TL
      <br><br>
    `;

  });


  summaryHTML += `
    <strong>Toplam: ${total} TL</strong>
  `;


  if (orderSummary) {
    orderSummary.innerHTML =
      summaryHTML;
  }


  orderForm.classList.add("active");

  document.body.style.overflow = "hidden";
}


// ============================
// SİPARİŞ FORMUNU KAPAT
// ============================

function closeOrderForm() {

  const orderForm =
    document.getElementById("orderForm");


  if (orderForm) {

    orderForm.classList.remove("active");

  }


  document.body.style.overflow = "auto";
}


// ============================
// SİPARİŞ GÖNDER
// ============================

async function submitOrder(event) {

  event.preventDefault();


  if (cart.length === 0) {

    alert("Sepetiniz boş.");

    return;
  }


  const name =
    document.getElementById("customerName").value.trim();


  const phone =
    document.getElementById("customerPhone").value.trim();


  const city =
    document.getElementById("customerCity").value.trim();


  const district =
    document.getElementById("customerDistrict").value.trim();


  const address =
    document.getElementById("customerAddress").value.trim();


  if (
    !name ||
    !phone ||
    !city ||
    !district ||
    !address
  ) {

    alert("Lütfen tüm bilgileri doldurun.");

    return;
  }


  let total = 0;

  let orderDetails = "";


  cart.forEach(function(item) {

    const itemTotal =
      item.price * item.quantity;


    total += itemTotal;


    orderDetails +=
      item.name +
      " | Beden: " +
      item.size +
      " | Adet: " +
      item.quantity +
      " | " +
      itemTotal +
      " TL\n";

  });


  const formData =
    new FormData();


  formData.append(
    "Ad Soyad",
    name
  );


  formData.append(
    "Telefon",
    phone
  );


  formData.append(
    "İl",
    city
  );


  formData.append(
    "İlçe",
    district
  );


  formData.append(
    "Adres",
    address
  );


  formData.append(
    "Sipariş",
    orderDetails
  );


  formData.append(
    "Toplam",
    total + " TL"
  );


  const submitButton =
    document.querySelector(".send-order");


  if (submitButton) {

    submitButton.disabled = true;

    submitButton.textContent =
      "GÖNDERİLİYOR...";

  }


  try {

    const response =
      await fetch(
        "https://formspree.io/f/mqpkznnp",
        {
          method: "POST",

          body: formData,

          headers: {
            "Accept": "application/json"
          }
        }
      );


    if (response.ok) {

      alert(
        "Siparişiniz başarıyla alındı! 🎉\n\n" +
        "Toplam: " +
        total +
        " TL"
      );


      cart = [];


      updateCart();


      document
        .getElementById("orderFormElement")
        .reset();


      closeOrderForm();

      closeCart();


    } else {

      alert(
        "Sipariş gönderilemedi. Lütfen tekrar deneyin."
      );

    }


  } catch (error) {

    console.error(error);


    alert(
      "Bağlantı hatası oluştu. Lütfen tekrar deneyin."
    );

  }


  if (submitButton) {

    submitButton.disabled = false;

    submitButton.textContent =
      "SİPARİŞİ GÖNDER";

  }
}


// ============================
// BAŞLANGIÇ
// ============================

console.log("VEYRO SCRIPT ÇALIŞIYOR");

updateCart();
