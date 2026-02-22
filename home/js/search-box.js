document.querySelector(".filter-search-btn").addEventListener("click", function () { this.classList.toggle("open") });
var searchType = "name";

document.querySelectorAll("[name=searchType]").forEach(i => i.onclick = () => {
    document.querySelector(".btn-value span").textContent = i.value;
    searchType = i.value === "search category" ? "category" : "name"
});

//--------------------------
async function handelSearch(type = "name", value) {
    if (!value) return;
    const res = await fetch(domain + '/json/data.json');
    const data = await res.json();

    return data.filter(i => (type === "category" ? i.category : i.name).trim().toLowerCase().startsWith(value.trim().toLowerCase())) || [];
}

//--------------------------
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

//--------------------------
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