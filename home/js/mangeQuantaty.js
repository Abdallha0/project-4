function mangeQuantaty(p, ind) {
    const product = user.cart[ind];
    const priceTag = document.querySelector(`.cart-porduct-price${product.id}`);
    if (p === "increase") {
        product.count += 1;
        ++cartCount.textContent;
    } else if (p === "decrease") {
        if (!product || !user.cart) {
            document.getElementsByTagName("aside")[0].classList.toggle("hidden");
            document.getElementById(`cart-product${ind}`).classList.toggle("hidden");
            document.getElementById(`cart-container${product.id}`).innerHTML = `<button onClick="cart('set', ${product.id}, '${product.name}', ', '${product.category}'', '${product.image}', ${product.price})" class="add-cart">add to cart</button>`;
            return;
        };
        product.count -= 1;
        --cartCount.textContent;
    }

    if (!product.count > 0) {
        document.getElementsByTagName("aside")[0].classList.toggle("hidden");
        document.getElementById(`cart-product${ind}`).classList.toggle("hidden");
        document.getElementById(`cart-container${product.id}`).innerHTML = `<button onClick="cart('set', ${product.id}, '${product.name}', '${product.image}', ${product.price})" class="add-cart">add to cart</button>`;
        const products = user.cart.filter(i => i.count > 0);
        user.cart = products;
    }
    priceTag.innerHTML = `${product.count * product.price}<sup>$</sup>`;
    document.querySelector(`.quantaty${ind}`).textContent = product.count;
    syncUserData(user);
    return;

}
