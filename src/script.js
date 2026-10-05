// Shared, beginner-friendly helpers. Individual pages have their own JS files.
// This prototype uses sessionStorage, NOT a backend or real authentication.
function getUser() {
  return (
    JSON.parse(sessionStorage.getItem("user") || "null") || {
      name: "Maureen Oguche",
      email: "maureen@example.com",
      phone: "+234 803 041 1314",
      gender: "Female",
    }
  );
}
function saveUser(user) {
  sessionStorage.setItem("user", JSON.stringify(user));
}
function requireLogin() {
  if (sessionStorage.getItem("signedIn") !== "true")
    location.replace("login.html");
}
function showMessage(text) {
  const message = document.getElementById("message");
  if (message) message.textContent = text;
}
function escapeHTML(text) {
  const element = document.createElement("span");
  element.textContent = String(text);
  return element.innerHTML;
}
function money(amount) {
  return (
    "₦ " +
    Number(amount).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
function getAccounts() {
  return (
    JSON.parse(sessionStorage.getItem("accounts") || "null") || [
      { name: "Main Account", balance: 44500 },
      { name: "School Savings", balance: 44500 },
      { name: "Holiday Plan", balance: 44500 },
    ]
  );
}
function getSelectedAccount() {
  return sessionStorage.getItem("selectedAccount") || "Main Account";
}
function getTransactions() {
  const saved = sessionStorage.getItem("transactions");
  if (saved) return JSON.parse(saved);
  // Seed examples, including the opening deposit, reconcile to ₦44,500.
  const date = new Date().toLocaleDateString("en-GB");
  return [
    {
      name: "Oluwaben Jamin",
      method: "Bank Transfer",
      amount: -10000,
      status: "Pending",
      date: date,
      account: "Main Account",
    },
    {
      name: "Oluwaben Jamin",
      method: "Direct Pay",
      amount: 10000,
      status: "Completed",
      date: date,
      account: "Main Account",
    },
    {
      name: "Oluwaben Jamin",
      method: "Bank Transfer",
      amount: -10000,
      status: "Canceled",
      date: date,
      account: "Main Account",
    },
    {
      name: "Oluwaben Jamin",
      method: "Bank Transfer",
      amount: -10000,
      status: "Completed",
      date: date,
      account: "Main Account",
    },
    {
      name: "Opening balance",
      method: "Direct Pay",
      amount: 44500,
      status: "Completed",
      date: date,
      account: "Main Account",
    },
  ];
}
function addTransaction(amount, method, name) {
  const accounts = getAccounts();
  const account = accounts.find((item) => item.name === getSelectedAccount());
  account.balance = Math.round((account.balance + amount) * 100) / 100;
  sessionStorage.setItem("accounts", JSON.stringify(accounts));
  const transactions = getTransactions();
  transactions.unshift({
    name: name,
    method: method,
    amount: amount,
    status: "Completed",
    date: new Date().toLocaleString("en-GB"),
    account: account.name,
  });
  sessionStorage.setItem("transactions", JSON.stringify(transactions));
}
function togglePrivacy() {
  sessionStorage.setItem(
    "hideBalance",
    sessionStorage.getItem("hideBalance") === "true" ? "false" : "true",
  );
}
function displayMoney(amount) {
  return sessionStorage.getItem("hideBalance") === "true"
    ? "••••••"
    : money(amount);
}
function renderBalances() {
  const completed = getTransactions().filter(
    (item) =>
      item.status === "Completed" && item.account === getSelectedAccount(),
  );
  const account = getAccounts().find(
    (item) => item.name === getSelectedAccount(),
  );
  const totals = {
    balance: account.balance,
    income: completed
      .filter((item) => item.amount > 0)
      .reduce((sum, item) => sum + item.amount, 0),
    expense: completed
      .filter((item) => item.amount < 0)
      .reduce((sum, item) => sum - item.amount, 0),
  };
  document.querySelectorAll("[data-money]").forEach((element) => {
    element.textContent = displayMoney(totals[element.dataset.money]);
  });
  const incomeBar = document.getElementById("income-bar");
  const expenseBar = document.getElementById("expense-bar");
  if (incomeBar) {
    const maximum = Math.max(totals.income, totals.expense, 1);
    incomeBar.value = (totals.income / maximum) * 100;
    expenseBar.value = (totals.expense / maximum) * 100;
  }
}
function renderAccountCards() {
  const container = document.getElementById("account-cards");
  if (!container) return;
  container.replaceChildren();
  getAccounts().forEach((account) => {
    const button = document.createElement("button");
    button.className =
      "rounded-xl border-l-4 bg-[#d3f2e7] p-7 text-left transition hover:bg-[#c2eadc] " +
      (account.name === getSelectedAccount()
        ? "border-[#4c2879]"
        : "border-transparent");
    button.setAttribute(
      "aria-pressed",
      String(account.name === getSelectedAccount()),
    );
    button.innerHTML =
      '<span class="block text-sm text-[#4c2879]">' +
      escapeHTML(account.name) +
      '</span><strong class="mt-2 block text-xl">' +
      displayMoney(account.balance) +
      "</strong>";
    button.addEventListener("click", () => {
      sessionStorage.setItem("selectedAccount", account.name);
      renderAccountCards();
      renderBalances();
      renderFeed();
      window.dispatchEvent(new Event("accountchange"));
    });
    container.append(button);
  });
}
function renderFeed() {
  const feed = document.getElementById("transaction-feed");
  if (!feed) return;
  const search = document.getElementById("search");
  const query = search ? search.value.toLowerCase() : "";
  const transactions = getTransactions()
    .filter(
      (item) =>
        item.account === getSelectedAccount() &&
        (item.name + item.method).toLowerCase().includes(query),
    )
    .slice(0, 8);
  feed.innerHTML =
    transactions
      .map(
        (item) =>
          `<div class="flex items-center justify-between gap-3 border-b border-neutral-200 py-4 text-xs text-neutral-500"><span>${escapeHTML(item.name)}</span><span>${escapeHTML(item.date)}</span><strong class="whitespace-nowrap text-sm ${item.amount > 0 ? "text-[#30b38b]" : "text-[#ed5064]"}">${item.amount > 0 ? "+" : "−"}${money(Math.abs(item.amount))}</strong></div>`,
      )
      .join("") ||
    '<p class="py-8 text-sm text-neutral-500">No transactions found.</p>';
}
function setupSearch(render) {
  document.getElementById("search").addEventListener("input", render);
}
// Deferred scripts run after HTML parsing, so these elements already exist.
document.querySelectorAll("[data-user-name]").forEach((element) => {
  element.textContent = getUser().name;
});
const notifications = document.getElementById("notifications");
if (notifications)
  notifications.addEventListener("click", () => {
    const notice = document.getElementById("notice");
    notice.textContent = notice.textContent
      ? ""
      : "You’re all caught up. No new notifications.";
  });
