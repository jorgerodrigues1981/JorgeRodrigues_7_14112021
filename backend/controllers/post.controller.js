const mysql = require('mysql');
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken"); 
const fs = require("fs");

const mysqlDb = require('../dbConnect');