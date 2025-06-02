const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); // Serves /assets, /images, /index.html etc
app.use('/components', express.static(path.join(__dirname, 'src/components')));
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

// Route for index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
