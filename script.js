let cart = [];

let selectedProduct = {
  name: "",
  price: 0,
  image: ""
};


// ====================
// SEPET
// ====================

function openCart() {
  const cartPanel = document.getElementById("cartPanel");

  if (cartPanel) {
    cartPanel.classList.add("open");
  }
}


function closeCart() {
  const cartPanel = document.getElementById("cartPanel");

  if (cartPanel) {
    cartPanel.classList.remove("open");
  }
}


function addToCart() {

  if (!selectedProduct.name) {
    return;
  }

  cart.push({
    name: selectedProduct.name,
    price: selectedProduct.price,
    quantity: 1
  });

  alert(selectedProduct.name + " sepete eklendi!");
}


// ====================
// ÜRÜN DETAY
// ====================

function openProduct(name, price, image) {

  console.log("ÜRÜN AÇILIYOR:", name);

  selectedProduct.name = name;
  selectedProduct.price = price;
  selectedProduct.image = image;


  const detailName =
    document.getElementById("detailName");

  const detailPrice =
    document.getElementById("detailPrice");

  const detailImage =
    document.getElementById("detailImage");

  const productDetail =
    document.getElementById("productDetail");


  if (detailName) {
    detailName.textContent = name;
  }


  if (detailPrice) {
    detailPrice.textContent = price + " TL";
  }


  if (detailImage) {
    detailImage.src = image;
  }


  if (productDetail) {
    productDetail.classList.add("active");
  }


  document.body.style.overflow = "hidden";
}


function closeProduct() {

  const productDetail =
    document.getElementById("productDetail");

  if (productDetail) {
    productDetail.classList.remove("active");
  }

  document.body.style.overflow = "auto";
}


// ====================
// SAYFA YÜKLENDİ
// ====================

console.log("VEYRO SCRIPT ÇALIŞIYOR");
