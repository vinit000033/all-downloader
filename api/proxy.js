// api/proxy.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { prompt } = req.query;

  if (!prompt) {
    res.status(400).send("Missing prompt");
    return;
  }

  const apiUrl = `https://text2img.hideme.eu.org/image?prompt=${encodeURIComponent(prompt)}&model=flux`;

  try {
    const apiResponse = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch image from API");
    }

    const arrayBuffer = await apiResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
