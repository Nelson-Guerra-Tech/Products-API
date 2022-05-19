// api url
const url = "https://course-api.com/javascript-store-products";

// select products
const productsDOM = document.querySelector(".products-center");
// select loading
const loading = document.querySelector(".loading");

// setup fetch request
const fetchProducts = async () => {
  // loading BEFORE fetching the products
  productsDOM.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // if there is an error, display this
    productsDOM.innerHTML = `<p class="error">there was an error</p>`;
  }
};

// function to display items
// addinh a parameter to the function
const displayProducts = (list) => {
  // each item has the name of product
  //   pull out id, name, price, img
  const productList = list
    .map((product) => {
      const { id } = product;
      const { name: title, price } = product.fields;
      const { url: img } = product.fields.image[0];
      const formatPrice = price / 100;
      console.log(id);
      return `<a href="product.html" class="single-product">
            <img src="${img}" class="single-product-img img" alt="${title}" />
            <footer>
              <h5 class="name">${title}</h5>
              <span class="price">$${formatPrice}</span>
            </footer>
          </a>`;
    })
    .join("");

  // displaying all the products in the api
  productsDOM.innerHTML = ` <div class="products-container">
  ${productList}
  </div>`;
};

// starting function
// remember, async always returns a promise so await MUST be used
const start = async () => {
  const data = await fetchProducts();
  displayProducts(data);
};

// invoke the start
start();
