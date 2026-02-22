function cart(status, id, name, category, image, price) {
    if (!user) {
        GoLogin();
        return;
    }
    const item = user?.cart.find(i => i.id == id);
    if (status === "set") {
        document.getElementById(`cart-container${id}`).innerHTML = `<button onClick="cart('remove', ${id}, '${name}', '${category}', '${image}', ${price})" class="remove-cart">remove to cart</button>`;
        if (user.cart) {
            if (item) return;
            user.cart.push({ id, count: 1, name, category, image, price });
        }
        ++cartCount.textContent;
    } else if (status === "remove") {
        document.getElementById(`cart-container${id}`).innerHTML = `<button onClick="cart('set', ${id}, '${name}', '${category}', '${image}', ${price})" class="add-cart">add to cart</button>`;
        if (user.cart) {
            if (!item) return;
            const getAllProds = user.cart.filter(i => i.id !== id);
            user.cart = getAllProds;
        } else {
            user['cart'] = [];
        }
        cartCount.textContent = +cartCount.textContent - (item.count);
    }

    syncUserData(user);
    return;

};