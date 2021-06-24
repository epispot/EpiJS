const math = require('mathjs');
const chart = require('chart.js')
const path = require('path')

module.exports = {
  entry: ['./EpiJS/pre.js', './EpiJS/com.js', './EpiJS/comp.js', './EpiJS/model.js'],
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: 'index.min.js',
  },
};