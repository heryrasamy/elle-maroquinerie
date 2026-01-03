//  Chargement du script
console.log("admin-products.js chargé");

// 2 Récupération des produits stockés
let products = JSON.parse(localStorage.getItem("products")) || [];

console.log("Nombre de sacs en stock :", products.length);

//  (plus bas seulement)
// gestion du formulaire, ajout de produit, etc.


function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

const form = document.getElementById("productForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = form.querySelectorAll("input, textarea");

        const product = {
            id: Date.now(),
            title: inputs[0].value,
            description: inputs[1].value,
            price: inputs[2].value,
            stock: inputs[4].value
        };

        const products = getProducts();
        products.push(product);
        saveProducts(products);

        console.log("Produit ajouté :", product);

        form.reset();
    });
}
