const filterBtn = document.querySelector(".filter-search-btn");
const searchTypeInput = document.querySelectorAll("[name=searchType]");

filterBtn.addEventListener("click", () => filterBtn.classList.toggle("open"));

searchTypeInput.forEach(i => i.onclick = () => document.querySelector(".btn-value span").textContent = i.value)
