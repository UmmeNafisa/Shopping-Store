const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product g-4 card h-100">
      <img class="product-image card-img-top" src=${product.image} >
        <div class="card-body card-part">
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <h4 class="text-danger">Price: $ ${product.price}</h4>
      <h6>Rating: ${product.rating.rate} (${product.rating.count}) </h6>
      <div class="card-footer">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadASingleProduct(${product.id})" id="details-btn" class="btn btn-info">Details</button>
    </div>
     
        </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count++;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = Number(parseFloat(element).toFixed(2));
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = Number(parseFloat(value).toFixed(2));
  const totalPrice = Number(convertedOldPrice) + convertPrice;
  document.getElementById(id).innerText = Number(parseFloat(totalPrice).toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Number(parseFloat(value).toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  let priceConverted = getInputValue("price");
  priceConverted = Number(priceConverted)
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  let grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  // grandTotal = Number(parseFloat(grandTotal).toFixed(2))
  document.getElementById("total").innerText = grandTotal;
};

// for a single product details API
const loadASingleProduct = id => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => displaySingleProductDetails(data));
}

const displaySingleProductDetails = product => {
  console.log(product)
  const singleProduct = document.getElementById("single-product-details");
  singleProduct.textContent = "";
  window.scrollTo(0, 40);
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
  <div class="single-product g-4 card h-100 text-center">
    <img class="product-image card-img-top" src=${product.image} >
      <div class="card-body card-part">
    <h4>${product.title}</h4>
    <p> Description: ${product.description}</p>
    <h4 class="text-danger">Price: $ ${product.price}</h4>
    <h6>Rating: ${product.rating.rate} (${product.rating.count}) </h6>
    <div class="card-footer">
    <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
  </div>
   
      </div>
    </div>
    `;
  singleProduct.appendChild(div);
}
