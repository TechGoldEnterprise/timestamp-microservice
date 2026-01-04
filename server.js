const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Handle /api/ (no date)
app.get('/api/', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Handle /api/:date
app.get('/api/:date', (req, res) => {
  const input = req.params.date;

  let date;
  // Try as Unix timestamp (ms or seconds)
  if (!isNaN(input)) {
    const num = Number(input);
    date = new Date(num > 9999999999 ? num : num * 1000);
  } else {
    // Try as date string
    date = new Date(input);
  }

  // Invalid date?
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});