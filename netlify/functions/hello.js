// netlify/functions/hello.js
exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ok: true,
      message: "Hello from Netlify Functions 👋",
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters || {},
    }),
  };
};
