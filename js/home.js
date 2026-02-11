const activeUser = localStorage.getItem("active-user") || "";
const headerParent = document.querySelector(".header-parent");
const users = JSON.parse(localStorage.getItem("users"));
const user = users?.find(i => i.email === activeUser);
const domain = "https://abdallha0.github.io/project-4"
// const domain = `${location.origin}`;
//------------------------

const GoLogin = () => location.assign(domain + "/login/page.html");
const logOut = () => {
    localStorage.removeItem("active-user");
    location.assign(domain + "/login/page.html");
}
//------------------------
if (activeUser) {
    headerParent.innerHTML = `<div class="header-container">
            <span class="name">${user.firstName}</span>
            <button class="cart-btn"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                    class="bi bi-cart4" viewBox="0 0 16 16">
                    <path
                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
                ${(JSON.parse(localStorage.getItem("cart"))?.data) && (JSON.parse(localStorage.getItem("cart"))?.user === activeUser) ? (`<span class="count">${JSON.parse(localStorage.getItem("cart"))?.data.length}</span>`) : ""}
                </button>
            <button class="sing-btn" onClick="logOut()" id="logout">log out</button>
        </div>`
} else {
    headerParent.innerHTML = `<div class="sign-container">
            <button onClick="GoLogin()" class="sing-btn" id="login">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-cup-hot-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6zM13 12.5a2 2 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5" />
                    <path
                        d="m4.4.8-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 3.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 6.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 9.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8" />
                </svg> log in </button>
        </div>`
}

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
    }).join("")) : `<h2>No products ${searchType} matches yours query</h2>`;
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
    }).join("")) : `<h2>No products ${searchType} matches yours query</h2>`;
}
//------------------------
async function products() {
    productsSec.innerHTML = "<p>...loading</p>"
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
                    ${(JSON.parse(localStorage.getItem("fav"))?.data || []).some(it => it === i.id) && (JSON.parse(localStorage.getItem("fav"))?.user === activeUser) ? (
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
                    ${(JSON.parse(localStorage.getItem("cart"))?.data || []).some(it => it === i.id) && (JSON.parse(localStorage.getItem("cart"))?.user === activeUser) ? `<button onClick="cart('remove', ${i.id})" class="remove-cart">remove to cart</button>` : `<button onClick="cart('set', ${i.id})" class="add-cart">add to cart</button>`}
                    </div>
                </div>
            </div>
        </div>
`;
};
//------------------------
function like(status, id) {
    const favIds = JSON.parse(localStorage.getItem("fav"))?.data || []
    if (status === "set") {
        if (!user) {
            GoLogin()
            return;
        }

        document.getElementById(`likes-container${id}`).innerHTML = `
        <button onClick="like('remove',${id})"
                         id="liked${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                            class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                        </svg>
        </button>`
        if (favIds.includes(id)) return;
        localStorage.setItem("fav", JSON.stringify({ user: activeUser, data: [...favIds, id] }));
    } else if (status === "remove") {
        document.getElementById(`likes-container${id}`).innerHTML = `
        <button onClick="like('set', ${id});" id="like${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-heart" viewBox="0 0 18 18">
                            <path
                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
        </button>`
        let reomvePro = favIds.filter(it => it !== id)
        localStorage.setItem("fav", JSON.stringify({ user: activeUser, data: reomvePro }))
    }
};
//------------------------
function cart(status, id) {
    const cartIds = JSON.parse(localStorage.getItem("cart"))?.data || []
    if (status === "set") {
        if (!user) {
            GoLogin()
            return;
        }

        document.getElementById(`cart-container${id}`).innerHTML = `<button onClick="cart('remove', ${id})" class="remove-cart">remove to cart</button>`
        if (cartIds.includes(id)) return;
        localStorage.setItem("cart", JSON.stringify({ user: activeUser, data: [...cartIds, id] }));
    } else if (status === "remove") {
        document.getElementById(`cart-container${id}`).innerHTML = `<button onClick="cart('set', ${id})" class="add-cart">add to cart</button>`
        let reomvePro = cartIds.filter(it => it !== id)
        localStorage.setItem("cart", JSON.stringify({ user: activeUser, data: reomvePro }))
    }
    document.querySelector(".count").textContent = JSON.parse(localStorage.getItem("cart"))?.data.length

};
//------------------------

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