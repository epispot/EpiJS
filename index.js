const package = require('./package.json');

// Package info
let version     = package.version;
let description = package.description;
let author      = package.author;
let about       = "EpiJS \n" + version + '\n' + description + '\nBy: ' + author;
let EpiJS        = exports.EpiJS = exports;

EpiJS.name = EpiJS
EpiJS.version = version
EpiJS.description = description
EpiJS.author = author
EpiJS.about = about

const epijs = require('EpiJS')

EpiJS.epijs = epijs