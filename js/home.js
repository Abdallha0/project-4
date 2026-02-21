
//------------------------
document.querySelector(".filter-search-btn").addEventListener("click", function () { this.classList.toggle("open") });
var searchType = "name";

document.querySelectorAll("[name=searchType]").forEach(i => i.onclick = () => {
    document.querySelector(".btn-value span").textContent = i.value;
    searchType = i.value === "search category" ? "category" : "name"
});

async function handelSearch(type = "name", value) {
    if (!value) return;
    const res = await fetch(domain + '/json/data.json');
    const data = await res.json();

    return data.filter(i => (type === "category" ? i.category : i.name).trim().toLowerCase().startsWith(value.trim().toLowerCase())) || [];
}

const productsSec = document.querySelector(".products-sec");

// normal search
document.getElementById("search-form").onsubmit = async (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim() || "";
    if (!value) return;

    const results = await handelSearch(searchType, value) || [];

    productsSec.innerHTML = results.length >= 1 ? (results.map(i => {
        return createProductCard(i)
    }).join("")) : `<h2 calss="not-found-msg">No products ${searchType} matches yours query</h2>`;
}

// live search
document.getElementById("search").oninput = async function () {
    const value = this.value.trim();
    if (!value) {
        products();
        return;
    }
    const results = await handelSearch(searchType, value)
    productsSec.innerHTML = results.length >= 1 ? (results.map(i => {
        return createProductCard(i)
    }).join("")) : `<h2 class="not-found-msg">No products ${searchType} matches yours query</h2>`;
}
//------------------------
async function products() {
    productsSec.innerHTML = loader
    const res = await fetch(domain + '/json/data.json');
    const data = await res.json();

    productsSec.innerHTML = data.map(i => {
        return createProductCard(i)
    }).join("");
};

products()
function createProductCard(i) {
    return `<div class="product-card">
            <div class="img-container">
                <img src="${i.image}" alt="${i.name}">
            </div>
            <div class="card-body">
                <h3>${i.name}</h3>
                <p price="${i.price}">price: <span>${i.price}$</span></p>
                <p>category: <span>${i.category}</span></p>
                <div class="card-btns-container">
                <div id="likes-container${i.id}">
                    ${(user?.fav || []).some(it => it == i.id) ? (
            `<button onClick="like('remove',${i.id})"
                         id="liked${i.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                            class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                        </svg>
                    </button>`) :
            (`<button onClick="like('set', ${i.id});" id="like${i.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-heart" viewBox="0 0 18 18">
                            <path
                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                    </button>`)}
                    </div>
                    <div id="cart-container${i.id}">
                    ${(user?.cart || []).some(it => it.id === i.id) ? (`<button onClick="cart('remove', ${i.id}, '${i.name}', '${i.category}', ${i.image}', ${i.price})" class="remove-cart">remove to cart</button>`) : (`<button onClick="cart('set', ${i.id}, '${i.name}', '${i.category}', '${i.image}', ${i.price})" class="add-cart">add to cart</button>`)}
                    </div>
                </div>
            </div>
        </div>
`;
};
//------------------------
function like(status, id) {
    if (!user) {
        GoLogin()
        return;
    }
    if (status === "set") {
        document.getElementById(`likes-container${id}`).innerHTML = `
        <button onClick="like('remove',${id})"
                         id="liked${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                            class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                        </svg>
        </button>`
        if (user.fav) {
            if (user.fav.includes(id)) return;
            user.fav.push(id);
        } else {
            user['fav'] = [id];
        }
        syncUserData(user)
    } else if (status === "remove") {
        document.getElementById(`likes-container${id}`).innerHTML = `
        <button onClick="like('set', ${id});" id="like${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-heart" viewBox="0 0 18 18">
                            <path
                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
        </button>`

        if (user.fav) {
            if (!user.fav.includes(id)) return;
            const getAllIds = user.fav.filter(i => i !== id);
            user.fav = getAllIds
        }
        syncUserData(user)
    }
};

//------------------------
function cart(status, id, name, category, image, price) {
    if (!user) {
        GoLogin()
        return;
    }
    const item = user?.cart.find(i => i.id == id)
    if (status === "set") {
        document.getElementById(`cart-container${id}`).innerHTML = `<button onClick="cart('remove', ${id}, '${name}', '${category}', '${image}', ${price})" class="remove-cart">remove to cart</button>`
        if (user.cart) {
            if (item) return;
            user.cart.push({ id, count: 1, name, category, image, price });
        }
        ++cartCount.textContent;
    } else if (status === "remove") {
        document.getElementById(`cart-container${id}`).innerHTML = `<button onClick="cart('set', ${id}, '${name}', '${category}', '${image}', ${price})" class="add-cart">add to cart</button>`
        if (user.cart) {
            if (!item) return;
            const getAllProds = user.cart.filter(i => i.id !== id);
            user.cart = getAllProds

        } else {
            user['cart'] = [];
        }
        cartCount.textContent = +cartCount.textContent - (item.count);
    }

    syncUserData(user)
    return;

};

//------------------------
function mangeQuantaty(p, ind) {
    const product = user.cart[ind];
    if (p === "increase") {
        product.count += 1;
        ++cartCount.textContent;
    } else if (p === "decrease") {
        if (!product || !user.cart) {
            document.getElementsByTagName("aside")[0].classList.toggle("hidden");
            document.getElementById(`cart-product${ind}`).classList.toggle("hidden");
            document.getElementById(`cart-container${product.id}`).innerHTML = `<button onClick="cart('set', ${product.id}, '${product.name}', ', '${product.category}'', '${product.image}', ${product.price})" class="add-cart">add to cart</button>`
            return;
        };
        product.count -= 1;
        --cartCount.textContent;
    }

    if (!product.count > 0) {
        document.getElementsByTagName("aside")[0].classList.toggle("hidden");
        document.getElementById(`cart-product${ind}`).classList.toggle("hidden");
        document.getElementById(`cart-container${product.id}`).innerHTML = `<button onClick="cart('set', ${product.id}, '${product.name}', '${product.image}', ${product.price})" class="add-cart">add to cart</button>`
        const products = user.cart.filter(i => i.count > 0);
        user.cart = products;
    }

    document.querySelector(`.quantaty${ind}`).textContent = product.count;
    syncUserData(user)
    return;

}

function handleCartClick() {
    const cartProductsContaienr = document.getElementById("cart-product-container");
    if (user.cart.length <= 0) {
        location.assign(domain + "/cart/page.html")
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
                   <strong> ${i.price}<sup>$</sup></strong>
                </p>
            </div>
            <div class="quantaty-container">
                <button onClick="mangeQuantaty('decrease', ${ind})" class="clickEffect"> - </button>
                <span class="quantaty${ind}">${i.count}</span>
                <button onClick="mangeQuantaty('increase', ${ind})" class="clickEffect"> + </button>
            </div>
        </div>
        `)
    }
    ).join("")

    document.getElementsByTagName("aside")[0].classList.toggle("hidden")
    return;
}

function scrollTop() {
    const fullHeight = window.screen.availHeight;
    const topBtn = document.getElementById("top-btn")

    if (window.pageYOffset >= (fullHeight / 2)) {
        topBtn.classList.remove("hidden")
    } else {
        topBtn.classList.add("hidden")
    }

    topBtn.onclick = () => window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

window.addEventListener("scroll", scrollTop)

