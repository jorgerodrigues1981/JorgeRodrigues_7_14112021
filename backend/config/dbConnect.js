// Importation de mysql
const mysql = require('mysql');
const { application } = require('express');

const dotenv = require("dotenv").config({ path: './config/.env' });

// Connection à la base de données mysql
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB
});
 
// Connect la db
db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log("Connexion mysql réussie !!!")
})