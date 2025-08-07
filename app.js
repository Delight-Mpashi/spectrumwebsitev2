const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from 'public' (like index.html, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Serve all files from 'src/pages' at root level
app.use(express.static(path.join(__dirname, "src", "pages")));
app.use("/js", express.static(path.join(__dirname, "src", "js")));

// Serve static styles and JS
app.use("/styles", express.static(path.join(__dirname, "src", "styles")));
app.use("/js", express.static(path.join(__dirname, "src", "js")));

// Specific routes for important pages (remove .html extensions)
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "pages", "aboutUs.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "pages", "contactUs.html"));
});

app.get("/faqs", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "pages", "faqs.html"));
});

app.get("/grievance", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "pages", "grievance.html"));
});

// Updated loan form routes to match your anchor tags
app.get("/csloanform.html", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "pages", "loanforms", "csloanform.html"));
});

app.get("/ASLoanform.html", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "pages", "loanforms", "ASLoanform.html"));
});

app.get("/terms", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "pages", "terms&conditions.html"));
});

app.get("/whistleblower", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "pages", "whistleBlower.html"));
});

app.get("/find-branch", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "pages", "findBranch.html"));
});

// Catch-all route — must be LAST
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});