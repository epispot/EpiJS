const pre = require('./pre')
const package = require('../package.json');

// Package info
let version     = package.version;
let description = package.description;


exports.pre = pre
exports.about = 'EpiJS \n'+description+'\n----------------------------------\n By @Quantalabs \n GitHub - https://github.com/Quantalabs/EpiJS \n Version - '+ version
exports.version = version

