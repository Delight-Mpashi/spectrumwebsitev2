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
app.use('/pages', express.static(path.join(__dirname, 'src/pages')));
app.use('/loanforms', express.static(path.join(__dirname, 'src/loanforms')));

// Route handlers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/faqs', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/faqs.html'));
});

app.get('/about', (req,res)=>{
  res.sendFile(path.join(__dirname, 'src/pages/aboutus.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/contactus.html'));
});
app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/aboutus.html'));
});
app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/terms&conditions.html'));
});

app.get('/loanforms', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/loanforms/asloanform.html'));
});
app.get('/loanforms', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/loanforms/csloanform.html'));
});

app.get('/laonforms/assetsecured', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages/loanforms/assetsecured.html'));
});
app.get('/public/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/public/assets/images/:image', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/assets/images', req.params.image));
});
app.get('../src/pages/loanforms/CSLoanForm.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/loanforms/CSLoanForm.html'));
});
app.get('../src/pages/loanforms/ASLoanform.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/loanforms/ASLoanform.html'));
});

// For all other pages in src/pages
app.get('/src/pages/:page', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/pages', req.params.page + '.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});