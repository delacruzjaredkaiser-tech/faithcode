// netlify/functions/fetch-esv.js
exports.handler = async (event) => {
  const API_KEY = process.env.ESV_API_KEY;
  const ref = event.queryStringParameters && event.queryStringParameters.ref;

  if (!API_KEY) return { statusCode: 500, body: "Missing ESV_API_KEY env var" };
  if (!ref) return { statusCode: 400, body: "Missing reference" };

  const url = `https://api.esv.org/v3/passage/text/?q=${encodeURIComponent(ref)}&include-passage-references=false&include-verse-numbers=false&include-footnotes=false&include-short-copyright=true&include-selahs=false`;

  try {
    const res = await fetch(url, { headers: { Authorization: `Token ${API_KEY}` } });
    if (!res.ok) return { statusCode: res.status, body: "Error fetching verse" };
    const data = await res.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, body: "Fetch failed" };
  }
};
