const productsSec = document.querySelector(".products-sec")

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
                    <button id="liked" product="${i.id}" class="liked hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                            class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                        </svg>
                    </button>
                    <button id="like" product="${i.id}" class="like">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-heart" viewBox="0 0 18 18">
                            <path
                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                    </button>
                    <button id="remove-cart" product="${i.id}" class="hidden">remove to cart</button>
                    <button id="add-cart" product="${i.id}" class="">add to cart</button>
                </div>
            </div>
        </div>
`;
}

(async function () {
    const res = await fetch('/json/data.json');
    const data = await res.json();
   productsSec.innerHTML = data.map(i => createProductCard(i))
})()

const filterBtn = document.querySelector(".filter-search-btn");
const searchTypeInput = document.querySelectorAll("[name=searchType]");
const domain = "https://abdallha0.github.io/project-4"
// const domain = "file:///home/abdallha/Desktop/course/projects/project4/"
const GoLogin = () => location.assign(domain + "/login/page.html")

document.getElementById("login").onclick = GoLogin
filterBtn.addEventListener("click", () => filterBtn.classList.toggle("open"));
searchTypeInput.forEach(i => i.onclick = () => document.querySelector(".btn-value span").textContent = i.value)

const likeBtn = document.getElementById("like");
const likedBtn = document.getElementById("liked");
const activeUser = localStorage.getItem("active-user");
const users = JSON.parse(localStorage.getItem("users"))
const user = users?.find(i => i.email === activeUser) // get user
const products = document.querySelectorAll(".product-card");

products.forEach(i => {
    console.log(i)
});


// set product to fav menu
likeBtn?.addEventListener("click", function () {
    console.log("hello")
    if (!user) {
        GoLogin()
        return;
    }
    this.classList.toggle("hidden");
    likedBtn.classList.remove("hidden")

})

// remove product from fav menu
likedBtn?.addEventListener("click", function () {
    this.classList.toggle('hidden')
    likeBtn.classList.remove("hidden")
})
