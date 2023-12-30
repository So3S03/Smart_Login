let showUser = document.querySelector("#userName");

showUser.textContent = localStorage.getItem("New_user");

document.querySelector("#logOut")?.addEventListener("click", () => {
  localStorage.removeItem("New_user");
  localStorage.removeItem("cache_site");
  location.href = "index.html";
});
