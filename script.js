// api-proxy/api.js

export default async function handler(req, res) {
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
