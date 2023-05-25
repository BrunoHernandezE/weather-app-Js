const searchForm = document.querySelector(".search__section__container")
const searchInput = document.querySelector("#search-input")

const cityHistoryList = ["London", "Barcelona", "Long Bach"]

/* This code, gets the value of the
search input field, creates a new URL object with the current origin and sets the "cityName"
parameter to the value of the search input. Finally, it redirects the user to the new URL with the
updated search parameter. This is likely used for searching for a specific city on a weather
website. */
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = searchInput.value
  const originUrl = new URL("index.html", window.location.origin)
  originUrl.searchParams.set("cityName", cityName)
  window.location.href = originUrl.href
})






