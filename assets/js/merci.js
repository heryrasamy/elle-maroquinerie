document.addEventListener("DOMContentLoaded", () => {
  const order = JSON.parse(localStorage.getItem("orderSummary"));

  // 🔒 Sécurité : accès direct interdit
  if (!order || !order.items || order.items.length === 0) {
    console.warn("⛔ Accès direct à merci.html bloqué");
    window.location.href = "boutique.html";
    return;
  }

  const box = document.getElementById("orderBox");
  const meta = document.getElementById("orderMeta");

  meta.textContent = `Commande n° ${order.orderNumber} — ${order.date}`;

  // 🧾 Affichage des produits
  order.items.forEach(item => {
    const line = document.createElement("div");
    line.className = "order-line";
    line.innerHTML = `
      <span>${item.name} × ${item.qty || 1}</span>
      <span>${item.price} €</span>
    `;
    box.appendChild(line);
  });

  // Total
  const total = document.createElement("div");
  total.className = "order-line order-total";
  total.innerHTML = `
    <span>Total</span>
    <span>${order.total} €</span>
  `;
  box.appendChild(total);

  // 📄 FACTURE PDF
  document.getElementById("downloadInvoice").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 20;
    doc.setFontSize(16);
    doc.text("ELLE Maroquinerie", 20, y);
    y += 10;

    doc.setFontSize(11);
    doc.text(`Facture n° ${order.orderNumber}`, 20, y);
    y += 6;
    doc.text(`Date : ${order.date}`, 20, y);
    y += 12;

    order.items.forEach(item => {
      doc.text(
        `${item.name} x ${item.qty || 1} — ${item.price} €`,
        20,
        y
      );
      y += 8;
    });

    y += 6;
    doc.setFontSize(12);
    doc.text(`TOTAL : ${order.total} €`, 20, y);

    doc.save(`Facture_${order.orderNumber}.pdf`);
  });

  // ✉️ EMAIL DE CONFIRMATION
  document.getElementById("sendEmail").addEventListener("click", () => {
    const subject = encodeURIComponent(
      `Confirmation de commande ${order.orderNumber}`
    );

    const body = encodeURIComponent(
      `Merci pour votre commande chez ELLE Maroquinerie.\n\n` +
      `Commande : ${order.orderNumber}\n` +
      `Total : ${order.total} €\n\n` +
      `À très bientôt.`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });

  // 🧹 Nettoyage APRÈS affichage
 window.addEventListener("beforeunload", () => {
  localStorage.removeItem("orderSummary");
  console.log("🧹 orderSummary nettoyé à la sortie");
});

});
