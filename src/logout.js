// Logout page interactions.
document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.clear();
  location.href = "login.html";
});
