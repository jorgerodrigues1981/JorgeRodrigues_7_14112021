const express = require('express');
const app = express();
const path = require("path");
const helmet = require("helmet");

//Importation Routes
const userRoutes = require("./routes/user.routes");

app.use(helmet()); 

app.use((req, res, next) => { // Evite les erreurs CORS
// on indique que les ressources peuvent être partagées depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
// on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
// on indique les méthodes autorisées pour les requêtes HTTP
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Pour analyser le corps de la requête
app.use(express.json());


// ROUTES
//app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/users', userRoutes);

module.exports = app;