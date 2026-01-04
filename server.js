const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// ✅ Enable CORS (required for FCC test runner)
app.use(cors());

// ✅ 1. Handle EMPTY date: /api/
app.get('/api/', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),       // current time in milliseconds
    utc: now.toUTCString()     // "Sat, 01 Jan 2025 12:00:00 GMT"
  });
});

// ✅ 2. Handle WITH date: /api/1451001600000, /api/2015-12-25, etc.
app.get('/api/:date', (req, res) => {
  const input = req.params.date;

  let date;
  // Case 1: numeric input (Unix timestamp)
  if (!isNaN(input)) {
    const num = Number(input);
    // Auto-detect seconds vs milliseconds
    date = new Date(num > 9999999999 ? num : num * 1000);
  } 
  // Case 2: string input (e.g. "2015-12-25")
  else {
    date = new Date(input);
  }

  // ✅ Invalid date → { error: "Invalid Date" }
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // ✅ Valid → { unix, utc }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// ✅ Optional: Friendly root page (matches FCC demo UX)
app.get('/', (req, res) => {
  res.status(200).send(`
    <h1>Timestamp Microservice</h1>
    <p>Examples:</p>
    <ul>
      <li><a href="/api/1451001600000">/api/1451001600000</a></li>
      <li><a href="/api/2015-12-25">/api/2015-12-25</a></li>
      <li><a href="/api/">/api/ (current time)</a></li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});