const content = document.querySelector(".content")
const cart = user.cart;
const fav = user.fav;
const totalPrice = document.querySelector(".total-price span");

if (!cart.length && !fav.length) {
    content.innerHTML = `<div class="not-found-msg">${notFound("no data to show", true)}
    </br>
    <a href="../home/page.html">add some products</a>
    </div>`;
    content.classList.toggle("hidden")
} else {
    Carts();
    Favs();
}

totalPrice.textContent = (cart.reduce((acc, cur) => (acc + (cur.price * cur.count)), 0)).toFixed(2)
window.addEventListener("scroll", scrollTop)