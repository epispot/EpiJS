/**
 * @file Pre-made graphs for modelling outbreaks.
 */


const chart = require('chart.js')

function check() {
    alert('All systems good!')
    console.log('This checks if you\'ve imported everything correctly. If you want to check \
    the code, please visit the repo and follow the guide there.')
}

/**
 * The SIR Model returns a chart.js graph with the total Susceptible, Infected, and Recovered after the given amount of time.
 * @param {HTMLElement} c - The HTML5 Canvas Element.
 * @param {Number} rn - R Naught, or the amount of people one infected infects whlie infected.
 * @param {Number} s - The Susceptible population at the beggining of the outbreak
 * @param {Number} i - The Infected population at the beggining of th outbreak
 * @param {Number} time - The time the total simulation lasts.
 * @param {Number} u - The recovery rate
 * @param {Number} p - The total population.
 * @example
 * 
 *      sir(sirchart, 4, 9999, 1, 100, 1/21, 10000)
 */
function sir(c, rn, s, i, time, u, p) {
    let data = {
        labels: [],
        datasets: [{ 
            data: [s],
            label: "Suseptible",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16)
        },
        { 
            data: [i],
            label: "Infected",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
        },
        { 
            data: [0],
            label: "Recovered",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
        }]
    }

    for(var x = 0; x<time; x++){
        data.datasets[0].data.push(data.datasets[0].data[x]-((rn*u)*data.datasets[0].data[x]*data.datasets[1].data[x]/p))
        data.datasets[1].data.push(data.datasets[1].data[x]+((rn*u)*data.datasets[0].data[x]*data.datasets[1].data[x]/p)-u*data.datasets[1].data[x])
        data.datasets[2].data.push(data.datasets[2].data[x]+u*data.datasets[1].data[x])
        data.labels.push("Day " +(x+1).toString())
    }
    console.log(data.datasets)

    var sirChart = new Chart(c, {
        type: 'line',
        data: data,
        options: {
          title: {
            display: true,
            text: 'Total Cases'
          }
        }      
    });
}

/**
 * The SIR Model returns a chart.js graph with the total Susceptible, Exposed, Infected, and Recovered after the given amount of time.
 * @param {HTMLElement} c - The HTML5 Canvas Element.
 * @param {Number} rn - R Naught, or the amount of people one infected infects whlie infected.
 * @param {Number} s - The Susceptible population at the beggining of the outbreak
 * @param {Number} i - The Infected population at the beggining of th outbreak
 * @param {Number} t - The time the total simulation lasts.
 * @param {Number} u - The recovery rate
 * @param {Number} a - The incubation period
 * @param {Number} p - The total population.
 * @example
 * 
 *      seir(seirchart, 4, 9999, 1, 100, 1/7, 1/7, 10000)
 */
function seir(c, rn, s, i, t, u, a, p) {
    let data = {
        labels: [],
        datasets: [{ 
            data: [s],
            label: "Suseptible",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
        },
        { 
            data: [0],
            label: "Exposed",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
        },
        {
            data: [i],
            label: "Infected",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
        },
        { 
            data: [0],
            label: "Recovered",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
        }]
    }

    for(var x = 0; x<t; x++){
        data.datasets[0].data.push(data.datasets[0].data[x]-((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p))
        data.datasets[1].data.push(data.datasets[1].data[x]+((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)-(a*data.datasets[1].data[x]))
        data.datasets[2].data.push(data.datasets[2].data[x]+(a*data.datasets[1].data[x])-(u*data.datasets[2].data[x]))
        data.datasets[3].data.push(data.datasets[3].data[x]+(u*data.datasets[2].data[x]))
        data.labels.push("Day " +(x+1).toString())
    }
    console.log(data.datasets)
    
    var seirChart = new Chart(c, {
        type: 'line',
        data: data,
        options: {
          title: {
            display: true,
            text: 'Total Cases'
          }
        }      
    });
}

/**
 * The SIR Model returns a chart.js graph with the total Susceptible, Exposed, Infected, Recovered, and Dead populations after the given amount of time.
 * @param {HTMLElement} c - The HTML5 Canvas Element.
 * @param {Number} rn - R Naught, or the amount of people one infected infects whlie infected.
 * @param {Number} s - The Susceptible population at the beggining of the outbreak
 * @param {Number} i - The Infected population at the beggining of th outbreak
 * @param {Number} t - The time the total simulation lasts.
 * @param {Number} u - The recovery rate
 * @param {Number} a - The incubation period
 * @param {Number} d - The death rate
 * @param {Number} p - The total population.
 * @example
 * 
 *      seird(seirdchart, 4, 99999, 1, 100, 1/21, 1/14, 1/100, 10000)
 */
function seird(c, rn, s, i, t, u, a, d, p) {
    let data = {
        labels: [],
        datasets: [{ 
            data: [s],
            label: "Suseptible",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
        },
        { 
            data: [0],
            label: "Exposed",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
        },
        {
            data: [i],
            label: "Infected",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
        },
        { 
            data: [0],
            label: "Recovered",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
        },
        { 
            data: [0],
            label: "Dead",
            borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
        }]
    }

    for(var x = 0; x<t; x++){
        data.datasets[0].data.push(data.datasets[0].data[x]-((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p))
        data.datasets[1].data.push(data.datasets[1].data[x]+((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)-(a*data.datasets[1].data[x]))
        data.datasets[2].data.push(data.datasets[2].data[x]+(a*data.datasets[1].data[x])-(u*data.datasets[2].data[x])-(d*data.datasets[2].data[x]))
        data.datasets[3].data.push(data.datasets[3].data[x]+(u*data.datasets[2].data[x]))
        data.datasets[4].data.push(data.datasets[4].data[x]+(d*data.datasets[2].data[x]))
        data.labels.push("Day " +(x+1).toString())
    }
    console.log(data.datasets)
    
    var sierdChart = new Chart(c, {
        type: 'line',
        data: data,
        options: {
          title: {
            display: true,
            text: 'Total Cases'
          }
        }      
    });
}
