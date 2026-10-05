// Email Verification page interactions.
const digits = Array.from(document.querySelectorAll(".otp-digit"));
document.getElementById("otp-email").textContent =
  getUser().email || "your sample email";
let seconds = 45;
function updateTimer() {
  document.getElementById("timer").textContent =
    seconds > 0
      ? "0:" + String(seconds).padStart(2, "0") + " remaining"
      : "Code expired. Click Resend.";
}
updateTimer();
setInterval(() => {
  if (seconds > 0) seconds--;
  updateTimer();
}, 1000);
digits.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    if (input.value && digits[index + 1]) digits[index + 1].focus();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && !input.value && index > 0)
      digits[index - 1].focus();
  });
  input.addEventListener("paste", (event) => {
    event.preventDefault();
    const code = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    code.split("").forEach((digit, position) => {
      digits[position].value = digit;
    });
    digits[Math.min(code.length, 5)].focus();
  });
});
document.getElementById("resend").addEventListener("click", () => {
  seconds = 45;
  updateTimer();
  showMessage("Demo code reset: 123456");
});
document.getElementById("otp-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (seconds === 0) return showMessage("Code expired. Please resend.");
  if (digits.map((input) => input.value).join("") !== "123456")
    return showMessage("Enter the demo code 123456.");
  if (sessionStorage.getItem("otpPurpose") === "reset") {
    sessionStorage.setItem("resetVerified", "true");
    location.href = "new-password.html";
  } else {
    sessionStorage.setItem("signedIn", "true");
    location.href = "account-created.html";
  }
});
