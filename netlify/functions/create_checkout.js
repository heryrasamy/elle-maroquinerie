const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🔒 Catalogue serveur (IDs → prix officiels)
const CATALOG = {
  "sac-001": { name: "Sac ELLE – Élégance", price: 4500 },
  "sac-002": { name: "Sac ELLE – Capsule", price: 5200 },
  "ceinture-001": { name: "Ceinture ELLE", price: 2900 },
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  if (!items.length) {
    return { statusCode: 400, body: "Empty cart" };
  }

  // Construire les line_items Stripe à partir du catalogue serveur
  const line_items = [];
  for (const { id, qty } of items) {
    const product = CATALOG[id];
    if (!product || !Number.isInteger(qty) || qty <= 0) {
      return { statusCode: 400, body: "Invalid cart item" };
    }
    line_items.push({
      price_data: {
        currency: "eur",
        product_data: { name: product.name },
        unit_amount: product.price,
      },
      quantity: qty,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: "https://imaginative-haupia-97bb90.netlify.app/merci.html",
      cancel_url: "https://imaginative-haupia-97bb90.netlify.app/panier.html",
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
