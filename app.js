const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Specific asset routes from public/assets
app.use('/assets/images', express.static(path.join(__dirname, 'public/assets/images')));
app.use('/assets/fonts', express.static(path.join(__dirname, 'public/assets/fonts')));
app.use('/assets/svg', express.static(path.join(__dirname, 'public/assets/svg')));

// Route for index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Route for FAQ page
app.get('/faqs', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/faqs.html'));
});

// Route for loan forms
app.get('/loanforms', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/loanforms.html'));
});

// For all other pages in src/pages (optional)
app.get('/src/pages/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, 'src/pages', `${page}.html`));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});