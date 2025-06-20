const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Asset routes (now available at root level)
app.use('/images', express.static(path.join(__dirname, 'public/assets/images')));
app.use('/fonts', express.static(path.join(__dirname, 'public/assets/fonts')));
app.use('/svg', express.static(path.join(__dirname, 'public/assets/svg')));

// Route handlers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/faqs', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/faqs.html'));
});

app.get('/loanforms', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/loanforms.html'));
});


// For all other pages in src/pages
app.get('/src/pages/:page', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages', req.params.page + '.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});