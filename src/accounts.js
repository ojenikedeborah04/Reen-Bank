// Accounts page interactions.
requireLogin();
renderAccountCards();
renderBalances();
renderFeed();
document.getElementById("add-account").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("account-name").value.trim();
  if (!name) return showMessage("Enter an account name.");
  const accounts = getAccounts();
  if (
    accounts.some(
      (account) => account.name.toLowerCase() === name.toLowerCase(),
    )
  )
    return showMessage("That account already exists.");
  accounts.push({ name: name, balance: 0 });
  sessionStorage.setItem("accounts", JSON.stringify(accounts));
  renderAccountCards();
  event.target.reset();
  showMessage("Savings account added to the demo.");
});
setupSearch(renderFeed);
