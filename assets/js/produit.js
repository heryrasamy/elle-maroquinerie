console.log("produit.js chargé");

/**
 * 1. Récupérer l'id depuis l'URL
 * ex : produit.html?id=1766340582887
 */
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  console.error("Aucun ID produit dans l'URL");
}

/**
 * 2. Récupérer les produits depuis le localStorage
 */
const products = JSON.parse(localStorage.getItem("products")) || [];
console.log("Produits trouvés :", products);

/**
 * 3. Trouver le produit correspondant
 */
const product = products.find(p => String(p.id) === String(productId));

if (!product) {
  console.error("Produit introuvable");
}

/**
 * 4. Injecter les données dans le HTML
 */
if (product) {
  const titleEl = document.getElementById("productTitle");
  const priceEl = document.getElementById("productPrice");
  const descEl  = document.getElementById("productDescription");
  const imageEl = document.getElementById("productImage");

  // Titre
  if (titleEl) {
    titleEl.textContent = product.title || "Produit";
  }

  // Description
  if (descEl) {
    descEl.textContent = product.description || "";
  }

  // Prix
  if (priceEl) {
    priceEl.textContent = product.price
      ? `${Number(product.price).toLocaleString("fr-FR")} €`
      : "";
  }

  /**
   * 5. Image produit (mapping simple)
   */
  if (imageEl) {
    const index = products.findIndex(
      p => String(p.id) === String(productId)
    );

    if (index !== -1) {
      const imageNumber = String(index + 1).padStart(3, "0");
      imageEl.src = `assets/images/Products/sac-${imageNumber}.jpg`;
      imageEl.alt = product.title;
    }
  }
}
