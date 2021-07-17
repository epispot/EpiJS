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
 * @param {Boolean} stochastic - Whether to make the model stochastic or not.
 * @example
 * 
 *      sir(sirchart, 4, 9999, 1, 100, 1/21, 10000)
 */
function sir(rn, s, i, time, u, p, stochastic) {
	let data = [
		{ 
			data: [s],
			label: "Suseptible"
		},
		{ 
			data: [i],
			label: "Infected"
		},
		{ 
			data: [p-(s+i)],
			label: "Recovered"
		}
	]
	var f1 = 0;
	var f2 = 0;

	for(let x = 0; x<time; x++){
		f1 = Math.sqrt((rn*u)*data[0].data[x]*data[1].data[x]/p)
		f2 = Math.sqrt(u*data[1].data[x])

		if (stochastic === true) {
			var distribution = gaussian(0, 1)
			var omega1 = distribution.random(1)[0]
			var omega2 = distribution.random(1)[0]
		}
		else {
			var omega1 = 0
			var omega2 = 0
			f1 = 0
			f2 = 0
		}
		
		data[0].data.push(data[0].data[x]-(((rn*u)*data[0].data[x]*data[1].data[x]/p)+f1*omega1))
		data[1].data.push(data[1].data[x]+(((rn*u)*data[0].data[x]*data[1].data[x]/p)+f1*omega1)-((u*data[1].data[x]+f2*omega2)))
		data[2].data.push(data[2].data[x]+(u*data[1].data[x]+f2*omega2))

		// Check if any of the new values are below 0, if so, set them to 0
		for(let i = 0; i<data.length; i++){ // skipcq: JS-0123
			if(data[i].data[x+1] < 0){
				data[i].data[x+1] = 0
			}
		}
	}
	
	return data
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
 * @param {Boolean} stochastic - Whether to make the model stochastic or not.
 * @example
 * 
 *      seir(seirchart, 4, 9999, 1, 100, 1/7, 1/7, 10000)
 */
function seir(rn, s, i, t, u, a, p, stochastic) {
	let data = [{ 
			data: [s],
			label: "Suseptible"
		},
		{ 
			data: [0],
			label: "Exposed"
		},
		{
			data: [i],
			label: "Infected"
		},
		{ 
			data: [p-(s+i)],
			label: "Recovered"
		}
	]

	for(let x = 0; x<t; x++){
		var f1 = Math.sqrt((rn*u)*data[0].data[x]*data[1].data[x]/p)
		var f2 = Math.sqrt(u*data[1].data[x])
		var f3 = Math.sqrt(a*data[1].data[x])

		if (stochastic === true) {
			var distribution = gaussian(0, 1)
			var omega1 = distribution.random(1)[0]
			var omega2 = distribution.random(1)[0]
			var omega3 = distribution.random(1)[0]
		}
		else {
			var omega1 = 0
			var omega2 = 0
			var omega3 = 0
			f1 = 0
			f2 = 0
			f3 = 0
		}

		data[0].data.push(data[0].data[x]-(((rn*u)*data[0].data[x]*data[2].data[x]/p)+f1*omega1))
		data[1].data.push(data[1].data[x]+(((rn*u)*data[0].data[x]*data[2].data[x]/p)+f1*omega1)-((a*data[1].data[x])+f3*omega3))
		data[2].data.push(data[2].data[x]+((a*data[1].data[x])+f3*omega3)-((u*data[2].data[x])+f2*omega2))
		data[3].data.push(data[3].data[x]+((u*data[2].data[x])+f2*omega2))

		// Check if any of the new values are below 0, if so, set them to 0
		for(let i = 0; i<data.length; i++){ // skipcq: JS-0123
			if(data[i].data[x+1] < 0){
				data[i].data[x+1] = 0
			}
		}
	}
	
	return data
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
 * @param {Boolean} stochastic - Whether to make the model stochastic or not.
 * @example
 * 
 *      seird(seirdchart, 4, 99999, 1, 100, 1/21, 1/14, 1/100, 10000)
 */
function seird(rn, s, i, t, u, a, d, p, stochastic) {
	let data = [{ 
			data: [s],
			label: "Suseptible"
		},
		{ 
			data: [0],
			label: "Exposed"
		},
		{
			data: [i],
			label: "Infected"
		},
		{ 
			data: [p-(s+i)],
			label: "Recovered"
		},
		{ 
			data: [0],
			label: "Dead"
		}
	]

	for(let x = 0; x<t; x++){
		var f1 = Math.sqrt((rn*u)*data[0].data[x]*data[1].data[x]/p)
		var f2 = Math.sqrt(u*data[1].data[x])
		var f3 = Math.sqrt(a*data[1].data[x])
		var f4 = Math.sqrt(d*data[2].data[x])

		if (stochastic === true) {
			var distribution = gaussian(0, 1)
			var omega1 = distribution.random(1)[0]
			var omega2 = distribution.random(1)[0]
			var omega3 = distribution.random(1)[0]
			var omega4 = distribution.random(1)[0]
		}
		else {
			var omega1 = 0
			var omega2 = 0
			var omega3 = 0
			var omega4 = 0
			f1 = 0
			f2 = 0
			f3 = 0
			f4 = 0
		}
		data[0].data.push(data[0].data[x]-(((rn*u)*data[0].data[x]*data[2].data[x]/p)+f1*omega1))
		data[1].data.push(data[1].data[x]+(((rn*u)*data[0].data[x]*data[2].data[x]/p)+f1*omega1)-((a*data[1].data[x])+f3*omega3))
		data[2].data.push(data[2].data[x]+((a*data[1].data[x])+f3*omega3)-((u*data[2].data[x])+f2*omega2)-((d*data[2].data[x])+f4*omega4))
		data[3].data.push(data[3].data[x]+((u*data[2].data[x])+f2*omega2))
		data[4].data.push(data[4].data[x]+((d*data[2].data[x])+f4*omega4))

		// Check if any of the new values are below 0, if so, set them to 0
		for(let i = 0; i<data.length; i++){ // skipcq: JS-0123
			if(data[i].data[x+1] < 0){
				data[i].data[x+1] = 0
			}
		}
	}
	
	
	return data
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
 * @param {Boolean} stochastic - Whether to make the model stochastic or not.
 * @example
 * 
 *      seihrd(seihrdmodelchart, 4, 9999, 1, 265, 1/21, 1/40, 1/14, 1/100, 1/20, 1/30, 10000)
 */
function seihrd(rn, s, i, t, u, uh, a, di, dh, h, p, stochastic) {
	let data = [{ 
			data: [s],
			label: "Suseptible"
		},
		{ 
			data: [0],
			label: "Exposed"
		},
		{
			data: [i],
			label: "Infected"
		},
		{
			data: [0],
			label: "Hospitalized"
		},
		{ 
			data: [p-(s+i)],
			label: "Recovered"
		},
		{ 
			data: [0],
			label: "Dead"
		}
	]

	for(let x = 0; x<t; x++){
		var f1 = Math.sqrt((rn*u)*data[0].data[x]*data[1].data[x]/p)
		var f2 = Math.sqrt(u*data[1].data[x])
		var f3 = Math.sqrt(a*data[1].data[x])
		var f4 = Math.sqrt(di*data[2].data[x])
		var f5 = Math.sqrt(uh*data[3].data[x])
		var f6 = Math.sqrt(h*data[2].data[x])
		var f7 = Math.sqrt(dh*data[3].data[x])


		if (stochastic === true) {
			var distribution = gaussian(0, 1)
			var omega1 = distribution.random(1)[0]
			var omega2 = distribution.random(1)[0]
			var omega3 = distribution.random(1)[0]
			var omega4 = distribution.random(1)[0]
			var omega5 = distribution.random(1)[0]
			var omega6 = distribution.random(1)[0]
			var omega7 = distribution.random(1)[0]
		}
		else {
			var omega1 = 0
			var omega2 = 0
			var omega3 = 0
			var omega4 = 0
			var omega5 = 0
			var omega6 = 0
			var omega7 = 0
			var omega8 = 0
			f1 = 0
			f2 = 0
			f3 = 0
			f4 = 0
			f5 = 0
			f6 = 0
			f7 = 0
		}
		data[0].data.push(data[0].data[x]-(((rn*u)*data[0].data[x]*data[2].data[x]/p)+f1*omega1)) // Susceptible
		data[1].data.push(data[1].data[x]+(((rn*u)*data[0].data[x]*data[2].data[x]/p)+f1*omega1)-((a*data[1].data[x])+f3*omega3)) // Exposed
		data[2].data.push(data[2].data[x]+((a*data[1].data[x])+f3*omega3)-((u*data[2].data[x])+f2*omega2)-((di*data[2].data[x])+f4*omega4)-((h*data[2].data[x])+f6*omega6)) // Infected
		data[3].data.push(data[3].data[x]+(h*data[2].data[x]+f6*omega6)-(uh*data[3].data[x]+f5*omega5)-(dh*data[3].data[x]+f7*omega7)) // Hospitalized
		data[4].data.push(data[4].data[x]+(u*data[2].data[x]+f2*omega2)+(uh*data[3].data[x]+f5*omega5)) // Recovered
		data[5].data.push(data[5].data[x]+(di*data[2].data[x]+f4*omega4)+(dh*data[3].data[x]+f7*omega7)) // Dead

		// Check if any of the new values are below 0, if so, set them to 0
		for(let i = 0; i<data.length; i++){ // skipcq: JS-0123
			if(data[i].data[x+1] < 0){
				data[i].data[x+1] = 0
			}
		}
	}

	return data
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
 * @param {Boolean} stochastic - Whether to make the model stochastic or not.
 * @example
 * 
 *      seihcrd(seihcrdchart, 4, 9999, 1, 265, 1/21, 1/40, 1/14, 1/100, 1/20, 1/10, 1/40, 2/5, 1/5, 1/5, 1/5, 1/30, 10000)
 */
 function seihcrd(rn, s, i, t, u, uh, a, di, dh, ch, ci, dc, uc, hc, ic, h, p, stochastic) {
  let data = [
		{ 
			data: [s],
			label: "Suseptible"
		},
		{ 
			data: [0],
			label: "Exposed"
		},
		{
			data: [i],
			label: "Infected"
		},
		{
			data: [0],
			label: "Hospitalized"
		},
		{
			data: [0],
			label: "Critical"
		},
		{ 
			data: [p-(s+i)],
			label: "Recovered"
		},
		{ 
			data: [0],
			label: "Dead"
		}
	]

  for(let x = 0; x<t; x++){
	var f1 = Math.sqrt((rn*u)*data[0].data[x]*data[1].data[x]/p)
	var f2 = Math.sqrt(u*data[1].data[x])
	var f3 = Math.sqrt(a*data[1].data[x])
	var f4 = Math.sqrt(di*data[2].data[x])
	var f5 = Math.sqrt(uh*data[3].data[x])
	var f6 = Math.sqrt(h*data[2].data[x])
	var f7 = Math.sqrt(dh*data[3].data[x])
	var f8 = Math.sqrt(ch*data[3].data[x])
	var f9 = Math.sqrt(ci*data[2].data[x])
	var f10 = Math.sqrt(dc*data[4].data[x])
	var f11 = Math.sqrt(uc*data[4].data[x])
	var f12 = Math.sqrt(hc*data[4].data[x])
	var f13 = Math.sqrt(ic*data[4].data[x])


	if (stochastic === true) {
		var distribution = gaussian(0, 1)
		var omega1 = distribution.random(1)[0]
		var omega2 = distribution.random(1)[0]
		var omega3 = distribution.random(1)[0]
		var omega4 = distribution.random(1)[0]
		var omega5 = distribution.random(1)[0]
		var omega6 = distribution.random(1)[0]
		var omega7 = distribution.random(1)[0]
		var omega8 = distribution.random(1)[0]
		var omega9 = distribution.random(1)[0]
		var omega10 = distribution.random(1)[0]
		var omega11 = distribution.random(1)[0]
		var omega12 = distribution.random(1)[0]
		var omega13 = distribution.random(1)[0]
	}
	else {
		var omega1 = 0
		var omega2 = 0
		var omega3 = 0
		var omega4 = 0
		var omega5 = 0
		var omega6 = 0
		var omega7 = 0
		var omega8 = 0
		var omega9 = 0
		var omega10 = 0
		var omega11 = 0
		var omega12 = 0
		var omega13 = 0
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
	data[0].data.push(data[0].data[x]-((rn*u)*data[0].data[x]*data[2].data[x]/p+f1*omega1)) // Susceptible
	data[1].data.push(data[1].data[x]+((rn*u)*data[0].data[x]*data[2].data[x]/p+f1*omega1)-(a*data[1].data[x]+f3*omega3)) // Exposed
	data[2].data.push(data[2].data[x]+(a*data[1].data[x]+f3*omega3)-(u*data[2].data[x]+f2*omega2)-(di*data[2].data[x]+f4*omega4)-(ci*data[2].data[x]+f9*omega9)+(ic*data[4].data[x]+f13*omega13)-(h*data[2].data[x]+f6*omega6)) // Infected
	data[3].data.push(data[3].data[x]+(h*data[2].data[x]+f6*omega6)-(uh*data[3].data[x]+f5*omega5)-(dh*data[3].data[x]+f7*omega7)-(ch*data[3].data[x]+f8*omega8)+(hc*data[4].data[x]+f12*omega12)) // Hospitalized
	data[4].data.push(data[4].data[x]+(ci*data[2].data[x]+f9*omega9)+(ch*data[3].data[x]+f8*omega8)-(uc*data[4].data[x]+f11*omega11)-(dc*data[4].data[x]+f10*omega10)-(hc*data[4].data[x]+f12*omega12)-(ic*data[4].data[x]+f13*omega13)) // Critical
	data[5].data.push(data[5].data[x]+(u*data[2].data[x]+f2*omega2)+(uh*data[3].data[x]+f5*omega5)+(uc*data[4].data[x]+f11*omega11)) // Recovered
	data[6].data.push(data[6].data[x]+(di*data[2].data[x]+f4*omega4)+(dh*data[3].data[x]+f7*omega7)+(dc*data[4].data[x]+f10*omega10)) // Dead

	// Check if any of the new values are below 0, if so, set them to 0
	for(let i = 0; i<data.length; i++){ // skipcq: JS-0123
		if(data[i].data[x+1] < 0){
			data[i].data[x+1] = 0
		}
	}
  }
  
  return data
}

exports.sir = sir
exports.seir = seir
exports.seird = seird
exports.seihrd = seihrd
exports.seihcrd = seihcrd
