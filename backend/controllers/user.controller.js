const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken"); 
const fs = require("fs");
const db = require('../config/dbConnect').connection;

exports.getAllUsers = (req, res, next) => {
    const getUsers = "SELECT * FROM utilisateur";
    const conDb = db.query(getUsers, (err, result) => {
        if(err) throw err;
        console.log(conDb);
    });
};
