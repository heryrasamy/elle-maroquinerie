console.log("boutique.js chargé");

// 1️⃣ Lire les produits depuis le localStorage (créés via l’admin)
const products = JSON.parse(localStorage.getItem("products")) || [];
console.log("Produits boutique :", products);

// 2️⃣ Cibler la grille Figma existante
const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

const products = storedProducts.length > 0 ? storedProducts : [
    {
        id: 1,
        title: "Ceinture cuir noir",
        price: 39,
        description: "Ceinture en cuir noir avec mousqueton doré",
        image: "assets/images/products/ceinture-cuir-noir.jpg"
    },
    {
        id: 2,
        title: "Sac franges bordeaux",
        price: 89,
        description: "Sac bordeaux avec franges et détails dorés",
        image: "assets/images/products/sac-franges-bordeaux.jpg"
    },
    {
        id: 3,
        title: "Sac franges noir",
        price: 89,
        description: "Sac noir avec franges et détails dorés",
        image: "assets/images/products/sac-franges-noir.jpg"
    },
    {
        id: 4,
        title: "Sac noir",
        price: 79,
        description: "Sac noir élégant avec anses",
        image: "assets/images/products/sac-noir.jpg"
    },
    {
        id: 5,
        title: "Cabas bordeaux",
        price: 79,
        description: "Cabas bordeaux sobre et élégant",
        image: "assets/images/products/cabas.jpg"
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
