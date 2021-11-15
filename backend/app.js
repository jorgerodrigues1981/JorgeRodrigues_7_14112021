// Importation de modules
const express = require('express');
const app = express();
const path = require("path");
const helmet = require("helmet");

// Importation des routes
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

// Protège l'app en paramétrant des Headers (notamment contre les failles XSS)
app.use(helmet()); 

// Evite les erreurs CORS
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Pour analyser le corps de la requête
app.use(express.json());

// Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;