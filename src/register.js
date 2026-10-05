// Register page interactions.
document.getElementById("email").value =
  sessionStorage.getItem("prefillEmail") || "";
document.getElementById("register-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  if (!name) return showMessage("Please enter your name.");
  saveUser({
    name: name,
    email: document.getElementById("email").value,
    phone: "",
    gender: "",
  });
  sessionStorage.setItem("otpPurpose", "register");
  location.href = "otp.html";
});
