if (!user) GoLogin();

const content = document.querySelector(".content")

const cart = user.cart;
const fav = user.fav;

if (!cart.length && !fav.length) {
    document.body.innerHTML = `<div class="not-found-msg">${notFound("no data to show", "")}
    </br>
    <a href="../home/page.html">add some products</a>
    </div>`;
}

const cartContaienr = document.querySelector(".cart-contaienr");
const totalPrice = document.querySelector(".total-price span");

function Carts() {
    cartContaienr.innerHTML = loader
    if (!cart.length) {
        document.querySelector(".cart-product-sec").innerHTML = notFound("no products in cart");
    }
    cartContaienr.innerHTML = cart.map(i => (
        `<div class="cart-contaienr item${i.id}">
            <div class="cart-card">
                <div class="cart-img-contaniner">
                    <img src="${i.image}" alt="${i.name}">
                </div>
                <div class="cart-card-body">
                    <h3>${i.name}</h3>
                    <p><span>${i.category || ""}</span>
                        <span>${i.price}<sup>$</sup></span>
                    </p>

                    <div class="cart-btn-container">
                        <div class="cart-quantaty-btn">
                            <button onClick="mangeQuantaty('decrease', ${i.id}, ${i.price}, ${i.count})">-</button>
                            <span class="quantaty">${i.count}</span>
                            <button onClick="mangeQuantaty('increase', ${i.id}, ${i.price}, ${i.count})">+</button>
                        </div>

                        <button class="cart-btn clickEffect" onClick="removeCart(${i.id}, ${i.count}, ${i.price})">remove cart</button>
                    </div>
                </div>
            </div>
        </div>`
    )).join("")
    content.classList.remove("hidden");
    return;
}

totalPrice.textContent = (cart.reduce((acc, cur) => (acc + (cur.price * cur.count)), 0)).toFixed(2)

function removeCart(id, count, price) {
    document.querySelector(`.item${id}`).classList.add("hidden")
    totalPrice.textContent = (+(totalPrice.textContent) - count * price).toFixed(2)
    const otherPro = user.cart.filter(i => i.id !== id)
    user.cart = otherPro;
    syncUserData(user)
    if (!otherPro.length) {
        document.querySelector(".cart-product-sec").innerHTML = notFound("no products in cart");
    }
    return;
}

function mangeQuantaty(status, id, price, count) {
    if (status === "increase") {
        ++document.querySelector(`.item${id} .quantaty`).textContent;
        totalPrice.textContent = (+(totalPrice.textContent) + price).toFixed(2)
        ++cart.find(i => i.id == id).count;
    } else if (status === "decrease") {
        if (count <= 0) return;
        --document.querySelector(`.item${id} .quantaty`).textContent
        totalPrice.textContent = (+(totalPrice.textContent) - price).toFixed(2)
        const newValue = --cart.find(i => i.id == id).count;
        if (newValue == 0) {
            document.querySelector(`.item${id}`).classList.add("hidden")
            const otherPro = cart.filter(i => i.id !== id)
            user.cart = otherPro;
            if (!otherPro.length) {
                document.querySelector(".cart-product-sec").innerHTML = notFound("no products in cart");
            }
        }
    }
    syncUserData(user)
    return;
}
const slider = document.querySelector(".slider");

async function Favs() {
    slider.innerHTML = loader;
    if (!fav.length) {
        document.querySelector(".fav-sec").innerHTML = notFound("no favorite items")
        return;
    }
    const res = await fetch(`${domain}/json/data.json`);
    const data = await res.json();

    const results = data.filter(i => fav.includes(i.id)) || [];
    document.querySelector(".item-length span").textContent = results.length;

    slider.innerHTML = results.map(i => (`
       <div class="fav-cart fav-item${i.id}">
                <div class="fav-img-contaienr">
                    <img src="${i.image}" alt="${i.name}" />
                </div>
                <div class="fav-card-body">
                    <h3 class="item-title">${i.name}</h3>
                    <p class="cat">${i.category}</p>
                </div>
                <button onClick="removeFav(${i.id})" class="like"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                        class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg></button> </div>`)).join("");
    content.classList.remove("hidden");

    return;
} 

document.getElementById("left")?.addEventListener('click', () => {
    slider.scrollBy({
        left: -400,
        behavior: "smooth"
    })
})

document.getElementById("right")?.addEventListener('click', () => {
    slider.scrollBy({
        left: 400,
        behavior: "smooth"
    })
})

function removeFav(id) {
    document.querySelector(`.fav-item${id}`).classList.add("hidden");
    --document.querySelector(".item-length span").textContent;
    const favItems = user.fav.filter(i => i !== id);
    user.fav = favItems;
    syncUserData(user);
    if (!favItems.length) {
        document.querySelector(".fav-sec").innerHTML = notFound("no favorite items")
    }
    return;

}

if (!cart.length && !fav.length) {
    content.innerHTML = `<div class="not-found-msg">${notFound("no data to show", true)}
    </br>
    <a href="/home/page.html">add some products</a>
    </div>`;
    content.classList.toggle("hidden")
}else{
    Carts();
    Favs();
}