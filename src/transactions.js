// Transactions page interactions.
requireLogin();
renderAccountCards();
function renderTable() {
  const query = document.getElementById("search").value.toLowerCase();
  const status = document.getElementById("status-filter").value;
  const rows = getTransactions().filter(
    (item) =>
      (status === "All statuses" || item.status === status) &&
      (item.name + item.method).toLowerCase().includes(query) &&
      item.account === getSelectedAccount(),
  );
  document.getElementById("transaction-table").innerHTML =
    rows
      .map(
        (item) =>
          `<tr class="border-b border-neutral-200 text-neutral-500"><td class="p-4"><span class="inline-flex size-9 items-center justify-center rounded-full text-white ${item.amount > 0 ? "bg-[#30b38b]" : "bg-[#ed5064]"}">${item.amount > 0 ? "+" : "−"}</span></td><td>${escapeHTML(item.name)}</td><td>${escapeHTML(item.method)}</td><td>${escapeHTML(item.date)}</td><td class="font-bold ${item.amount > 0 ? "text-[#30b38b]" : "text-[#ed5064]"}">${item.amount > 0 ? "+" : "−"}${money(Math.abs(item.amount))}</td><td><span class="block rounded-md px-5 py-2 text-center ${item.status === "Completed" ? "bg-[#30b38b] text-white" : item.status === "Canceled" ? "bg-[#ed5064] text-white" : "bg-neutral-300 text-neutral-600"}">${item.status}</span></td></tr>`,
      )
      .join("") ||
    '<tr><td colspan="6" class="py-10 text-center text-neutral-500">No transactions found for this account.</td></tr>';
}
renderTable();
setupSearch(renderTable);
document
  .getElementById("status-filter")
  .addEventListener("change", renderTable);
window.addEventListener("accountchange", renderTable);
