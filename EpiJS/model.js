/**
 * @file EpiJS module for creating custom models, which are made of compartments.
 *
 * Import it with:
 * ```
 *    const model = require('@epispot/epijs').model
 * ```
 */


const fs = require('fs');
const comps = require('./comp')

/**
 * Create a model.
 * @param {Array} compartments Compartments in the model. Each should be a list, with the first value being the compartment, and the second being it's start value in the key.
 * @param {Object} key The key of values for any variable used in the equation. If you use any variable which represents the population of a compartment, add the starting value into the key.
 * @example
 *
 *      let susceptible = new Idiom("S-(B*S*I/p)");
 *let infected = new Idiom("I+(B*S*I/p)-(u*I)");
 *let recovered = new Idiom("R+(u*I)");
 *
 *let key = {
 *  "S": 10000,
 *  "B": 0.3,
 *  "I": 100,
 *  "R": 0,
 *  "p": 10100,
 *  "u": 0.2
 *};
 *
 *let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)
 *
 */
class Model {

	constructor(compartments, key) {
		this.compartments = compartments
		this.key = key
	}

	/**
	 * Get data for the outbreak.
	 * @param {Number} time - The total time to model.
	 * @example
	 *
	 *      let susceptible = new Idiom("S-(B*S*I/p)");
	 *let infected = new Idiom("I+(B*S*I/p)-(u*I)");
	 *let recovered = new Idiom("R+(u*I)");
	 *
	 *let key = {
	 *  "S": 10000,
	 *  "B": 0.3,
	 *  "I": 100,
	 *  "R": 0,
	 *  "p": 10100,
	 *  "u": 0.2
	 *};
	 *
	 *let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)
	 *
	 *model.get_data(100) // Get data for 100 days.
	 */
	get_data(time) { // skipcq: JS-0045
		let key = {}
		let newkey = {}
		
		// For key in this.key, add it to newkey and key.
		for (let key_key in this.key) {
			key[key_key] = this.key[key_key]
			newkey[key_key] = this.key[key_key]
		}

		for (let x = 0; x < time; x++) {
			let y; // skipcq: JS-0119
			for (y in this.compartments) {
				newkey[this.compartments[y][1]] = this.compartments[y][0].get_data(key)
			}
			key = newkey
			if (x === time - 1) {
				let return_val = {}
				for (y in this.compartments) {
					return_val[this.compartments[y][1]] = key[this.compartments[y][1]]
					// Check for sub-compartmnets
					if(Object.keys(this.compartments[y][0].compartments).length !== 0) {
						return_val[this.compartments[y][1]] = {
							"population": key[this.compartments[y][1]],
							"compartments": {}
						}
						for (let z in this.compartments[y][0].compartments) {
							return_val[this.compartments[y][1]].compartments[z] = this.compartments[y][0].getSubData(z, key)
						}
					}
				}
				return return_val
			}
		}
	}

	/**
	 * Remove a compartment from the model.
	 * @param {Object} compartment - The compartment to remove.
	 * @example
	 * 
	 * 	let susceptible = new Idiom("S-(B*S*I/p)");
	 * let infected = new Idiom("I+(B*S*I/p)-(u*I)");
	 * let recovered = new Idiom("R+(u*I)");
	 * 
	 * let key = {
	 * 	"S": 10000,
	 * 	"B": 0.3,
	 * 	"I": 100,
	 * 	"R": 0,
	 * 	"p": 10100,
	 * 	"u": 0.2
	 * };
	 * 
	 * let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)
	 * 
	 * sirm.remove(recovered) // Removes the recovered compartment.
	 */
	remove(compartment) {
		for (let x = 0; x < this.compartments.length; x++) {
			if (this.compartments[x][0] === compartment) {
				this.compartments.splice(x, 1)
			}
		}
	}

	/**
	 * Add a compartment to the model.
	 * @param {Array} compartment - The compartment to add, should be a list, with the first value being the compartment, and the second being it's value in the key.
	 * @param {Number} index - The index to add the compartment at.
	 * @example
	 * 
	 * 	let susceptible = new Idiom("S-(B*S*I/p)");
	 * let infected = new Idiom("I+(B*S*I/p)-(u*I)");
	 * let recovered = new Idiom("R+(u*I)");
	 * 	
	 * let key = {
	 * 	"S": 10000,
	 * 	"B": 0.3,
	 * 	"I": 100,
	 * 	"R": 0,
	 * 	"p": 10100,
	 * 	"u": 0.2
	 * };
	 * 
	 * let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)
	 * 
	 * sirm.remove(susceptible) // Removes the susceptible compartment.
	 * sirm.add([susceptible, "S"], 0) // Adds the susceptible compartment back to the beginning
	 */
	add(compartment, index) {
		this.compartments.splice(index, 0, compartment)
	}
}

/** 
 * NodeJS only! Exports models to a file which can then be imported later on.
 * @param model The EpiJS model to export
 * @param {String} output The output file path, doesn't have to exist
 * @param {String} file_type The file type to output. Supported inputs are ".json" and ".js".
 * @example
 *
 *      let susceptible = new Idiom("S-(B*S*I/p)");
 *let infected = new Idiom("I+(B*S*I/p)-(u*I)");
 *let recovered = new Idiom("R+(u*I)");
 *
 *let key = {
 *  "S": 10000,
 *  "B": 0.3,
 *  "I": 100,
 *  "R": 0,
 *  "p": 10100,
 *  "u": 0.2
 *};
 *
 *let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)
 *
 *mexport(sirm, "output.js", file_type=".js")
 */
function mexport(model, output, file_type=".json") {
	let jsonout = {
		"compartments": {

		},
		"key": model.key
	}
	for (let x in model.compartments) {
		if (model.compartments[x][0].compartments === {}) {
			delete model.compartments[x][0].compartments
		}
		jsonout.compartments[model.compartments[x][1]] = model.compartments[x][0]
		model.compartments[x][0].compartments = {} // Reset the subcompartments
	}
	if (file_type === ".json") {
		fs.writeFileSync(output, JSON.stringify(jsonout, null, 2))
	} else if (file_type === ".js") {
		fs.writeFileSync(output, "module.exports = " + JSON.stringify(jsonout, null, 2))
	}

}

/**
 * NodeJS only! Imports a model from a file.
 * @param {String} input The input file path, as a relative path.
 * @param {String} file_type The file type of the input. Supported inputs are ".json" and ".js".
 * @example
 * // Use mexport to export a model into a file
 *let sirm = mimport("./output.json") 
 */
function mimport(input, file_type=".json") {
	let json = null;
	if (file_type === ".json") {
		json = JSON.parse(fs.readFileSync(input))
	} else if (file_type === ".js") {
		json = require(output)
	}
	
	let comp = []

	for (let x in json.compartments) {
		// If compartments key does not exist in json.compartments[x], then add it
		if (!Object.prototype.hasOwnProperty.call(json.compartments[x],"compartments")) {
			json.compartments[x].compartments = {}
		}
		comp.push([new comps.Idiom(json.compartments[x].equation), x])
	}
	return new Model(comp, json.key)
}

exports.Model = Model
exports.mexport = mexport
exports.mimport = mimport