document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // ===============================
  // OUTILS
  // ===============================
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function setCurrentUser(email) {
  localStorage.setItem("currentUser", JSON.stringify({ email }));
}

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(form, message, type = "error") {
    const box = form.querySelector(".form-message");
    box.textContent = message;

    box.style.marginTop = "16px";
    box.style.padding = "10px 14px";
    box.style.borderRadius = "999px";
    box.style.fontSize = "14px";
    box.style.textAlign = "center";

    if (type === "success") {
      box.style.background = "#302324";
      box.style.color = "#FAF8F2";
    } else {
      box.style.background = "#fbeaea";
      box.style.color = "#b00020";
    }
  }

  // ===============================
  // CONNEXION
  // ===============================

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  if (!email || !password) {
    showMessage(loginForm, "Veuillez remplir tous les champs.");
    return;
  }

  const users = getUsers();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    showMessage(loginForm, "Email ou mot de passe incorrect.");
    return;
  }

  // ✅ Connexion OK
  setCurrentUser(email);

  showMessage(loginForm, "Connexion réussie ✔", "success");

  console.log("🔓 Connecté :", email);

  setTimeout(() => {
    window.location.href = "profil.html";
  }, 1000);
    });
  }

  // ===============================
  // INSCRIPTION
  // ===============================

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = registerForm.email.value.trim();
  const password = registerForm.password.value.trim();

  if (!email || !password) {
    showMessage(registerForm, "Veuillez remplir tous les champs.");
    return;
  }

  if (!isValidEmail(email)) {
    showMessage(registerForm, "Adresse email invalide.");
    return;
  }

  if (password.length < 6) {
    showMessage(registerForm, "Mot de passe trop court (6 caractères minimum).");
    return;
  }

  const users = getUsers();

  // 🔒 Vérifier si l’email existe déjà
  const exists = users.find(user => user.email === email);
  if (exists) {
    showMessage(registerForm, "Un compte existe déjà avec cet email.");
    return;
  }

  // ✅ Créer le compte
  users.push({ email, password });
  saveUsers(users);
  setCurrentUser(email);

  showMessage(registerForm, "Compte créé avec succès ✔", "success");

  console.log("👤 Compte créé :", email);

  // ➡️ Redirection douce
  setTimeout(() => {
    window.location.href = "profil.html";
  }, 1200);
});

  }

});
