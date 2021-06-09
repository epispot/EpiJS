/**
 * @file Pre-made graphs for modelling outbreaks.
 */


const chart = require('chart.js')

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

    for(let x = 0; x<time; x++){
        data.datasets[0].data.push(data.datasets[0].data[x]-((rn*u)*data.datasets[0].data[x]*data.datasets[1].data[x]/p))
        data.datasets[1].data.push(data.datasets[1].data[x]+((rn*u)*data.datasets[0].data[x]*data.datasets[1].data[x]/p)-u*data.datasets[1].data[x])
        data.datasets[2].data.push(data.datasets[2].data[x]+u*data.datasets[1].data[x])
        data.labels.push("Day " +(x+1).toString())
    }
    console.log(data.datasets)

    let sirChart = new Chart(c, {
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

    for(let x = 0; x<t; x++){
        data.datasets[0].data.push(data.datasets[0].data[x]-((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p))
        data.datasets[1].data.push(data.datasets[1].data[x]+((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)-(a*data.datasets[1].data[x]))
        data.datasets[2].data.push(data.datasets[2].data[x]+(a*data.datasets[1].data[x])-(u*data.datasets[2].data[x]))
        data.datasets[3].data.push(data.datasets[3].data[x]+(u*data.datasets[2].data[x]))
        data.labels.push("Day " +(x+1).toString())
    }
    console.log(data.datasets)
    
    let seirChart = new Chart(c, {
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
 * @param {Number} i - The Infected population at the beggining of the outbreak
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

    for(let x = 0; x<t; x++){
        data.datasets[0].data.push(data.datasets[0].data[x]-((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p))
        data.datasets[1].data.push(data.datasets[1].data[x]+((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)-(a*data.datasets[1].data[x]))
        data.datasets[2].data.push(data.datasets[2].data[x]+(a*data.datasets[1].data[x])-(u*data.datasets[2].data[x])-(d*data.datasets[2].data[x]))
        data.datasets[3].data.push(data.datasets[3].data[x]+(u*data.datasets[2].data[x]))
        data.datasets[4].data.push(data.datasets[4].data[x]+(d*data.datasets[2].data[x]))
        data.labels.push("Day " +(x+1).toString())
    }
    console.log(data.datasets)
    
    let sierdChart = new Chart(c, {
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
 * @param {Number} i - The Infected population at the beggining of the outbreak
 * @param {Number} t - The time the total simulation lasts.
 * @param {Number} u - The recovery rate for the infected population
 * @param {Number} uh - The recovery rate for the hospitalized population
 * @param {Number} a - The incubation period
 * @param {Number} di - The death rate for the infected population
 * @param {Number} dh - The death rate for the hospitalized population
 * @param {Number} h - The hospitalization rate
 * @param {Number} p - The total population.
 * @example
 * 
 *      seihrd(seihrdmodelchart, 4, 9999, 1, 265, 1/21, 1/40, 1/14, 1/100, 1/20, 1/30, 10000)
 */
 function seihrd(c, rn, s, i, t, u, uh, a, di, dh, h, p) {
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
        label: "Hospitalized",
        borderColor: "#"+Math.floor(Math.random()*16777215).toString(16)
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

    for(let x = 0; x<t; x++){
      data.datasets[0].data.push(data.datasets[0].data[x]-((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)) // Susceptible
      data.datasets[1].data.push(data.datasets[1].data[x]+((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)-(a*data.datasets[1].data[x])) // Exposed
      data.datasets[2].data.push(data.datasets[2].data[x]+(a*data.datasets[1].data[x])-(u*data.datasets[2].data[x])-(di*data.datasets[2].data[x])) // Infected
      data.datasets[3].data.push(data.datasets[3].data[x]+(h*data.datasets[2].data[x])-(uh*data.datasets[3].data[x])-(dh*data.datasets[3].data[x])) // Hospitalized
      data.datasets[4].data.push(data.datasets[4].data[x]+(u*data.datasets[2].data[x])+(uh*data.datasets[3].data[x])) // Recovered
      data.datasets[5].data.push(data.datasets[5].data[x]+(di*data.datasets[2].data[x])+(dh*data.datasets[3].data[x])) // Dead
      data.labels.push("Day " +(x+1).toString())
    }
    console.log(data.datasets)
    
    let siehrdChart = new Chart(c, {
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
 * @param {Number} i - The Infected population at the beggining of the outbreak
 * @param {Number} t - The time the total simulation lasts.
 * @param {Number} u - The recovery rate for the infected population
 * @param {Number} uh - The recovery rate for the hospitalized population
 * @param {Number} a - The incubation period
 * @param {Number} di - The death rate for the infected population
 * @param {Number} dh - The death rate for the hospitalized population
 * @param {Number} ch - The rate at which patients go to the critical stage from the hospitalized compartment.
 * @param {Number} ci - The rate at which patients go to the critical stage from the infected compartemnt.
 * @param {Number} dc - The death rate for critical patients
 * @param {Number} uc - The recovery rate for critical patients
 * @param {Number} hc - The rate at which a critical patient goes to the hospitalized compartment, and are no longer critical.
 * @param {Number} ic - The rate at which a critical patient goes to the infected compartment, and are no longer critical.
 * @param {Number} h - The hospitalization rate
 * @param {Number} p - The total population.
 * @example
 * 
 *      seihcrd(seihcrdchart, 4, 9999, 1, 265, 1/21, 1/40, 1/14, 1/100, 1/20, 1/10, 1/40, 2/5, 1/5, 1/5, 1/5, 1/30, 10000)
 */
 function seihcrd(c, rn, s, i, t, u, uh, a, di, dh, ch, ci, dc, uc, hc, ic, h, p) {
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
      label: "Hospitalized",
      borderColor: "#"+Math.floor(Math.random()*16777215).toString(16)
    },
    {
      data: [0],
      label: "Critical",
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

  for(let x = 0; x<t; x++){
    data.datasets[0].data.push(data.datasets[0].data[x]-((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)) // Susceptible
    data.datasets[1].data.push(data.datasets[1].data[x]+((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)-(a*data.datasets[1].data[x])) // Exposed
    data.datasets[2].data.push(data.datasets[2].data[x]+(a*data.datasets[1].data[x])-(u*data.datasets[2].data[x])-(di*data.datasets[2].data[x])-(ci*data.datasets[2].data[x])+(ic*data.datasets[4].data[x])) // Infected
    data.datasets[3].data.push(data.datasets[3].data[x]+(h*data.datasets[2].data[x])-(uh*data.datasets[3].data[x])-(dh*data.datasets[3].data[x])-(ch*data.datasets[3].data[x])+(hc*data.datasets[4].data[x])) // Hospitalized
    data.datasets[4].data.push(data.datasets[4].data[x]+(ci*data.datasets[2].data[x])+(ch*data.datasets[3].data[x])-(uc*data.datasets[4].data[x])-(dc*data.datasets[4].data[x])-(hc*data.datasets[4].data[x])-(ic*data.datasets[4].data[x])) // Critical
    data.datasets[5].data.push(data.datasets[5].data[x]+(u*data.datasets[2].data[x])+(uh*data.datasets[3].data[x])+(uc*data.datasets[4].data[x])) // Recovered
    data.datasets[6].data.push(data.datasets[6].data[x]+(di*data.datasets[2].data[x])+(dh*data.datasets[3].data[x])+(dc*data.datasets[4].data[x])) // Dead
    data.labels.push("Day " +(x+1).toString())
  }
  console.log(data.datasets)
  
  let siehrdChart = new Chart(c, {
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
