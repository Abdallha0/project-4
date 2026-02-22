function handleCartClick() {
    const cartProductsContaienr = document.getElementById("cart-product-container");
    if (user.cart.length <= 0) {
        location.assign(domain + "/cart/page.html");
        return;
    }

    cartProductsContaienr.innerHTML = user.cart?.map((i, ind) => {
        if (i.count == 0) return;
        return (`
        <div class="item-container" id="cart-product${ind}">
            <div class="info-contanier">
                <h3>
                    ${i.name}
                </h3>
                <p>
                Price
                   <strong class="cart-porduct-price${i.id}">${i.price * i.count}<sup>$</sup></strong>
                </p>
            </div>
            <div class="quantaty-container">
                <button onClick="mangeQuantaty('decrease', ${ind})" class="clickEffect"> - </button>
                <span class="quantaty${ind}">${i.count}</span>
                <button onClick="mangeQuantaty('increase', ${ind})" class="clickEffect"> + </button>
            </div>
        </div>
        `);
    }
    ).join("");

    document.getElementsByTagName("aside")[0].classList.toggle("hidden");
    return;
}
