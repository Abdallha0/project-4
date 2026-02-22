async function products() {
    productsSec.innerHTML = loader
    const res = await fetch(domain + '/json/data.json');
    const data = await res.json();

    productsSec.innerHTML = data.map(i => {
        return createProductCard(i)
    }).join("");
};

//--------------------------
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
                    ${(user?.cart || []).some(it => it.id === i.id) ? (`<button onClick="cart('remove', ${i.id}, '${i.name}', '${i.category}', '${i.image}', ${i.price})" class="remove-cart">remove to cart</button>`) : (`<button onClick="cart('set', ${i.id}, '${i.name}', '${i.category}', '${i.image}', ${i.price})" class="add-cart">add to cart</button>`)}
                    </div>
                </div>
            </div>
        </div>
`;
};