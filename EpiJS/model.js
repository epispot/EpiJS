/**
 * @file EpiJS module for creating custom models, which are made of compartments.
 *
 * Import it with:
 * ```
 *    const comp = require('@quantalabs/epijs').model
 * ```
 */

/** Create a model. **/
class Model {

  /**
   * Create a custom compartment.
   * @param {Array} compartments Compartments in the model. Each should be a list, with the first value being the compartment, and the second being it's start value in the key.
   * @param {Object} key The key of values for any variable used in the equation. If you use any variable which represents the population of a compartment, add the starting value into the key.
   * @example
   *
   *      let susceptible = new Idiom("S-(B*S*I/p)");
   *      let infected = new Idiom("I+(B*S*I/p)-(u*I)");
   *      let recovered = new Idiom("R+(u*I)");
   *
   *      let key = {
   *        "S": 10000,
   *        "B": 0.3,
   *        "I": 100,
   *        "R": 0,
   *        "p": 10100,
   *        "u": 0.2
   *      };
   *
   *      let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)
   *
   */
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
   *      let infected = new Idiom("I+(B*S*I/p)-(u*I)");
   *      let recovered = new Idiom("R+(u*I)");
   *
   *      let key = {
   *        "S": 10000,
   *        "B": 0.3,
   *        "I": 100,
   *        "R": 0,
   *        "p": 10100,
   *        "u": 0.2
   *      };
   *
   *      let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)
   *
   *      model.get_data(100) // Get data for 100 days.
   */
   get_data (time) { // skipcq: JS-0045
     key = this.key

     for (var x = 0; x<time; x++) {
       var y; // skipcq: JS-0119
       for (y in this.compartments) {
         key[this.compartments[y][1]] = this.compartments[y][0].get_data(key)
       }
       if (x === time-1) {
         var return_val = {}
         for (y in this.compartments) {
           return_val[this.compartments[y][1]] = key[this.compartments[y][1]]
         }
         return return_val
       }
     }
   }
}

exports.Model = Model
