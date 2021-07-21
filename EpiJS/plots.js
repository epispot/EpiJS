/**
 * @file Graphs plots from the pre module.
 * 
 * Import it with:
 * ```
 *    const plots = require('@quantalabs/epijs').plots
 * ```
 */


 const chart = require('chart.js')

/**
 * Plots a output of a model from the pre module.
 * @param {Array} model - The output from the pre module function.
 * @param {HTMLCanvasElement} canvas - The canvas to show the output.
 * @param {Number} days - The amount of days to plot
 * @param {Array} colors - Custom colors for the graph, in the same order the compartments are.
 * @param {Object} options - Optional. Custom configuration to pass into the options parameter for chart.js, defaults to:
 * 
 * ```JSON
 * {
 *  title: {
 *      display: true,
 *      text: "Total Cases"
 *  },
 *  scales: {
 *      yAxes: [{
 *          ticks: {
 *              beginAtZero: true
 *          }
 *      }]
 *  }
 * }
 * ```
 * 
 * @returns Returns the chart.js chart, if needed for modification.
 * 
 * @example
 * 
 * let sirout1 = sir(4, 9999, 1000, 100, 1/21, 10999, true)
 *
 * plot(sirout1, "canvas-pre1", 100) // Plots data for 100 days onto the canvas-pre1 chart, with the data from the SIR model.
 */
function plot(model, canvas, days, colors=null, options={title: {display: true, text: 'Total Cases'}, scales: {yAxes: [{ticks: {beginAtZero: true}}]}}) {
    let data = {// skipcq: JS-0502
        labels: [],
        datasets: []
    }
    for (let i = 0; i < days; i++) {// skipcq: JS-0502
        data.labels.push('Day '+i)
    }
    if (colors !== null) {
        for (let i = 0; i < model.length; i++) {
            data.datasets.push({
                label: model[i].name,
                data: model[i].data,
                borderColor: colors[i]
            })
        } 
    }
    else {
        for (let i = 0; i < model.length; i++) {// skipcq: JS-0502
            data.datasets.push({
                label: model[i].label,
                data: model[i].data,
                borderColor: '#'+Math.floor(Math.random()*16777215).toString(16)
            })
        } 
    }

    let sirChart = new Chart(canvas, {// skipcq: JS-0502
        type: 'line',
        data: data,
        options: options 
    });
    return sirChart;
}

/**
 * Manipulate the chart.js graph
 * 
 * @param id The chart.js graph
 * @param {String} mvalue The value to manipulate in `chart.data.datasets[x]`. This can be any valid chart.js parameter. See https://www.chartjs.org/docs/latest/charts/line.html#line-styling
 * @param value The value to insert into the graph
 * @returns The chart.js graph
 * 
 * @example
 * 
 * let sirout1 = sir(4, 9999, 1000, 100, 1/21, 10999, true)
 *
 * let sirplot = plot(sirout1, "canvas-pre1", 100)
 * 
 * sirplot.manipulate(sirplot, "fill", true) // Set fill to true
 */
function manipulate(id, mvalue, value) {
    var manip = Chart.getChart(id)// skipcq: JS-0502

    for (var x in manip.data.datasets) {
        manip.data.datasets[x][mvalue] = value
    }

    manip.update()
    return manip
}

exports.plot = plot;
exports.manipulate = manipulate;