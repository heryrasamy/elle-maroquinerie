console.log("admin-auth.js chargé");

// === CONFIG ===
const ADMIN_PASSWORD = "Anthony31";

// === LOGIN ===
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const passwordInput = document.getElementById("password");
        const errorMsg = document.getElementById("loginError");

        if (passwordInput.value === ADMIN_PASSWORD) {
            localStorage.setItem("adminAuth", "true");
            window.location.href = "admin.html";
        } else {
            errorMsg.style.display = "block";
        }
    });
}
