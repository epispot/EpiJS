/**
 * @file Pre-made graphs for modelling outbreaks.
 * 
 * Import it with:
 * ```
 *    const pre = require('@quantalabs/epijs').pre
 * ```
 */


const chart = require('chart.js')
const gaussian = require('gaussian')

/**
 * The SIR Model. Returns a chart.js graph with the total Susceptible, Infected, and Recovered after the given amount of time.
 * @param {HTMLElement} c - The HTML5 Canvas Element.
 * @param {Number} rn - R Naught, or the amount of people one infected infects whlie infected.
 * @param {Number} s - The Susceptible population at the beggining of the outbreak
 * @param {Number} i - The Infected population at the beggining of th outbreak
 * @param {Number} time - The time the total simulation lasts.
 * @param {Number} u - The recovery rate
 * @param {Number} p - The total population.
 * @param {Boolean} stochastic - Defaults to false, whether to make the model stochastic or not.
 * @example
 * 
 *      sir(sirchart, 4, 9999, 1, 100, 1/21, 10000)
 */
function sir(c, rn, s, i, time, u, p, stochastic=false) {
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
			data: [p-(s+i)],
			label: "Recovered",
			borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
		}]
	}
	let f1;
	let f2;

	for(let x = 0; x<time; x++){
		f1 = Math.sqrt((rn*u)*data.datasets[0].data[x]*data.datasets[1].data[x]/p)
		f2 = Math.sqrt(u*data.datasets[1].data[x])

		if (stochastic == true) {
			var distribution = gaussian(0, 1)
			omega1 = distribution.random(1)[0]
			omega2 = distribution.random(1)[0]
		}
		else {
			omega1 = 0
			omega2 = 0
			f1 = 0
			f2 = 0
		}
		
		data.datasets[0].data.push(data.datasets[0].data[x]-(((rn*u)*data.datasets[0].data[x]*data.datasets[1].data[x]/p)+f1*omega1))
		data.datasets[1].data.push(data.datasets[1].data[x]+(((rn*u)*data.datasets[0].data[x]*data.datasets[1].data[x]/p)+f1*omega1)-((u*data.datasets[1].data[x]+f2*omega2)))
		data.datasets[2].data.push(data.datasets[2].data[x]+(u*data.datasets[1].data[x]+f2*omega2))
		data.labels.push("Day " +(x+1).toString())

		// Check if any of the new values are below 0, if so, set them to 0
		for(let i = 0; i<data.datasets.length; i++){
			if(data.datasets[i].data[x+1] < 0){
				data.datasets[i].data[x+1] = 0
			}
		}
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
	return sirChart
}

/**
 * The SEIR Model. Returns a chart.js graph with the total Susceptible, Exposed, Infected, and Recovered after the given amount of time.
 * @param {HTMLElement} c - The HTML5 Canvas Element.
 * @param {Number} rn - R Naught, or the amount of people one infected infects whlie infected.
 * @param {Number} s - The Susceptible population at the beggining of the outbreak
 * @param {Number} i - The Infected population at the beggining of th outbreak
 * @param {Number} t - The time the total simulation lasts.
 * @param {Number} u - The recovery rate
 * @param {Number} a - The incubation period
 * @param {Number} p - The total population.
 * @param {Boolean} stochastic - Defaults to false, whether to make the model stochastic or not.
 * @example
 * 
 *      seir(seirchart, 4, 9999, 1, 100, 1/7, 1/7, 10000)
 */
function seir(c, rn, s, i, t, u, a, p, stochastic=false) {
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
			data: [p-(s+i)],
			label: "Recovered",
			borderColor: "#"+Math.floor(Math.random()*16777215).toString(16),
		}]
	}

	for(let x = 0; x<t; x++){
		f1 = Math.sqrt((rn*u)*data.datasets[0].data[x]*data.datasets[1].data[x]/p)
		f2 = Math.sqrt(u*data.datasets[1].data[x])
		f3 = Math.sqrt(a*data.datasets[1].data[x])

		if (stochastic == true) {
			var distribution = gaussian(0, 1)
			omega1 = distribution.random(1)[0]
			omega2 = distribution.random(1)[0]
			omega3 = distribution.random(1)[0]
		}
		else {
			omega1 = 0
			omega2 = 0
			omega3 = 0
			f1 = 0
			f2 = 0
			f3 = 0
		}

		data.datasets[0].data.push(data.datasets[0].data[x]-(((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)+f1*omega1))
		data.datasets[1].data.push(data.datasets[1].data[x]+(((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)+f1*omega1)-((a*data.datasets[1].data[x])+f3*omega3))
		data.datasets[2].data.push(data.datasets[2].data[x]+((a*data.datasets[1].data[x])+f3*omega3)-((u*data.datasets[2].data[x])+f2*omega2))
		data.datasets[3].data.push(data.datasets[3].data[x]+((u*data.datasets[2].data[x])+f2*omega2))
		data.labels.push("Day " +(x+1).toString())

		// Check if any of the new values are below 0, if so, set them to 0
		for(let i = 0; i<data.datasets.length; i++){
			if(data.datasets[i].data[x+1] < 0){
				data.datasets[i].data[x+1] = 0
			}
		}
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
 * The SEIRD Model. Returns a chart.js graph with the total Susceptible, Exposed, Infected, Recovered, and Dead populations after the given amount of time.
 * @param {HTMLElement} c - The HTML5 Canvas Element.
 * @param {Number} rn - R Naught, or the amount of people one infected infects whlie infected.
 * @param {Number} s - The Susceptible population at the beggining of the outbreak
 * @param {Number} i - The Infected population at the beggining of the outbreak
 * @param {Number} t - The time the total simulation lasts.
 * @param {Number} u - The recovery rate
 * @param {Number} a - The incubation period
 * @param {Number} d - The death rate
 * @param {Number} p - The total population.
 * @param {Boolean} stochastic - Defaults to false, whether to make the model stochastic or not.
 * @example
 * 
 *      seird(seirdchart, 4, 99999, 1, 100, 1/21, 1/14, 1/100, 10000)
 */
function seird(c, rn, s, i, t, u, a, d, p, stochastic=false) {
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
			data: [p-(s+i)],
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
		f1 = Math.sqrt((rn*u)*data.datasets[0].data[x]*data.datasets[1].data[x]/p)
		f2 = Math.sqrt(u*data.datasets[1].data[x])
		f3 = Math.sqrt(a*data.datasets[1].data[x])
		f4 = Math.sqrt(d*data.datasets[2].data[x])

		if (stochastic == true) {
			var distribution = gaussian(0, 1)
			omega1 = distribution.random(1)[0]
			omega2 = distribution.random(1)[0]
			omega3 = distribution.random(1)[0]
			omega4 = distribution.random(1)[0]
		}
		else {
			omega1 = 0
			omega2 = 0
			omega3 = 0
			omega4 = 0
			f1 = 0
			f2 = 0
			f3 = 0
			f4 = 0
		}
		data.datasets[0].data.push(data.datasets[0].data[x]-(((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)+f1*omega1))
		data.datasets[1].data.push(data.datasets[1].data[x]+(((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)+f1*omega1)-((a*data.datasets[1].data[x])+f3*omega3))
		data.datasets[2].data.push(data.datasets[2].data[x]+((a*data.datasets[1].data[x])+f3*omega3)-((u*data.datasets[2].data[x])+f2*omega2)-((d*data.datasets[2].data[x])+f4*omega4))
		data.datasets[3].data.push(data.datasets[3].data[x]+((u*data.datasets[2].data[x])+f2*omega2))
		data.datasets[4].data.push(data.datasets[4].data[x]+((d*data.datasets[2].data[x])+f4*omega4))
		data.labels.push("Day " +(x+1).toString())

		// Check if any of the new values are below 0, if so, set them to 0
		for(let i = 0; i<data.datasets.length; i++){
			if(data.datasets[i].data[x+1] < 0){
				data.datasets[i].data[x+1] = 0
			}
		}
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
 * The SEIHRD Model. Returns a chart.js graph with the total Susceptible, Exposed, Infected, Hospitalized, Recovered, and Dead populations after the given amount of time.
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
 * @param {Boolean} stochastic - Defaults to false, whether to make the model stochastic or not.
 * @example
 * 
 *      seihrd(seihrdmodelchart, 4, 9999, 1, 265, 1/21, 1/40, 1/14, 1/100, 1/20, 1/30, 10000)
 */
function seihrd(c, rn, s, i, t, u, uh, a, di, dh, h, p, stochastic=false) {
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
			data: [p-(s+i)],
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
		f1 = Math.sqrt((rn*u)*data.datasets[0].data[x]*data.datasets[1].data[x]/p)
		f2 = Math.sqrt(u*data.datasets[1].data[x])
		f3 = Math.sqrt(a*data.datasets[1].data[x])
		f4 = Math.sqrt(di*data.datasets[2].data[x])
		f5 = Math.sqrt(uh*data.datasets[3].data[x])
		f6 = Math.sqrt(h*data.datasets[2].data[x])
		f7 = Math.sqrt(dh*data.datasets[3].data[x])


		if (stochastic == true) {
			var distribution = gaussian(0, 1)
			omega1 = distribution.random(1)[0]
			omega2 = distribution.random(1)[0]
			omega3 = distribution.random(1)[0]
			omega4 = distribution.random(1)[0]
			omega5 = distribution.random(1)[0]
			omega6 = distribution.random(1)[0]
			omega7 = distribution.random(1)[0]
		}
		else {
			omega1 = 0
			omega2 = 0
			omega3 = 0
			omega4 = 0
			omega5 = 0
			omega6 = 0
			omega7 = 0
			omega8 = 0
			f1 = 0
			f2 = 0
			f3 = 0
			f4 = 0
			f5 = 0
			f6 = 0
			f7 = 0
		}
		data.datasets[0].data.push(data.datasets[0].data[x]-(((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)+f1*omega1)) // Susceptible
		data.datasets[1].data.push(data.datasets[1].data[x]+(((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p)+f1*omega1)-((a*data.datasets[1].data[x])+f3*omega3)) // Exposed
		data.datasets[2].data.push(data.datasets[2].data[x]+((a*data.datasets[1].data[x])+f3*omega3)-((u*data.datasets[2].data[x])+f2*omega2)-((di*data.datasets[2].data[x])+f4*omega4)-((h*data.datasets[2].data[x])+f6*omega6)) // Infected
		data.datasets[3].data.push(data.datasets[3].data[x]+(h*data.datasets[2].data[x]+f6*omega6)-(uh*data.datasets[3].data[x]+f5*omega5)-(dh*data.datasets[3].data[x]+f7*omega7)) // Hospitalized
		data.datasets[4].data.push(data.datasets[4].data[x]+(u*data.datasets[2].data[x]+f2*omega2)+(uh*data.datasets[3].data[x]+f5*omega5)) // Recovered
		data.datasets[5].data.push(data.datasets[5].data[x]+(di*data.datasets[2].data[x]+f4*omega4)+(dh*data.datasets[3].data[x]+f7*omega7)) // Dead
		data.labels.push("Day " +(x+1).toString())

		// Check if any of the new values are below 0, if so, set them to 0
		for(let i = 0; i<data.datasets.length; i++){
			if(data.datasets[i].data[x+1] < 0){
				data.datasets[i].data[x+1] = 0
			}
		}
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
 * The SEIHCRD Model. Returns a chart.js graph with the total Susceptible, Exposed, Infected, Hospitalized, Critical, Recovered, and Dead populations after the given amount of time.
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
 * @param {Boolean} stochastic - Defaults to false, whether to make the model stochastic or not.
 * @example
 * 
 *      seihcrd(seihcrdchart, 4, 9999, 1, 265, 1/21, 1/40, 1/14, 1/100, 1/20, 1/10, 1/40, 2/5, 1/5, 1/5, 1/5, 1/30, 10000)
 */
 function seihcrd(c, rn, s, i, t, u, uh, a, di, dh, ch, ci, dc, uc, hc, ic, h, p, stochastic=false) {
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
	  data: [p-(s+i)],
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
	f1 = Math.sqrt((rn*u)*data.datasets[0].data[x]*data.datasets[1].data[x]/p)
	f2 = Math.sqrt(u*data.datasets[1].data[x])
	f3 = Math.sqrt(a*data.datasets[1].data[x])
	f4 = Math.sqrt(di*data.datasets[2].data[x])
	f5 = Math.sqrt(uh*data.datasets[3].data[x])
	f6 = Math.sqrt(h*data.datasets[2].data[x])
	f7 = Math.sqrt(dh*data.datasets[3].data[x])
	f8 = Math.sqrt(ch*data.datasets[3].data[x])
	f9 = Math.sqrt(ci*data.datasets[2].data[x])
	f10 = Math.sqrt(dc*data.datasets[4].data[x])
	f11 = Math.sqrt(uc*data.datasets[4].data[x])
	f12 = Math.sqrt(hc*data.datasets[4].data[x])
	f13 = Math.sqrt(ic*data.datasets[4].data[x])


	if (stochastic == true) {
		var distribution = gaussian(0, 1)
		omega1 = distribution.random(1)[0]
		omega2 = distribution.random(1)[0]
		omega3 = distribution.random(1)[0]
		omega4 = distribution.random(1)[0]
		omega5 = distribution.random(1)[0]
		omega6 = distribution.random(1)[0]
		omega7 = distribution.random(1)[0]
		omega8 = distribution.random(1)[0]
		omega9 = distribution.random(1)[0]
		omega10 = distribution.random(1)[0]
		omega11 = distribution.random(1)[0]
		omega12 = distribution.random(1)[0]
		omega13 = distribution.random(1)[0]
	}
	else {
		omega1 = 0
		omega2 = 0
		omega3 = 0
		omega4 = 0
		omega5 = 0
		omega6 = 0
		omega7 = 0
		omega8 = 0
		omega9 = 0
		omega10 = 0
		omega11 = 0
		omega12 = 0
		omega13 = 0
		f1 = 0
		f2 = 0
		f3 = 0
		f4 = 0
		f5 = 0
		f6 = 0
		f7 = 0
		f8 = 0
		f9 = 0
		f10 = 0
		f11 = 0
		f12 = 0
		f13 = 0
	}
	data.datasets[0].data.push(data.datasets[0].data[x]-((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p+f1*omega1)) // Susceptible
	data.datasets[1].data.push(data.datasets[1].data[x]+((rn*u)*data.datasets[0].data[x]*data.datasets[2].data[x]/p+f1*omega1)-(a*data.datasets[1].data[x]+f3*omega3)) // Exposed
	data.datasets[2].data.push(data.datasets[2].data[x]+(a*data.datasets[1].data[x]+f3*omega3)-(u*data.datasets[2].data[x]+f2*omega2)-(di*data.datasets[2].data[x]+f4*omega4)-(ci*data.datasets[2].data[x]+f9*omega9)+(ic*data.datasets[4].data[x]+f13*omega13)-(h*data.datasets[2].data[x]+f6*omega6)) // Infected
	data.datasets[3].data.push(data.datasets[3].data[x]+(h*data.datasets[2].data[x]+f6*omega6)-(uh*data.datasets[3].data[x]+f5*omega5)-(dh*data.datasets[3].data[x]+f7*omega7)-(ch*data.datasets[3].data[x]+f8*omega8)+(hc*data.datasets[4].data[x]+f12*omega12)) // Hospitalized
	data.datasets[4].data.push(data.datasets[4].data[x]+(ci*data.datasets[2].data[x]+f9*omega9)+(ch*data.datasets[3].data[x]+f8*omega8)-(uc*data.datasets[4].data[x]+f11*omega11)-(dc*data.datasets[4].data[x]+f10*omega10)-(hc*data.datasets[4].data[x]+f12*omega12)-(ic*data.datasets[4].data[x]+f13*omega13)) // Critical
	data.datasets[5].data.push(data.datasets[5].data[x]+(u*data.datasets[2].data[x]+f2*omega2)+(uh*data.datasets[3].data[x]+f5*omega5)+(uc*data.datasets[4].data[x]+f11*omega11)) // Recovered
	data.datasets[6].data.push(data.datasets[6].data[x]+(di*data.datasets[2].data[x]+f4*omega4)+(dh*data.datasets[3].data[x]+f7*omega7)+(dc*data.datasets[4].data[x]+f10*omega10)) // Dead
	data.labels.push("Day " +(x+1).toString())

	// Check if any of the new values are below 0, if so, set them to 0
	for(let i = 0; i<data.datasets.length; i++){
		if(data.datasets[i].data[x+1] < 0){
			data.datasets[i].data[x+1] = 0
		}
	}
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

exports.sir = sir
exports.seir = seir
exports.seird = seird
exports.seihrd = seihrd
exports.seihcrd = seihcrd
