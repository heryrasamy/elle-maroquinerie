document.addEventListener("DOMContentLoaded", () => {

  const profilPage = document.getElementById("profilPage");
  if (!profilPage) return;

  const isConnected = localStorage.getItem("userConnected");

  // ❌ UTILISATEUR NON CONNECTÉ
  if (!isConnected) {
    profilPage.innerHTML = `
      <section class="profil-locked">
        <h2>Accès réservé</h2>
        <p>Vous devez être connecté pour accéder à votre profil.</p>
        <a href="inscription.html" class="btn-profil">
          Créer un compte / Se connecter →
        </a>
      </section>
    `;
    return;
  }

  // ✅ CONNECTÉ
  console.log("✅ Utilisateur connecté");

  const orderBox = document.getElementById("orderBox");
  if (orderBox) {
    orderBox.textContent = "Aucune commande en cours pour le moment.";
  }

  // 🔓 DÉCONNEXION
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userConnected");
      window.location.href = "inscription.html";
    });
  }

});
