const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// 1. Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// 2. Manually expose src subfolders
const staticFolders = [
  ['components', 'src/components'],
  ['scripts', 'src/scripts'],
  ['styles', 'src/styles'],
  ['assets', 'src/assets'],
  ['images', 'src/images'],
  ['fonts', 'src/fonts'],
  ['data', 'src/data'],
  ['pages', 'src/pages'],
  ['services', 'src/services']
];

staticFolders.forEach(([urlPath, folderPath]) => {
  const fullPath = path.join(__dirname, folderPath);
  console.log(`Serving /${urlPath} from ${fullPath}`);
  app.use(`/${urlPath}`, express.static(fullPath));
});

// 3. Serve index.html at root
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath);
});

// 4. 404 Error for unknown routes
app.use((req, res) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// 5. Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
});

// 6. Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
