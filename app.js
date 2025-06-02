const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Serve additional folders under /src
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

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 fallback
app.use((req, res) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
