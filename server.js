const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// ✅ API routes FIRST — before any catch-all
app.get('/api/:date?', (req, res) => {
  const input = req.params.date;

  // Send JSON only — no HTML, no redirects
  res.setHeader('Content-Type', 'application/json');

  if (!input || input === '') {
    const now = new Date();
    return res.end(JSON.stringify({
      unix: now.getTime(),
      utc: now.toUTCString()
    }));
  }

  let date;
  if (!isNaN(input)) {
    const num = Number(input);
    date = new Date(num > 9999999999 ? num : num * 1000);
  } else {
    date = new Date(input);
  }

  if (isNaN(date.getTime())) {
    return res.end(JSON.stringify({ error: 'Invalid Date' }));
  }

  res.end(JSON.stringify({
    unix: date.getTime(),
    utc: date.toUTCString()
  }));
});

// ✅ Root route LAST
app.get('/', (req, res) => {
  res.status(200).send('<h1>Timestamp Microservice</h1>');
});

app.listen(process.env.PORT || 3000);