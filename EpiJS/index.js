const pre = require('./pre')
const com = require('./com')
const comp = require('./comp')
const model = require('./model')
const package = require('../package.json');
const utils = require('./utils')

// Package info
let version     = package.version;
let description = package.description;


exports.pre = pre;
exports.about = 'EpiJS \n'+description+'\n----------------------------------\n By @Quantalabs \n GitHub - https://github.com/Quantalabs/EpiJS \n Version - '+ version;
exports.version = version;
exports.com = com;
exports.comp = comp;
exports.model = model;
exports.utils = utils;
