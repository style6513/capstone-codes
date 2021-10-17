"use strict"

/** Shared config for application, can be required in many places */

require('dotenv').config();
require("colors");

const SECRET = process.env.SECRET_KEY || 'prodKey';
const PORT = process.env.PORT || 9000;
const DB_URI = process.env.NODE_ENV === 'test' ? "code_test" : "code";

// Speed up bcrypt during tests, since algorithm safety isn't being tested.
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log('WorkoutBuddy Config'.green);
console.log('SECRET'.yellow, SECRET);
console.log('PORT'.yellow, PORT.toString());
console.log('BCRYPT_WORK_FACTOR'.yellow, BCRYPT_WORK_FACTOR);
console.log('Database'.yellow, DB_URI);

module.exports = {
  SECRET,
  BCRYPT_WORK_FACTOR,
  PORT,
  DB_URI
};