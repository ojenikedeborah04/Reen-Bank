// Fund Wallet page interactions.
requireLogin();
const cardFields = document.getElementById("card-fields");
function changeMethod() {
  const isCard =
    document.querySelector('input[name="method"]:checked').value ===
    "Credit Card";
  cardFields.classList.toggle("hidden", !isCard);
  cardFields
    .querySelectorAll("input")
    .forEach((input) => (input.disabled = !isCard));
}
document
  .querySelectorAll('input[name="method"]')
  .forEach((input) => input.addEventListener("change", changeMethod));
changeMethod();
document.getElementById("fund-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = Number(document.getElementById("amount").value);
  if (!Number.isFinite(amount) || amount <= 0 || amount > 10000000)
    return showMessage("Enter an amount between ₦1 and ₦10,000,000.");
  const method = document.querySelector('input[name="method"]:checked').value;
  // Card details are deliberately never saved or sent anywhere.
  addTransaction(amount, method, getUser().name);
  sessionStorage.setItem("lastAmount", String(amount));
  location.href = "fund-confirmation.html";
});
