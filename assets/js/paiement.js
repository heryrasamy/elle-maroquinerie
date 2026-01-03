console.log("paiement.js chargé");

  document.addEventListener("DOMContentLoaded", () => {

  const checkoutForm = document.getElementById("checkoutForm");
  console.log("checkoutForm =", checkoutForm);

  if (!checkoutForm) {
    console.error("❌ checkoutForm introuvable");
    return;
  }

  const payBtn = document.querySelector(".btn-pay");

  if (!payBtn) {
    console.error("❌ Bouton .btn-pay introuvable");
    return;
  }

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("✅ SUBMIT OK");

    // 🔒 Sécurité anti double clic
    if (payBtn.disabled) {
      console.warn("⛔ Double clic bloqué");
      return;
    }

    // Message UX
    let msg = document.getElementById("paymentMessage");
    if (!msg) {
      msg = document.createElement("div");
      msg.id = "paymentMessage";
      checkoutForm.appendChild(msg);
    }

    msg.textContent = "Paiement en cours…";
    Object.assign(msg.style, {
      marginTop: "20px",
      padding: "14px 18px",
      borderRadius: "999px",
      textAlign: "center",
      fontSize: "13px",
      background: "#2b1e18",
      color: "#f7f3ee",
    });

    // 🔒 Bloquer le bouton
    payBtn.textContent = "PAIEMENT EN COURS…";
    payBtn.disabled = true;
    payBtn.style.opacity = "0.6";
    payBtn.style.cursor = "not-allowed";
      // ⏳ Simulation paiement
    setTimeout(() => {
      msg.textContent = "Paiement validé ✔ Merci pour votre commande";

      // 🧹 Vider le panier
      localStorage.removeItem("cart");
      console.log("🧹 Panier vidé");

      // ➡️ Redirection
      setTimeout(() => {
        window.location.href = "merci.html";
      }, 1200);

    }, 1200);
  });
});
