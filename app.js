const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Serve assets and index.html from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));



// this is passing of all routes to the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/src", (req, res) => {
  res.sendFile(path.join(__dirname, "src"));
});

app.get("/src/pages", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "pages"));
});

app.get("/src/pages/loanforms/csloanform.html", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "pages", "loanForms", "csLoanForm.html"));
});

// Create a virtual path for styles.
app.use("/styles", express.static(path.join(__dirname, "src", "styles")));

// Create a virtual path for scripts.
app.use("/js", express.static(path.join(__dirname, "src", "js")));

// routes to serve pages from 'src/pages'
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

app.get("/loan/civil-servant", (req, res) => {
  res.sendFile(
    path.join(__dirname, "src", "pages", "loanForms", "csLoanForm.html")
  );
});

app.get("/loan/asset-secured", (req, res) => {
  res.sendFile(
    path.join(__dirname, "src", "pages", "loanForms", "ASLoanForm.html")
  );
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
