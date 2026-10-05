// Overview page interactions.
requireLogin();
renderAccountCards();
renderBalances();
renderFeed();
document.getElementById("toggle-balance").addEventListener("click", () => {
  togglePrivacy();
  renderBalances();
  renderAccountCards();
});
document.getElementById("period").addEventListener("change", () => {
  renderBalances();
  document.getElementById("notice").textContent =
    "All sample activity is dated this month.";
});
document.getElementById("upgrade").addEventListener("click", () => {
  document.getElementById("notice").textContent =
    "PRO preview: multi-device sign-in would require a secure backend. No charge has been made.";
});
setupSearch(renderFeed);
