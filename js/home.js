const activeUser = localStorage.getItem("active-user");
const loginBtn = document.getElementById("login");

if (activeUser) {
    loginBtn.classList.toggle("hidden")
} else {
    document.querySelector(".header-container").classList.toggle("hidden");
}

 const domain = "https://abdallha0.github.io/project-4"
//const domain = `${location.origin}`
const GoLogin = () => location.assign(domain + "/login/page.html")
loginBtn.onclick = GoLogin;

//------------------------
const users = JSON.parse(localStorage.getItem("users"))
const user = users?.find(i => i.email === activeUser)
document.querySelector(".name").textContent = user.firstName
document.getElementById("logout").onclick = () => {
    localStorage.removeItem("active-user");
    location.assign(domain + "/login/page.html")
}
//------------------------
const cartCount = document.querySelector(".count")
if (JSON.parse(localStorage.getItem("cart"))?.data) {
    cartCount.textContent = JSON.parse(localStorage.getItem("cart"))?.data.length
    cartCount.classList.toggle("hidden");
}
//------------------------
const filterBtn = document.querySelector(".filter-search-btn");
const searchTypeInput = document.querySelectorAll("[name=searchType]");
filterBtn.addEventListener("click", () => filterBtn.classList.toggle("open"));
searchTypeInput.forEach(i => i.onclick = () => document.querySelector(".btn-value span").textContent = i.value)

//------------------------

const productsSec = document.querySelector(".products-sec");
(async function () {
    try{
    productsSec.innerHTML = "<p>...loading</p>"
    const res = await fetch(domain + '/json/data.json');
    const data = await res.json();

    document.writeln("res")

    productsSec.innerHTML = data.map(i => {
     return createProductCard(i)
    }).join("");
} catch (err){
    document.writeln("err")
}})()


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
                    ${(JSON.parse(localStorage.getItem("fav"))?.data || []).some(it => it === i.id) ? (
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
                    ${(JSON.parse(localStorage.getItem("cart"))?.data || []).some(it => it === i.id) ? `<button onClick="cart('remove', ${i.id})" class="remove-cart">remove to cart</button>` : `<button onClick="cart('set', ${i.id})" class="add-cart">add to cart</button>`}
                    </div>
                </div>
            </div>
        </div>
`;
}

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
}

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
    cartCount.textContent = JSON.parse(localStorage.getItem("cart"))?.data.length

}

//------------------------
document.getElementById("top-btn").onclick = () => window.scrollTo({
    top: 0,
    behavior: "smooth"
})