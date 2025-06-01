const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/components', express.static(path.join(__dirname, 'src/components')));
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
app.use('/styles', express.static(path.join(__dirname, 'src/styles')));
app.use('/scripts', express.static(path.join(__dirname, 'src/scripts')));
app.use('/images', express.static(path.join(__dirname, 'src/images')));
app.use('/fonts', express.static(path.join(__dirname, 'src/fonts')));
app.use('/data', express.static(path.join(__dirname, 'src/data')));
app.use('/pages', express.static(path.join(__dirname, 'src/pages')));
app.use('/services', express.static(path.join(__dirname, 'src/services')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});