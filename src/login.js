// Login page interactions.
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  // No password is stored. This is a demonstration, not authentication.
  const user = getUser();
  user.email = document.getElementById("email").value;
  saveUser(user);
  sessionStorage.setItem("signedIn", "true");
  location.href = "dashboard.html";
});
