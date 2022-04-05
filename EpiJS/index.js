const pre = require('./pre')
const comp = require('./comp')
const model = require('./model')
const packagejson = require('../package.json');
const utils = require('./utils')

// Package info
let version     = packagejson.version;
let description = packagejson.description;


exports.pre = pre;
exports.about = 'EpiJS \n'+description+'\n----------------------------------\n By @epispot \n GitHub - https://github.com/epispot/EpiJS \n Version - '+ version;
exports.version = version;
exports.description = description;
exports.comp = comp;
exports.model = model;
exports.utils = utils;
exports.plots = require('./plots');