const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/components', express.static(path.join(__dirname, './src/components')));
app.use('/assets', express.static(path.join(__dirname, './src/assets')));
app.use('/images', express.static(path.join(__dirname, 'src/images')));
app.use('/pages',express.static(path.join(__dirname, 'src/pages')));

// Route for index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/src', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/images/'));
});
app.get('/src/pages/loanforms', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/loanforms'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
