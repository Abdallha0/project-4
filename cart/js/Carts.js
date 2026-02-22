const cartContaienr = document.querySelector(".cart-contaienr");

 function Carts() {
    cartContaienr.innerHTML = loader;
    if (!cart.length) {
        document.querySelector(".cart-product-sec").innerHTML = notFound("no products in cart");
    }
    cartContaienr.innerHTML = cart.map(i => {
        if (i.count === 0) return "";
        return `<div class="cart-contaienr item${i.id}">
            <div class="cart-card">
                <div class="cart-img-contaniner">
                    <img src="${i.image}" alt="${i.name}">
                </div>
                <div class="cart-card-body">
                    <h3>${i.name}</h3>
                    <p><span>${i.category || ""}</span>
                        <span class="price${i.id}">${i.price * i.count}<sup>$</sup></span>
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
        </div>`;
    }
    ).join("");
    content.classList.remove("hidden");
    return;
}

//--------------------------
function removingCartEffect1(id) {
    document.querySelector(`.item${id}`).classList.add("hidden");
    const otherPro = user.cart.filter(i => i.id !== id);
    user.cart = otherPro;
    if (!otherPro.length) {
        if (!user.fav.length) {
            content.innerHTML = `<div class="not-found-msg">${notFound("no data to show", true)}
    </br>
    <a href="../home/page.html">add some products</a>
    </div>`;
            return;
        }
        document.querySelector(".cart-product-sec").innerHTML = notFound("no products in cart");
        document.querySelector(".cart-product-sec").style.height = "50%";
    }
}

//--------------------------
function removeCart(id, count, price) {
    totalPrice.textContent = (+(totalPrice.textContent) - count * price).toFixed(2);
    removingCartEffect1(id);
    syncUserData(user);
    return;
}

//--------------------------
function mangeQuantaty(status, id, price, count) {
    const priceTag = document.querySelector(`.price${id}`);
    if (status === "increase") {
        priceTag.innerHTML = `${parseInt(priceTag.textContent) + price}<sup>$</sup>`;
        ++document.querySelector(`.item${id} .quantaty`).textContent;
        totalPrice.textContent = (+(totalPrice.textContent) + price).toFixed(2);
        ++cart.find(i => i.id == id).count;
    } else if (status === "decrease") {
        if (count <= 0) return;
        priceTag.innerHTML = `${parseInt(priceTag.textContent) - price}<sup>$</sup>`;
        --document.querySelector(`.item${id} .quantaty`).textContent;
        totalPrice.textContent = (+(totalPrice.textContent) - price).toFixed(2);
        const newValue = --user.cart.find(i => i.id == id).count;
        if (newValue == 0) {
            removingCartEffect1(id);
        }
    }
    syncUserData(user);
    return;
}
