const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// ✅ Enable CORS — critical for FCC test runner
app.use(cors());

// ✅ Root route — friendly page like demo
app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Timestamp Microservice</title>
      <style>
        body { font-family: system-ui, sans-serif; text-align: center; padding: 2rem; }
        code { background: #f0f0f0; padding: 0.2em 0.4em; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>Timestamp Microservice</h1>
      <p>Pass a date string or Unix timestamp to <code>/api/:date</code></p>
      <p>Examples:</p>
      <ul style="display:inline-block;text-align:left">
        <li><a href="/api/2015-12-25">/api/2015-12-25</a></li>
        <li><a href="/api/1451001600000">/api/1451001600000</a></li>
        <li><a href="/api/">/api/ (current time)</a></li>
      </ul>
    </body>
    </html>
  `);
});

// ✅ Handle empty date: /api/
app.get('/api/', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// ✅ Handle with date: /api/:date
app.get('/api/:date', (req, res) => {
  const input = req.params.date;

  let date;
  // Try Unix timestamp (ms or seconds)
  if (!isNaN(input)) {
    const num = Number(input);
    // If ≤ 10 digits → seconds; else → milliseconds
    date = new Date(num > 9999999999 ? num : num * 1000);
  } else {
    // Try date string (e.g., "2015-12-25", "May 25 2015")
    date = new Date(input);
  }

  // Invalid date?
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),        // milliseconds
    utc: date.toUTCString()      // "Fri, 25 Dec 2015 00:00:00 GMT"
  });
});

app.listen(port, () => {
  console.log(`✅ Timestamp Microservice running on port ${port}`);
});