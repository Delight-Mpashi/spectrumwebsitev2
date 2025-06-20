const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set up static file serving with proper path resolution
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

// Explicit static routes for better organization
app.use('/assets/images', express.static(path.join(__dirname, 'public/assets/images')));
app.use('/assets/fonts', express.static(path.join(__dirname, 'public/assets/fonts')));
app.use('/assets/svg', express.static(path.join(__dirname, 'public/assets/svg')));
app.use('/src/pages', express.static(path.join(__dirname, 'src/pages')));

// Route handlers with proper path resolution
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Main page routes
const pages = [
  'faqs', 'aboutus', 'terms&conditions', 'contactus',
  'loanforms/csloanForm', 'loanforms/assetsecured'
];

pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, `src/pages/${page}.html`));
  });
});

// Catch-all for other pages (optional)
app.get('/:page', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, `src/pages/${req.params.page}.html`));
  } catch (err) {
    res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, 'public/500.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});