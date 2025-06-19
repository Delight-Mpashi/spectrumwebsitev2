const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use('/src', express.static(path.join(__dirname, 'src')));

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});