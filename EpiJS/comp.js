/**
 * @file EpiJS module for creating compartments, which can be combined into models.
 *
 * Import it with:
 * ```
 *    const comp = require('@quantalabs/epijs').comp
 * ```
 */

const math = require('mathjs')

/** Class for a custom compartments. **/
class Idiom {

  /**
   * Create a custom compartment.
   * @param {String} equation The equation for the compartment. This defines what to run to get a new value for the next day in the model. Use any variable in the equation (1 char max), but when making this a model, you need to define this in the key.
   * @example
   *
   *      let susceptible = new Idiom("S-(B*S*I)")
   */
  constructor (equation) {
    this.equation = equation
  }

  get_data (key) {
    var parsed = this.equation.split('')

    var x = 0;
    while (x<parsed.length) {
      if (parsed[x] === " ") {
        parsed.splice(x, 1)
      }
      x++
    }

    var y; // skipcq: JS-0119
    for (y in parsed) {
      if (parsed[y] in key) {
        parsed.splice(y, 1, key[parsed[y]])
      }
    }

    return math.evaluate(parsed.join(''))
  }
}

exports.Idiom = Idiom
