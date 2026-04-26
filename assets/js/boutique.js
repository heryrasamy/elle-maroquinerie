console.log("boutique.js chargé");

// 1️⃣ Lire les produits depuis le localStorage (créés via l’admin)
const products = JSON.parse(localStorage.getItem("products")) || [];
console.log("Produits boutique :", products);

// 2️⃣ Cibler la grille Figma existante
const products = JSON.parse(localStorage.getItem("products")) || [
    {
        id: 1,
        title: "Sac Élégance",
        price: 120,
        description: "Marron chocolat",
        image: "assets/images/image sac.png"
    },
    {
        id: 2,
        title: "Sac Capsule",
        price: 95,
        description: "Collection capsule",
        image: "assets/images/image sac.png"
    }
];

if (!grid) {
    console.error("❌ boutiqueGrid introuvable dans le HTML");
} else if (products.length === 0) {
    console.warn("⚠️ Aucun produit à afficher");
} else {

    // 3️⃣ Nettoyer les cartes statiques (placeholder Figma)
    grid.innerHTML = "";

    // 4️⃣ Injecter les produits
    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";

        // Contenu de la carte (fidèle Figma)
        card.innerHTML = `
    <div class="product-image">
        <img src="${p.image}" alt="${p.title}">
    </div>
    <div class="product-line">
        <span class="product-name">${p.title}</span>
        <span class="product-price">${p.price} €</span>
    </div>
    <div class="product-color">${p.description}</div>
`;

        // Clic → fiche produit
        card.addEventListener("click", () => {
            localStorage.setItem("currentProductId", String(p.id));
            window.location.href = "produit.html";
        });

        // Ajout dans la grille
        grid.appendChild(card);
    });

} // 👈 ACCOLADE MANQUANTE
