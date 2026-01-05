const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Enable CORS (required for FCC frontend test runner)
app.use(cors());

// ✅ Single route: handles /api, /api/, /api/1451001600000, /api/2015-12-25
app.get('/api/:date?', (req, res) => {
  const input = req.params.date;

  // ✅ Handle empty date: /api or /api/ → current time
  if (!input || input === '') {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // ✅ Parse input
  let date;
  if (!isNaN(input)) {
    // Numeric: Unix timestamp (seconds or milliseconds)
    const num = Number(input);
    date = new Date(num > 9999999999 ? num : num * 1000);
  } else {
    // String: e.g., "2015-12-25"
    date = new Date(input);
  }

  // ✅ Invalid date → error
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // ✅ Valid → return unix & utc
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// ✅ Optional: friendly root page (matches FCC demo UX)
app.get('/', (req, res) => {
  res.status(200).send(`
    <h1>Timestamp Microservice</h1>
    <p>Example usage:</p>
    <ul>
      <li><a href="/api/1451001600000">/api/1451001600000</a></li>
      <li><a href="/api/2015-12-25">/api/2015-12-25</a></li>
      <li><a href="/api/">/api/</a> (current time)</li>
    </ul>
  `);
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});