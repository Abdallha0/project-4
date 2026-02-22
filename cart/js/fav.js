
const slider = document.querySelector(".slider");
async function Favs() {
    slider.innerHTML = loader;
    if (!fav.length) {
        document.querySelector(".fav-sec").innerHTML = notFound("no favorite items");
        return;
    }
    const res = await fetch(`${domain}/json/data.json`);
    const data = await res.json();

    const results = data.filter(i => fav.includes(i.id)) || [];
    document.querySelector(".item-length span").textContent = results.length;

    slider.innerHTML = results.map(i => (`
       <div class="fav-cart fav-item${i.id}">
                <div class="fav-img-contaienr">
                    <img src="${i.image}" alt="${i.name}" />
                </div>
                <div class="fav-card-body">
                    <h3 class="item-title">${i.name}</h3>
                    <p class="cat">${i.category}</p>
                </div>
                <button onClick="removeFav(${i.id})" class="like"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                        class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg></button> </div>`)).join("");
    content.classList.remove("hidden");

    return;
}

document.getElementById("left")?.addEventListener('click', () => {
    slider.scrollBy({
        left: -400,
        behavior: "smooth"
    });
});

document.getElementById("right")?.addEventListener('click', () => {
    slider.scrollBy({
        left: 400,
        behavior: "smooth"
    });
});

function removeFav(id) {
    document.querySelector(`.fav-item${id}`).classList.add("hidden");
    --document.querySelector(".item-length span").textContent;
    const favItems = user.fav.filter(i => i !== id);
    user.fav = favItems;
    syncUserData(user);
    if (!favItems.length) {
        if (!user.cart.length) {
            content.innerHTML = `<div class="not-found-msg">${notFound("no data to show", true)}
    </br>
    <a href="../home/page.html">add some products</a>
    </div>`;
            return;
        }
        document.querySelector(".fav-sec").innerHTML = notFound("no favorite items");
        document.querySelector(".fav-sec").style.height = "50%"
    }
    return;

}
