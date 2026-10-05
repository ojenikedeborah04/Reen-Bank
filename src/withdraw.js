// Withdraw page interactions.
requireLogin();
document.getElementById("withdraw-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = Number(document.getElementById("amount").value);
  const account = getAccounts().find(
    (item) => item.name === getSelectedAccount(),
  );
  if (!Number.isFinite(amount) || amount <= 0)
    return showMessage("Enter a valid amount.");
  if (amount > account.balance)
    return showMessage("Insufficient demo funds in this account.");
  addTransaction(
    -amount,
    "Bank Transfer",
    document.getElementById("account-name").value.trim(),
  );
  sessionStorage.setItem("lastAmount", String(amount));
  location.href = "withdraw-confirmation.html";
});
