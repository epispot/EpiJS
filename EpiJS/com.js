/**
 * @file EpiJS module for representing communities
 *
 * Import it with:
 * ```
 *    const com = require('@epispot/epijs').com
 * ```
 */


const chart = require('chart.js')
const gaussian = require('gaussian')


/**
 * Class representing a virus, which can infect a community.
 * @param {Number} rnaught The disease's R-Naught
 * @param {Number} u The disease's recovery rate
 * @param {Number} a The disease's incubation period
 * @param {Number} d The disease's death rate (for infected population)
 * @example
 *
 *      let covid = new Virus(5.7, 2.1/100)
 */
class Virus {
    constructor (rnaught, u, a=0, d=0) {
        this.rnaught = rnaught
        this.u = u
        this.a = a
        this.d = d
    }

}

/**
 * Class representing a community, which can be infected with a disease, and compared to other communities.
 * @param {Number} pop The population of the community
 * @param {Number} i The start infected population of the community.
 * @param {Number} s The start susceptible population of the community
 * @example
 *
 *      let NewYorkCity = new Community(8419000, 300, 8418700)
 */
class Community {
    constructor (pop, i, s) {
        this.pop = pop
        this.i = i
        this.s = s
        this.r = pop-(i+s)
    }

    /**
     * SIR model for the community
     * @param {Number} disease A virus class. The virus to infect the community with and model for.
     * @param {Number} time Time to predict for.
     * @param {Boolean} stochastic - Whether to make the model stochastic or not.
     * @example
     *
     *      let NewYorkCity = new Community(8419000, 300, 8418700)
     *let covid = new Virus(5.7, 2.1/100, 1/8, 1/100)
     *
     *outbreak = NewYorkCity.sir(covid, 100, false)
     */
    sir (disease, time, stochastic) {
        let data = {
            datasets: [{
                data: [this.s],
                label: "Suseptible",
            },
            {
                data: [this.i],
                label: "Infected",
            },
            {
                data: [this.r],
                label: "Recovered",
            }]
        }
        var f1 = 0;
        var f2 = 0;
    
        for(let x = 0; x<time; x++){
            f1 = Math.sqrt((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop)
            f2 = Math.sqrt(disease.u*data.datasets[1].data[x])
    
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

            data.datasets[0].data.push(data.datasets[0].data[x]-(((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop)+f1*omega1))
            data.datasets[1].data.push(data.datasets[1].data[x]+(((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop)+f1*omega1)-((disease.u*data.datasets[1].data[x])+f2*omega2))
            data.datasets[2].data.push(data.datasets[2].data[x]+(disease.u*data.datasets[1].data[x]+f2*omega2))

            // Check if any of the new values are below 0, if so, set them to 0
            for(let i = 0; i<data.datasets.length; i++){
                if(data.datasets[i].data[x+1] < 0){
                    data.datasets[i].data[x+1] = 0
                }
            }
        }

        return data
    }

    /**
     * SEIR model for the community
     * @param {Number} disease A virus class. The virus to infect the community with and model for.
     * @param {Number} time Time to predict for.
     * @param {Boolean} stochastic - Whether to make the model stochastic or not.
     * @example
     *
     *      let NewYorkCity = new Community(8419000, 300, 8418700)
     *let covid = new Virus(5.7, 2.1/100, 1/8, 1/100)
     *
     *outbreak = NewYorkCity.seir(covid, 100, false)
     */
     seir (disease, time, stochastic) {
        let data = {
            datasets: [{
                data: [this.s],
                label: "Suseptible",
            },
            {
                data: [this.i],
                label: "Exposed",
            },
            {
                data: [0],
                label: "Infected",
            },
            {
                data: [this.r],
                label: "Recovered",
            }]
        }
        var f1 = 0;
        var f2 = 0;
        var f3 = 0;

        for(let x = 0; x<time; x++){
            f1 = Math.sqrt((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop)
            f2 = Math.sqrt(disease.u*data.datasets[2].data[x])
            f3 = Math.sqrt(disease.a*data.datasets[1].data[x])

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
            data.datasets[0].data.push(data.datasets[0].data[x]-(((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop)+f1*omega1))
            data.datasets[1].data.push(data.datasets[1].data[x]+(((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop)+f1*omega1)-((disease.a*data.datasets[1].data[x]+f3*omega3)))
            data.datasets[2].data.push(data.datasets[2].data[x]+((disease.a*data.datasets[1].data[x])+f3*omega3)-(disease.u*data.datasets[2].data[x]+f2*omega2))
            data.datasets[3].data.push(data.datasets[3].data[x]+((disease.u*data.datasets[2].data[x])+f2*omega2))

            // Check if any of the new values are below 0, if so, set them to 0
            for(let i = 0; i<data.datasets.length; i++){
                if(data.datasets[i].data[x+1] < 0){
                    data.datasets[i].data[x+1] = 0
                }
            }
        }

        return data
    }

    /**
     * SEIRD model for the community
     * @param {Number} disease A virus class. The virus to infect the community with and model for.
     * @param {Number} time Time to predict for.
     * @param {Boolean} stochastic - Whether to make the model stochastic or not.
     * @example
     *
     *      let NewYorkCity = new Community(8419000, 300, 8418700)
     *let covid = new Virus(5.7, 2.1/100, 1/8, 1/100)
     *
     *outbreak = NewYorkCity.seird(covid, 100, false)
     */
    seird (disease, time, stochastic) {
        let data = {
            datasets: [{
                data: [this.s],
                label: "Suseptible",
            },
            {
                data: [this.i],
                label: "Exposed",
            },
            {
                data: [0],
                label: "Infected",
            },
            {
                data: [this.r],
                label: "Recovered",
            },
            {
                data: [0],
                label: "Dead",
            }]
        }
        var f1 = 0;
        var f2 = 0;
        var f3 = 0;
        var f4 = 0;

        for(let x = 0; x<time; x++){
            f1 = Math.sqrt((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop) // Rn * U * S * I / N
            f2 = Math.sqrt(disease.u*data.datasets[2].data[x]) // u*I
            f3 = Math.sqrt(disease.a*data.datasets[1].data[x]) // a*I
            f4 = Math.sqrt(disease.d*data.datasets[2].data[x]) // d*I

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
            data.datasets[0].data.push(data.datasets[0].data[x]-(((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop)+f1*omega1))
            data.datasets[1].data.push(data.datasets[1].data[x]+(((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop)+f1*omega1)-((disease.a*data.datasets[1].data[x])+f3*omega3))
            data.datasets[2].data.push(data.datasets[2].data[x]+((disease.a*data.datasets[1].data[x])+f3*omega3)-(disease.u*data.datasets[2].data[x]+f2*omega2)-(disease.d*data.datasets[2].data[x]+f4*omega4))
            data.datasets[3].data.push(data.datasets[3].data[x]+(disease.u*data.datasets[2].data[x]+f2*omega2))
            data.datasets[4].data.push(data.datasets[4].data[x]+((disease.d*data.datasets[2].data[x])+f4*omega4))

            // Check if any of the new values are below 0, if so, set them to 0
            for(let i = 0; i<data.datasets.length; i++){
                if(data.datasets[i].data[x+1] < 0){
                    data.datasets[i].data[x+1] = 0
                }
            }
        }

        return data
    }

    /** 
     * Custom model for the community
     * @param {Array} compartments The compartments for the model. Pass in as an array with sub arrays of the form [compartment, name in key].
     *Note that the 'name in key' is a string with the same value that is stored in your extra key, otherwise it should be the same name that we store it as. 
     You can find these names below.
     *         
     *- Susceptible - stored as 'S'
     *- Infected - stored as 'I'
     *- Recovered - stored as 'R'
     *
     * 
     * Make sure that you use the same names that are stored in the key in the equations for the compartments. These values are found from parameters passed into the virus class and the community class.
     * 
     * @param {Number} time The time to predict for.
     * @param virus The virus class to infect the community with.
     * @param {Object} extrakey Optional, any extra parameters for the compartments equations. 
     *We already have the following parameters:
     *- Population - stored as 'p' in our key.
     *- Susceptible Population - stored as 'S' in our key.
     *- R-naught - stored as 'rn' in our key.
     *- Recovery rate - stored as 'u' in our key.
     *- Recovered - stored as 'R' in our key.
     *- Infected - stored as 'I' in our key.
     *- Death Rate - stored as 'd' in our key.
     *- Incubation Period - stored as 'a' in our key.
     * 
     * @example
     * 
     *     let susceptible = new Idiom("S-(B*S*I/p)");
     *let infected = new Idiom("I+(B*S*I/p)-(u*I)");
     *let recovered = new Idiom("R+(u*I)");
     * 
     *let NewYorkCity = new Community(8419000, 300, 8418700)
     *let covid = new Virus(5.7, 2.1/100, 1/8, 1/100)
     * 
     *outbreak = NewYorkCity.custom([[susceptible, 'S'], [infected, 'I'], [recovered, 'R']], 100, covid, {B: covid.rnaught*covid.u})
     */
    custom(compartments, time, virus, extrakey={}) {
        let key = Object.assign({
            S: this.s,
            I: this.i,
            R: this.r,
            rn: virus.rnaught,
            u: virus.u,
            a: virus.a,
            d: virus.d,
            p: this.pop,
        }, extrakey)
        
        let newkey = Object.assign({
            S: this.s,
            I: this.i,
            R: this.r,
            rn: virus.rnaught,
            u: virus.u,
            a: virus.a,
            d: virus.d,
            p: this.pop,
        }, extrakey)

        let data = {
            datasets: []
        }

        // Add the compartments to data.datasets
        for (let x = 0; x < compartments.length; x++) {
            data.datasets.push({
                data: [],
                label: compartments[x][1]
            })
        }

        // Push compartments[x][0].get_data(y) for y in range(time)
        for (let y = 0; y < time; y++) {
            for (let x = 0; x < compartments.length; x++) {
                data.datasets[x].data.push(compartments[x][0].get_data(key))
                newkey[compartments[x][1]] = compartments[x][0].get_data(key)
            }
            key = newkey
        }
        
        return data
    }
}

/**
 * Compare's two different outbreaks, communities, or anything else.
 * @param {HTMLCanvasElement} c The canvas element
 * @param {Function} model1 The first model to compare.
 * @param {Function} model2 The second model to compare.
 * @param {String} m1name The name of the first model
 * @param {String} m2name The name of the second model
 * @param {Number} days The total amount of days to compare for.
 * @example
 *
 *      let NewYorkCity = new Community(8419000, 300, 8418700)
 *let covid = new Virus(5.7, 2.1/100)
 *let covid_variant = new Virus(5, 4/100)
 *
 *let chart = document.getElementById('model')
 *
 *covid_outbreak = NewYorkCity.sir(covid, 100)
 *variant_outbreak = NewYorkCity.sir(covid_variant, 100)
 *
 *compare(chart, covid_outbreak, variant_outbreak, "COVID-19", "COVID-19 Variant", 100) // We chose 100 as the amount of days, but it could be 50 or 25, not the lenght of the prediction that was in the model.
 *
 */
 function compare(c, model1, model2, m1name, m2name, days) {
    let data = {
        labels: [],
        datasets: []
    }

    let m1len = model1.datasets.length
    let m2len = model2.datasets.length

    for (var x = 0; x < days; x++) {
        data.labels.push("Day "+(x+1).toString())
    }
    for (var y = 0; y < m1len; y++) {
        data.datasets[y] = {}
        data.datasets[y].data = model1.datasets[y].data
        data.datasets[y].label = model1.datasets[y].label+" ("+m1name+")"
        data.datasets[y].borderColor = "#"+Math.floor(Math.random()*16777215).toString(16)
    }
    for (var z = m1len; z < m2len+m1len; z++) {
        data.datasets[z] = {}
        data.datasets[z].data = model2.datasets[z-m1len].data
        data.datasets[z].label = model2.datasets[z-m1len].label+" ("+m2name+")"
        data.datasets[z].borderColor = "#"+Math.floor(Math.random()*16777215).toString(16)
    }

    let compareChart = new Chart(c, {
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

exports.Community = Community
exports.compare = compare
exports.Virus = Virus
