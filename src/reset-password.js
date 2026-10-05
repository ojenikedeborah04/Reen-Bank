// Reset Password page interactions.
document.getElementById("reset-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const user = getUser();
  user.email = document.getElementById("email").value;
  saveUser(user);
  sessionStorage.setItem("otpPurpose", "reset");
  sessionStorage.removeItem("resetVerified");
  location.href = "reset-otp.html";
});
