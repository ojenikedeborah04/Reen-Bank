// Transaction complete page interactions.
requireLogin();
document.getElementById("amount").textContent = money(
  Number(sessionStorage.getItem("lastAmount") || 0),
);
