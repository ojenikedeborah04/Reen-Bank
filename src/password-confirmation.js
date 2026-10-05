// Password changed page interactions.
if (sessionStorage.getItem("signedIn") === "true")
  document.getElementById("go-back").href = "profile.html";
