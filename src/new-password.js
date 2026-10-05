// Enter new Password page interactions.
if (sessionStorage.getItem("resetVerified") !== "true")
  location.replace("reset-password.html");
document.getElementById("password-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    document.getElementById("password").value !==
    document.getElementById("confirm").value
  )
    return showMessage("Passwords do not match.");
  // Demonstrate the flow without storing a password in browser storage.
  sessionStorage.removeItem("resetVerified");
  sessionStorage.removeItem("otpPurpose");
  location.href = "password-confirmation.html";
});
