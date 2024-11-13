// cart.js
let cart = [];

function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
