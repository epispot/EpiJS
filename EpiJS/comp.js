/**
 * @file EpiJS module for creating compartments, which can be combined into models.
 *
 * Import it with:
 * ```
 *    const comp = require('@epispot/epijs').comp
 * ```
 */

const math = require('mathjs')
const gaussian = require('gaussian')

/**
 * Class for a custom compartments.
 * @param {String} equation The equation for the compartment. This defines what to run to get a new value for the next day in the model. Use any variable in the equation (1 char max), but when making this a model, you need to define this in the key.
 *      If using other compartment classes, they each have their own corresponding variable:
 * <br>
 * - 'S' - Susceptible <br>
 * - 'E' - Exposed <br>
 * - 'I' - Infectious <br>
 * - 'R' - Recovered <br>
 * - 'D' - Dead <br>
 * - 'C' - Critical <br>
 * - 'H' - Hospitalized <br>
 * - 'V' - Vaccinated <br>
 * - 'w' - Reserved for stochastic models. If put, it will be replaced with a random number generated from the gaussian distribution.
 * 
 * @example
 *
 *      let susceptible = new Idiom("S-(B*S*I)")
 * 
 */
class Idiom {
  constructor (equation) {
    this.compartments = {}
		this.equation = equation
    this.compartments = {}
  }

  get_data (key) {
    let parsed = this.equation.split('')

    let x = 0;
    while (x<parsed.length) {
      if (parsed[x] === " ") {
        parsed.splice(x, 1)
      }
      x++
    }

    let y; // skipcq: JS-0119
    let value; // skicq: JS-0119
    for (y in parsed) {
      if (parsed[y] in key) {
        // If key[parsed[y]] is a function, run it, add pass in the current iteration.
        if (typeof key[parsed[y]] === "function") {
          value = key[parsed[y]](key["time"])
        }
        else {
          value = key[parsed[y]]
        }

        parsed.splice(y, 1, value)
      }
      else if (parsed[y] === "w") {
        let distribution = new gaussian(0, 1)
        parsed.splice(y, 1, distribution.random(1)[0])
      }
    }
    let out = math.evaluate(parsed.join(''))

    // Round up to 0 if below 0 for out
		/* istanbul ignore if */
		/* istanbul ignore if */
    if (out < 0) {
      out = 0
    }
    
    return out
  }

  /**
   * Add a subcompartment to this compartment.
   * @param {String} name Name of sub-compartment.
   * @param {Number} percentage Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment.
   * @example
   * 
   * let infected = new Idiom("I+((B*S*I)/p)")
   * 
   * infected.addSub("Asymptomatic", 10) // 10% of the infected population are asymptomatic.
   */
  addSub (name, percentage) {
    this.compartments[name] = {
      "percent": percentage,
    }
  }

  getSubData (name, key) {
    let population = this.get_data(key)

    let sub = this.compartments[name]
    let sub_population = population * sub.percent/100

    return sub_population
  }
}

/** 
 * Class for Suscepible compartment.
 * @param {Array} next List of rates of the next compartments This is multiplied by the current susceptible population.
 * @param {Array} prev List of rates of the previous compartments, which include sub-arrays
 *       with the compartment id (one letter only), as a string, and the rate for the compartment.
 *       If reffering to this compartment's population, use "S" as the id. This parameter is useful
 *       if you want to model a disease with re-susceptibility.
 * @param {Boolean} stochastic If true, the compartment will be stochastic. You can still pass in your normal equation, and epijs will
 *       auto generate the equations from what you pass in. 
 * @example
 * 
 *      // Note that you can pass in a number as a rate too, 
 *      // but we use a string because we want to multiply 
 *      // by other compartment populations. This applies to the prev parameter too. 
 *      let S = new Susceptible(["I*0.4/N"], [], true) 
*/
class Susceptible {
  constructor (next, prev, stochastic) {
    this.compartments = {}
		this.equation = "S"
    
    for (let x in next) {
      if (stochastic === true) {
        this.equation += "-((S*" + String(next[x]) + ")+sqrt(S*"+String(next[x])+"))*w"
      } else {
        this.equation += "-(S*" + String(next[x]) + ")"
      }
    }

    for (let y in prev) {
      if (stochastic === true) {
        this.equation += "+(("+String(prev[y][0])+"*" + String(prev[y][1])+")+sqrt("+String(prev[y][0])+"*" + String(prev[y][1])+"))*w"
      } else {
        this.equation += "+("+String(prev[y][0])+"*" + String(prev[y][1])+")"
      }
    }
  }

  get_data (key) {
    let parsed = this.equation.split('')

    let x = 0;
    while (x<parsed.length) {
      if (parsed[x] === " ") {
        parsed.splice(x, 1)
      }
      x++
    }

    let y; // skipcq: JS-0119
    let value; // skicq: JS-0119
    for (y in parsed) {
      if (parsed[y] in key) {
        // If key[parsed[y]] is a function, run it, add pass in the current iteration.
        if (typeof key[parsed[y]] === "function") {
          value = key[parsed[y]](key["time"])
        }
        else {
          value = key[parsed[y]]
        }

        parsed.splice(y, 1, value)
      }
      else if (parsed[y] === "w") {
        let distribution = new gaussian(0, 1)
        parsed.splice(y, 1, distribution.random(1)[0])
      }
    }

    let out = math.evaluate(parsed.join(''))

    // Round up to 0 if below 0 for out
		/* istanbul ignore if */
    if (out < 0) {
      out = 0
    }
    
    return out
  }

  /**
   * Add a subcompartment to this compartment.
   * @param {String} name Name of sub-compartment.
   * @param {Number} percentage Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment.
   */
  addSub (name, percentage) {
    this.compartments[name] = {
      "percent": percentage,
    }
  }

  getSubData (name, key) {
    let population = this.get_data(key)

    let sub = this.compartments[name]
    let sub_population = population * sub.percent/100

    return sub_population
  }
}

/** 
 * Class for Infected compartment.
 * @param {Array} next List of rates of the next compartments This is multiplied by the current infected population.
 * @param {Array} prev List of rates of the previous compartments, which include sub-arrays
 *       with the compartment id (one letter only), as a string, and the rate for the compartment.
 *       If reffering to this compartment's population, use "I" as the id.
 * @param {Boolean} stochastic If true, the compartment will be stochastic. 
 * @example
 * 
 *      // Note that you can pass in a string as a rate too, 
 *      // but we use a number in this case because we don't need to multiply 
 *      // by other compartment populations. We do actually do this for the prev parameter, though.
 *      let I = new Infected([0.3], [["S", "I*0.4/N"]], false) 
*/
class Infected {
  constructor (next, prev, stochastic) {
    this.compartments = {}
		this.equation = "I"
    
    for (let x in next) {
      if (stochastic === true) {
        this.equation += "-((I*" + String(next[x]) + ")+sqrt(I*"+String(next[x])+")*w)"
      } else {
        this.equation += "-(I*" + String(next[x]) + ")"
      }
    }

    for (let y in prev) {
      if (stochastic === true) {
        this.equation += "+(("+String(prev[y][0])+"*" + String(prev[y][1])+")+sqrt("+String(prev[y][0])+"*" + String(prev[y][1])+"))*w"
      } else {
        this.equation += "+("+String(prev[y][0])+"*" + String(prev[y][1])+")"
      }
    }
  }

  get_data (key) {
    let parsed = this.equation.split('')

    let x = 0;
    while (x<parsed.length) {
      if (parsed[x] === " ") {
        parsed.splice(x, 1)
      }
      x++
    }

    let y; // skipcq: JS-0119
    let value; // skicq: JS-0119
    for (y in parsed) {
      if (parsed[y] in key) {
        // If key[parsed[y]] is a function, run it, add pass in the current iteration.
        if (typeof key[parsed[y]] === "function") {
          value = key[parsed[y]](key["time"])
        }
        else {
          value = key[parsed[y]]
        }

        parsed.splice(y, 1, value)
      }
      else if (parsed[y] === "w") {
        let distribution = new gaussian(0, 1)
        parsed.splice(y, 1, distribution.random(1)[0])
      }
    }

    let out = math.evaluate(parsed.join(''))

    // Round up to 0 if below 0 for out
		/* istanbul ignore if */
    if (out < 0) {
      out = 0
    }
    
    return out
  }

  /**
   * Add a subcompartment to this compartment.
   * @param {String} name Name of sub-compartment.
   * @param {Number} percentage Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment.
   */
  addSub (name, percentage) {
    this.compartments[name] = {
      "percent": percentage,
    }
  }

  getSubData (name, key) {
    let population = this.get_data(key)

    let sub = this.compartments[name]
    let sub_population = population * sub.percent/100

    return sub_population
  }
}

/** 
 * Class for Exposed compartment.
 * @param {Array} next List of rates of the next compartments This is multiplied by the current exposed population.
 * @param {Array} prev List of rates of the previous compartments, which include sub-arrays
 *       with the compartment id (one letter only), as a string, and the rate for the compartment.
 *       If reffering to this compartment's population, use "E" as the id.
 * @param {Boolean} stochastic If true, the compartment will be stochastic. 
 * @example
 * 
 *      // Note that you can pass in a string as a rate too, 
 *      // but we use a number in this case because we don't need to multiply 
 *      // by other compartment populations. We do actually do this for the prev parameter, though.
 *      let E = new Exposed([1/14], ["S*0.4/N"], false) 
*/
class Exposed {
  constructor (next, prev, stochastic) {
    this.compartments = {}
		this.equation = "E"
    
    for (let x in next) {
      if (stochastic === true) {
        this.equation += "-((E*" + String(next[x]) + ")+sqrt(E*"+String(next[x])+")*w)"
      } else {
        this.equation += "-(E*" + String(next[x]) + ")"
      }
    }

    for (let y in prev) {
      if (stochastic === true) {
        this.equation += "+(("+String(prev[y][0])+"*" + String(prev[y][1])+")+sqrt("+String(prev[y][0])+"*" + String(prev[y][1])+"))*w"
      } else {
        this.equation += "+("+String(prev[y][0])+"*" + String(prev[y][1])+")"
      }
    }
  }

  get_data (key) {
    let parsed = this.equation.split('')

    let x = 0;
    while (x<parsed.length) {
      if (parsed[x] === " ") {
        parsed.splice(x, 1)
      }
      x++
    }

    let y; // skipcq: JS-0119
    let value; // skicq: JS-0119
    for (y in parsed) {
      if (parsed[y] in key) {
        // If key[parsed[y]] is a function, run it, add pass in the current iteration.
        if (typeof key[parsed[y]] === "function") {
          value = key[parsed[y]](key["time"])
        }
        else {
          value = key[parsed[y]]
        }

        parsed.splice(y, 1, value)
      }
      else if (parsed[y] === "w") {
        let distribution = new gaussian(0, 1)
        parsed.splice(y, 1, distribution.random(1)[0])
      }
    }
    let out = math.evaluate(parsed.join(''))

    // Round up to 0 if below 0 for out
		/* istanbul ignore if */
    if (out < 0) {
      out = 0
    }
    
    return out
  }

  /**
   * Add a subcompartment to this compartment.
   * @param {String} name Name of sub-compartment.
   * @param {Number} percentage Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment.
   */
  addSub (name, percentage) {
    this.compartments[name] = {
      "percent": percentage,
    }
  }

  getSubData (name, key) {
    let population = this.get_data(key)

    let sub = this.compartments[name]
    let sub_population = population * sub.percent/100

    return sub_population
  }
}

/** 
 * Class for Critical compartment.
 * @param {Array} next List of rates of the next compartments This is multiplied by the current critical population.
 * @param {Array} prev List of rates of the previous compartments, which include sub-arrays
 *       with the compartment id (one letter only), as a string, and the rate for the compartment.
 *       If reffering to this compartment's population, use "C" as the id.
 * @param {Boolean} stochastic If true, the compartment will be stochastic. 
 * @example
 * 
 *      // Note that you can pass in a string as a rate too, 
 *      // but we use a number in this case because we don't need to multiply 
 *      // by other compartment populations.
 *      let C = new Critical([0.14, 0.1], [["H", 0.3]], false) 
*/
class Critical {
  constructor (next, prev, stochastic) {
    this.compartments = {}
		this.equation = "C"
    
    for (let x in next) {
      if (stochastic === true) {
        this.equation += "-((C*" + String(next[x]) + ")+sqrt(C*"+String(next[x])+")*w)"
      } else {
        this.equation += "-(C*" + String(next[x]) + ")"
      }
    }

    for (let y in prev) {
      if (stochastic === true) {
        this.equation += "+(("+String(prev[y][0])+"*" + String(prev[y][1])+")+sqrt("+String(prev[y][0])+"*" + String(prev[y][1])+"))*w"
      } else {
        this.equation += "+("+String(prev[y][0])+"*" + String(prev[y][1])+")"
      }
    }
  }

  get_data (key) {
    let parsed = this.equation.split('')

    let x = 0;
    while (x<parsed.length) {
      if (parsed[x] === " ") {
        parsed.splice(x, 1)
      }
      x++
    }

    let y; // skipcq: JS-0119
    let value; // skicq: JS-0119
    for (y in parsed) {
      if (parsed[y] in key) {
        // If key[parsed[y]] is a function, run it, add pass in the current iteration.
        if (typeof key[parsed[y]] === "function") {
          value = key[parsed[y]](key["time"])
        }
        else {
          value = key[parsed[y]]
        }

        parsed.splice(y, 1, value)
      }
      else if (parsed[y] === "w") {
        let distribution = new gaussian(0, 1)
        parsed.splice(y, 1, distribution.random(1)[0])
      }
    }
    let out = math.evaluate(parsed.join(''))

    // Round up to 0 if below 0 for out
		/* istanbul ignore if */
    if (out < 0) {
      out = 0
    }
    
    return out
  }

  /**
   * Add a subcompartment to this compartment.
   * @param {String} name Name of sub-compartment.
   * @param {Number} percentage Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment.
   */
  addSub (name, percentage) {
    this.compartments[name] = {
      "percent": percentage,
    }
  }

  getSubData (name, key) {
    let population = this.get_data(key)

    let sub = this.compartments[name]
    let sub_population = population * sub.percent/100

    return sub_population
  }
}

/** 
 * Class for Hospitalized compartment.
 * @param {Array} next List of rates of the next compartments This is multiplied by the current hospitalized population.
 * @param {Array} prev List of rates of the previous compartments, which include sub-arrays
 *       with the compartment id (one letter only), as a string, and the rate for the compartment.
 *       If reffering to this compartment's population, use "H" as the id.
 * @param {Boolean} stochastic If true, the compartment will be stochastic. 
 * @example
 * 
 *      // Note that you can pass in a string as a rate too, 
 *      // but we use a number in this case because we don't need to multiply 
 *      // by other compartment populations.
 *      let H = new Hospitalized([0.3], [["I", 0.1], ["E", 0.2]], false)
*/
class Hospitalized {
  constructor (next, prev, stochastic) {
    this.compartments = {}
		this.equation = "H"
    
    for (let x in next) {
      if (stochastic === true) {
        this.equation += "-((H*" + String(next[x]) + ")+sqrt(H*"+String(next[x])+")*w)"
      } else {
        this.equation += "-(H*" + String(next[x]) + ")"
      }
    }

    for (let y in prev) {
      if (stochastic === true) {
        this.equation += "+(("+String(prev[y][0])+"*" + String(prev[y][1])+")+sqrt("+String(prev[y][0])+"*" + String(prev[y][1])+"))*w"
      } else {
        this.equation += "+("+String(prev[y][0])+"*" + String(prev[y][1])+")"
      }
    }
  }

  get_data (key) {
    let parsed = this.equation.split('')

    let x = 0;
    while (x<parsed.length) {
      if (parsed[x] === " ") {
        parsed.splice(x, 1)
      }
      x++
    }

    let y; // skipcq: JS-0119
    let value; // skicq: JS-0119
    for (y in parsed) {
      if (parsed[y] in key) {
        // If key[parsed[y]] is a function, run it, add pass in the current iteration.
        if (typeof key[parsed[y]] === "function") {
          value = key[parsed[y]](key["time"])
        }
        else {
          value = key[parsed[y]]
        }

        parsed.splice(y, 1, value)
      }
      else if (parsed[y] === "w") {
        let distribution = new gaussian(0, 1)
        parsed.splice(y, 1, distribution.random(1)[0])
      }
    }
    let out = math.evaluate(parsed.join(''))

    // Round up to 0 if below 0 for out
		/* istanbul ignore if */
    if (out < 0) {
      out = 0
    }
    
    return out
  }

  /**
   * Add a subcompartment to this compartment.
   * @param {String} name Name of sub-compartment.
   * @param {Number} percentage Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment.
   */
  addSub (name, percentage) {
    this.compartments[name] = {
      "percent": percentage,
    }
  }

  getSubData (name, key) {
    let population = this.get_data(key)

    let sub = this.compartments[name]
    let sub_population = population * sub.percent/100

    return sub_population
  }
}

/** 
 * Class for the Dead compartment.
 * @param {Array} next List of rates of the next compartments. This is multiplied by the current dead population.
 *       Useful if you want to have a dead population that can also be the walking dead.
 * @param {Array} prev List of rates of the previous compartments, which include sub-arrays
 *       with the compartment id (one letter only), as a string, and the rate for the compartment.
 *       If reffering to this compartment's population, use "D" as the id.
 * @param {Boolean} stochastic If true, the compartment will be stochastic. 
 * @example
 * 
 *      // Note that you can pass in a string as a rate too, 
 *      // but we use a number in this case because we don't need to multiply 
 *      // by other compartment populations. We do actually do this for the prev parameter, though.
 *      let D = new Dead([0.3], [["I", 0.3]], false) // This disease also gives you a 3/10 chance to come alive after death.
*/
class Dead {
  constructor (next, prev, stochastic) {
    this.compartments = {}
		this.equation = "D"
    
    for (let x in next) {
      if (stochastic === true) {
        this.equation += "-((D*" + String(next[x]) + ")+sqrt(D*"+String(next[x])+")*w)"
      } else {
        this.equation += "-(D*" + String(next[x]) + ")"
      }
    }

    for (let y in prev) {
      if (stochastic === true) {
        this.equation += "+(("+String(prev[y][0])+"*" + String(prev[y][1])+")+sqrt("+String(prev[y][0])+"*" + String(prev[y][1])+"))*w"
      } else {
        this.equation += "+("+String(prev[y][0])+"*" + String(prev[y][1])+")"
      }
    }
  }

  get_data (key) {
    let parsed = this.equation.split('')

    let x = 0;
    while (x<parsed.length) {
      if (parsed[x] === " ") {
        parsed.splice(x, 1)
      }
      x++
    }

    let y; // skipcq: JS-0119
    let value; // skicq: JS-0119
    for (y in parsed) {
      if (parsed[y] in key) {
        // If key[parsed[y]] is a function, run it, add pass in the current iteration.
        if (typeof key[parsed[y]] === "function") {
          value = key[parsed[y]](key["time"])
        }
        else {
          value = key[parsed[y]]
        }

        parsed.splice(y, 1, value)
      }
      else if (parsed[y] === "w") {
        let distribution = new gaussian(0, 1)
        parsed.splice(y, 1, distribution.random(1)[0])
      }
    }
    let out = math.evaluate(parsed.join(''))

    // Round up to 0 if below 0 for out
		/* istanbul ignore if */
    if (out < 0) {
      out = 0
    }
    
    return out
  }

  /**
   * Add a subcompartment to this compartment.
   * @param {String} name Name of sub-compartment.
   * @param {Number} percentage Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment.
   */
  addSub (name, percentage) {
    this.compartments[name] = {
      "percent": percentage,
    }
  }

  getSubData (name, key) {
    let population = this.get_data(key)

    let sub = this.compartments[name]
    let sub_population = population * sub.percent/100

    return sub_population
  }
}

/** 
 * Class for Vaccinated compartment.
 * @param {Array} next List of rates of the next compartments, good if the vaccine isn't 100% effective. This is multiplied by the current vaccinated population.
 * @param {Array} prev List of rates of the previous compartments, which include sub-arrays
 *       with the compartment id (one letter only), as a string, and the rate for the compartment.
 *       If reffering to this compartment's population, use "V" as the id.
 * @param {Boolean} stochastic If true, the compartment will be stochastic. 
 * @example
 * 
 *      // Note that you can pass in a string as a rate too, 
 *      // but we use a number in this case because we don't need to multiply 
 *      // by other compartment populations. We do actually do this for the prev parameter, though.
 *      let V = new Vaccinated([0.001], ["S*0.4"], false)
*/
class Vaccinated {
  constructor (next, prev, stochastic) {
    this.compartments = {}
		this.equation = "V"
    
    for (let x in next) {
      if (stochastic === true) {
        this.equation += "-((V*" + String(next[x]) + ")+sqrt(V*"+String(next[x])+")*w)"
      } else {
        this.equation += "-(V*" + String(next[x]) + ")"
      }
    }

    for (let y in prev) {
      if (stochastic === true) {
        this.equation += "+(("+String(prev[y][0])+"*" + String(prev[y][1])+")+sqrt("+String(prev[y][0])+"*" + String(prev[y][1])+"))*w"
      } else {
        this.equation += "+("+String(prev[y][0])+"*" + String(prev[y][1])+")"
      }
    }
  }

  get_data (key) {
    let parsed = this.equation.split('')

    let x = 0;
    while (x<parsed.length) {
      if (parsed[x] === " ") {
        parsed.splice(x, 1)
      }
      x++
    }

    let y; // skipcq: JS-0119
    let value; // skicq: JS-0119
    for (y in parsed) {
      if (parsed[y] in key) {
        // If key[parsed[y]] is a function, run it, add pass in the current iteration.
        if (typeof key[parsed[y]] === "function") {
          value = key[parsed[y]](key["time"])
        }
        else {
          value = key[parsed[y]]
        }

        parsed.splice(y, 1, value)
      }
      else if (parsed[y] === "w") {
        let distribution = new gaussian(0, 1)
        parsed.splice(y, 1, distribution.random(1)[0])
      }
    }
    let out = math.evaluate(parsed.join(''))

    // Round up to 0 if below 0 for out
		/* istanbul ignore if */
    if (out < 0) {
      out = 0
    }
    
    return out
  }

  /**
   * Add a subcompartment to this compartment.
   * @param {String} name Name of sub-compartment.
   * @param {Number} percentage Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment.
   */
  addSub (name, percentage) {
    this.compartments[name] = {
      "percent": percentage,
    }
  }

  getSubData (name, key) {
    let population = this.get_data(key)

    let sub = this.compartments[name]
    let sub_population = population * sub.percent/100

    return sub_population
  }
}

/** 
 * Class for Recovered compartment.
 * @param {Array} next List of rates of the next compartments, good if the vaccine isn't 100% effective. This is multiplied by the current vaccinated population.
 * @param {Array} prev List of rates of the previous compartments, which include sub-arrays
 *       with the compartment id (one letter only), as a string, and the rate for the compartment.
 *       If reffering to this compartment's population, use "V" as the id.
 * @param {Boolean} stochastic If true, the compartment will be stochastic. 
 * @example
 * 
 *      // Note that you can pass in a string as a rate too, 
 *      // but we use a number in this case because we don't need to multiply 
 *      // by other compartment populations. We do actually do this for the prev parameter, though.
 *      let R = new Recovered([ ], [["I", 0.1]], false)
*/
class Recovered {
  constructor (next, prev, stochastic) {
    this.compartments = {}
		this.equation = "R"
    
    for (let x in next) {
      if (stochastic === true) {
        this.equation += "-((R*" + String(next[x]) + ")+sqrt(R*"+String(next[x])+")*w)"
      } else {
        this.equation += "-(R*" + String(next[x]) + ")"
      }
    }

    for (let y in prev) {
      if (stochastic === true) {
        this.equation += "+(("+String(prev[y][0])+"*" + String(prev[y][1])+")+sqrt("+String(prev[y][0])+"*" + String(prev[y][1])+"))*w"
      } else {
        this.equation += "+("+String(prev[y][0])+"*" + String(prev[y][1])+")"
      }
    }
  }

  get_data (key) {
    let parsed = this.equation.split('')

    let x = 0;
    while (x<parsed.length) {
      if (parsed[x] === " ") {
        parsed.splice(x, 1)
      }
      x++
    }

    let y; // skipcq: JS-0119
    let value; // skicq: JS-0119
    for (y in parsed) {
      if (parsed[y] in key) {
        // If key[parsed[y]] is a function, run it, add pass in the current iteration.
        if (typeof key[parsed[y]] === "function") {
          value = key[parsed[y]](key["time"])
        }
        else {
          value = key[parsed[y]]
        }

        parsed.splice(y, 1, value)
      }
      else if (parsed[y] === "w") {
        let distribution = new gaussian(0, 1)
        parsed.splice(y, 1, distribution.random(1)[0])
      }
    }
    let out = math.evaluate(parsed.join(''))

    // Round up to 0 if below 0 for out
		/* istanbul ignore if */
    if (out < 0) {
      out = 0
    }
    
    return out
  }

  /**
   * Add a subcompartment to this compartment.
   * @param {String} name Name of sub-compartment.
   * @param {Number} percentage Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment.
   */
  addSub (name, percentage) {
    this.compartments[name] = {
      "percent": percentage,
    }
  }

  getSubData (name, key) {
    let population = this.get_data(key)

    let sub = this.compartments[name]
    let sub_population = population * sub.percent/100

    return sub_population
  }
}

exports.Idiom = Idiom;
exports.Susceptible = Susceptible;
exports.Exposed = Exposed;
exports.Infected = Infected;
exports.Critical = Critical;
exports.Hospitalized = Hospitalized;
exports.Dead = Dead;
exports.Vaccinated = Vaccinated;
exports.Recovered = Recovered;