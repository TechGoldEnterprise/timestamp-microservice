const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// ✅ Handles: /api, /api/, /api/123, /api/2015-12-25
app.get('/api/:date?', (req, res) => {
  const input = req.params.date;

  let date;
  if (!input) {
    // ✅ Empty: /api or /api/ → current time
    date = new Date();
  } else if (!isNaN(input)) {
    // Unix timestamp
    const num = Number(input);
    date = new Date(num > 9999999999 ? num : num * 1000);
  } else {
    // Date string
    date = new Date(input);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(process.env.PORT || 3000);