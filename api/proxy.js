// api/proxy.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { prompt } = req.query;

  if (!prompt) {
    res.status(400).json({ error: "Missing prompt" });
    return;
  }

  const apiUrl = `https://utdqxiuahh.execute-api.ap-south-1.amazonaws.com/pro/fetch?url=${encodeURIComponent(prompt)}&user_id=h2`;

  try {
    const apiResponse = await fetch(apiUrl, {
      headers: {
        "x-api-key": "fAtAyM17qm9pYmsaPlkAT8tRrDoHICBb2NnxcBPM",
        "User-Agent": "okhttp/4.12.0",
        "Accept-Encoding": "gzip"
      }
    });

    if (!apiResponse.ok) {
      throw new Error(`API Error: ${apiResponse.status}`);
    }

    const data = await apiResponse.json(); // API returns JSON
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
