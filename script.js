export default async function handler(req, res) {
  // ✅ Allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Optional: allow additional headers/methods
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight (OPTIONS) requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { path = "/", query = "" } = req.query;
  const url = `http://43.205.110.71:8000${path}?${query}`;

  try {
    const apiRes = await fetch(url);
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy request failed", details: error.message });
  }
}
