/**
 * @file Pre-made models for disease outbreaks.
 * 
 * Import it with:
 * ```
 *    const pre = require('@epispot/epijs').pre
 * ```
 */

const gaussian = require('gaussian')
const modelm = require('./model')
const comp = require('./comp')

/**
 * The SIR Model. Returns the model as a `model` class from the `model` module.
 * @param {Number} rn - R Naught, or the amount of people one infected infects whlie infected.
 * @param {Number} s - The Susceptible population at the beggining of the outbreak
 * @param {Number} i - The Infected population at the beggining of th outbreak
 * @param {Number} u - The recovery rate
 * @param {Number} p - The total population.
 * @param {Boolean} stochastic - Whether to make the model stochastic or not.
 * @returns A model class from the `model` module. .
 * @example
 * 
 *      let sirmodel = sir(4, 9999, 1, 1/21, 10000, true)
 */

function sir(rn, s, i, u, p, stochastic) {
	let distribution = gaussian(0, 1)
	let omega1 = distribution.random(1)[0]
	let omega2 = distribution.random(1)[0]
	let f1 = 'sqrt((B*S*I)/p)'
	let f2 = 'sqrt(u*I)'
	if (stochastic !== true) {
		omega1 = 0
		omega2 = 0
		f1 = 0
		f2 = 0
	}

	let key = {
		S: s,
		I: i,
		R: p-(s+i),
		u: u,
		B: u*rn,
		p: p
	}

	// Create the compartments
	let susceptible = new comp.Idiom('S-(((B*S*I)/p)+'+f1+'*'+omega1+')')
	let infected = new comp.Idiom('I+(((B*S*I)/p)+'+f1+'*'+omega1+')-((u*I)+'+f2+'*'+omega2+')')
	let recovered = new comp.Idiom('R+((u*I)+'+f2+'*'+omega2+')')

	// Create the model
	let model = new modelm.Model([[susceptible, 'S'], [infected, 'I'], [recovered, 'R']])

	return [model, key]
}

/**
 * The SEIR Model. Returns the model as a `model` class from the `model` module.
 * @param {Number} rn - R Naught, or the amount of people one infected infects whlie infected.
 * @param {Number} s - The Susceptible population at the beggining of the outbreak
 * @param {Number} i - The Infected population at the beggining of th outbreak
 * @param {Number} u - The recovery rate
 * @param {Number} a - The incubation period
 * @param {Number} p - The total population.
 * @param {Boolean} stochastic - Whether to make the model stochastic or not.
 * @returns A model class from the `model` module. .
 * @example
 * 
 *      seir(4, 9999, 1, 1/7, 1/7, 10000, true)
 */
function seir(rn, s, i, u, a, p, stochastic) {
	let distribution = gaussian(0, 1)
	let omega1 = distribution.random(1)[0]
	let omega2 = distribution.random(1)[0]
	let omega3 = distribution.random(1)[0]
	let f1 = 'sqrt((B*S*I)/p)'
	let f2 = 'sqrt(u*I)'
	let f3 = 'sqrt(a*E)'
	if (stochastic !== true) {
		omega1 = 0
		omega2 = 0
		omega3 = 0
		f1 = 0
		f2 = 0
		f3 = 0
	}

	let key = {
		S: s,
		I: i,
		E: 0,
		R: p-(s+i),
		u: u,
		a: a,
		B: u*rn,
		p: p
	}
	
	// Create the compartments
	let susceptible = new comp.Idiom('S-(((B*S*I)/p)+'+f1+'*'+omega1+')')
	let exposed = new comp.Idiom('E+(((B*S*I)/p)+'+f1+'*'+omega1+')-((a*E)+'+f3+'*'+omega3+')')
	let infected = new comp.Idiom('I-((u*I)+'+f2+'*'+omega2+')+((a*E)+'+f3+'*'+omega3+')')
	let recovered = new comp.Idiom('R+((u*I)+'+f2+'*'+omega2+')')

	// Create the model
	let model = new modelm.Model([[susceptible, 'S'], [exposed, 'E'], [infected, 'I'], [recovered, 'R']])

	return [model, key]
}

/**
 * The SEIRD Model. Returns the model as a `model` class from the `model` module.
 * @param {Number} rn - R Naught, or the amount of people one infected infects whlie infected.
 * @param {Number} s - The Susceptible population at the beggining of the outbreak
 * @param {Number} i - The Infected population at the beggining of the outbreak
 * @param {Number} u - The recovery rate
 * @param {Number} a - The incubation period
 * @param {Number} d - The death rate
 * @param {Number} p - The total population.
 * @param {Boolean} stochastic - Whether to make the model stochastic or not.
 * @returns A model class from the `model` module. .
 * @example
 * 
 *      seird(4, 99999, 1, 1/21, 1/14, 1/100, 10000, true)
 */
function seird(rn, s, i, u, a, d, p, stochastic) {
	let distribution = gaussian(0, 1)
	let omega1 = distribution.random(1)[0]
	let omega2 = distribution.random(1)[0]
	let omega3 = distribution.random(1)[0]
	let omega4 = distribution.random(1)[0]
	let f1 = 'sqrt((B*S*I)/p)'
	let f2 = 'sqrt(u*I)'
	let f3 = 'sqrt(a*E)'
	let f4 = 'sqrt(d*I)'
	if (stochastic !== true) {
		omega1 = 0
		omega2 = 0
		omega3 = 0
		omega4 = 0
		f1 = 0
		f2 = 0
		f3 = 0
		f4 = 0
	}
		
	let key = {
		S: s,
		I: i,
		E: 0,
		D: 0,
		R: p-(s+i),
		u: u,
		a: a,
		d: d,
		B: u*rn,
		p: p
	}

	// Create the compartments
	let susceptible = new comp.Idiom('S-(((B*S*I)/p)+'+f1+'*'+omega1+')')
	let exposed = new comp.Idiom('E+(((B*S*I)/p)+'+f1+'*'+omega1+')-((a*E)+'+f3+'*'+omega3+')')
	let infected = new comp.Idiom('I-((u*I)+'+f2+'*'+omega2+')+((a*E)+'+f3+'*'+omega3+')-((d*I)+'+f4+'*'+omega4+')')
	let recovered = new comp.Idiom('R+((u*I)+'+f2+'*'+omega2+')')
	let dead = new comp.Idiom('D+((d*I)+'+f4+'*'+omega4+')')
	
	// Create the model
	let model = new modelm.Model([[susceptible, 'S'], [exposed, 'E'], [infected, 'I'], [recovered, 'R'], [dead, 'D']])

	return [model, key]
}

/**
 * The SEIHRD Model. Returns the model as a `model` class from the `model` module.
 * @param {Number} rn - R Naught, or the amount of people one infected infects whlie infected.
 * @param {Number} s - The Susceptible population at the beggining of the outbreak
 * @param {Number} i - The Infected population at the beggining of the outbreak
 * @param {Number} u - The recovery rate for the infected population
 * @param {Number} uh - The recovery rate for the hospitalized population
 * @param {Number} a - The incubation period
 * @param {Number} di - The death rate for the infected population
 * @param {Number} dh - The death rate for the hospitalized population
 * @param {Number} h - The hospitalization rate
 * @param {Number} p - The total population.
 * @param {Boolean} stochastic - Whether to make the model stochastic or not.
 * @returns A model class from the `model` module. .
 * @example
 * 
 *      seihrd(4, 9999, 1, 1/21, 1/40, 1/14, 1/100, 1/20, 1/30, 10000, true)
 */
function seihrd(rn, s, i, u, uh, a, di, dh, h, p, stochastic) {
	let distribution = gaussian(0, 1)
	let omega1 = distribution.random(1)[0]
	let omega2 = distribution.random(1)[0]
	let omega3 = distribution.random(1)[0]
	let omega4 = distribution.random(1)[0]
	let omega5 = distribution.random(1)[0]
	let omega6 = distribution.random(1)[0]
	let omega7 = distribution.random(1)[0]
	let f1 = 'sqrt((B*S*I)/p)'
	let f2 = 'sqrt(u*I)'
	let f3 = 'sqrt(a*E)'
	let f4 = 'sqrt(d*I)'
	let f5 = 'sqrt(y*H)'
	let f6 = 'sqrt(z*I)'
	let f7 = 'sqrt(x*H)'
	if (stochastic !== true) {
		omega1 = 0
		omega2 = 0
		omega3 = 0
		omega4 = 0
		omega5 = 0
		omega6 = 0
		omega7 = 0
		f1 = 0
		f2 = 0
		f3 = 0
		f4 = 0
		f5 = 0
		f6 = 0
		f7 = 0
	}

	let key = {
		S: s,
		I: i,
		E: 0,
		D: 0,
		H: 0,
		R: p-(s+i),
		u: u,
		y: uh,
		z: h,
		x: dh,
		a: a,
		d: di,
		B: u*rn,
		p: p
	}

	// Create the compartments
	let susceptible = new comp.Idiom('S-(((B*S*I)/p)+'+f1+'*'+omega1+')')
	let exposed = new comp.Idiom('E+(((B*S*I)/p)+'+f1+'*'+omega1+')-((a*E)+'+f3+'*'+omega3+')')
	let infected = new comp.Idiom('I-((u*I)+'+f2+'*'+omega2+')+((a*E)+'+f3+'*'+omega3+')-((d*I)+'+f4+'*'+omega4+')+((z*I)+'+f6+'*'+omega6+')')
	let hospitalized = new comp.Idiom('H+((z*I)+'+f6+'*'+omega6+')-((x*H)+'+f7+'*'+omega7+')-((y*H)+'+f5+'*'+omega5+')')
	let recovered = new comp.Idiom('R+((u*I)+'+f2+'*'+omega2+')+((y*H)+'+f5+'*'+omega5+')')
	let dead = new comp.Idiom('D+((d*I)+'+f4+'*'+omega4+')+((x*H)+'+f7+'*'+omega7+')')

	// Create the model
	let model = new modelm.Model([[susceptible, 'S'], [exposed, 'E'], [infected, 'I'], [hospitalized, 'H'], [recovered, 'R'], [dead, 'D']])

	return [model, key]
}

exports.sir = sir
exports.seir = seir
exports.seird = seird
exports.seihrd = seihrd
