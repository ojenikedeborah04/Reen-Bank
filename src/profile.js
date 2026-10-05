// Profile page interactions.
requireLogin();
const user = getUser();
document.getElementById("email").value = user.email;
document.getElementById("phone").value = user.phone;
document.getElementById("gender").value = user.gender;
renderBalances();
renderFeed();
document.getElementById("profile-form").addEventListener("submit", (event) => {
  event.preventDefault();
  user.email = document.getElementById("email").value;
  user.phone = document.getElementById("phone").value;
  user.gender = document.getElementById("gender").value;
  saveUser(user);
  showMessage("Demo profile updated.");
});
setupSearch(renderFeed);
