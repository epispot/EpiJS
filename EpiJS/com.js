/**
 * @file EpiJS module for representing communities
 *
 * Import it with:
 * ```
 *    const com = require('@quantalabs/epijs').com
 * ```
 */


const chart = require('chart.js')

/** Class representing a virus, which can infect a community. */
class Virus {

    /**
     * Create a virus
     * @param {Number} rnaught The disease's R-Naught
     * @param {Number} u The disease's recovery rate
     * @param {Number} h The disease's hospitalization rate
     * @param {Number} a The disease's incubation period
     * @param {Number} d The disease's death rate (for infected population)
     * @param {Number} dh The disease's death rate (for hospitalized population)
     * @example
     *
     *      let covid = new Virus(5.7, 2.1/100)
     */
    constructor (rnaught, u, h=0, a=0, d=0, dh=0) {
        this.rnaught = rnaught
        this.u = u
        this.h = h
        this.a = a
        this.d = d
        this.dh = dh
    }

}

/** Class representing a community, which can be infected with a disease, and compared to other communities. */
class Community {

    /**
     * Create a community.
     * @param {Number} pop The population of the community
     * @param {Number} i The start infected population of the community.
     * @param {Number} s The start susceptible population of the community
     * @example
     *
     *      let NewYorkCity = new Community(8419000, 300, 8418700)
     */
    constructor (pop, i, s) {
        this.pop = pop
        this.i = i
        this.s = s
        this.r = pop-(i+s)
    }

    /**
     *
     * @param {Number} disease A virus class. The virus to infect the community with and model for.
     * @param {Number} time Time to predict for.
     * @example
     *
     *      let NewYorkCity = new Community(8419000, 300, 8418700)
     *      let covid = new Virus(5.7, 2.1/100)
     *
     *      outbreak = NewYorkCity.sir(covid, 100)
     */
    sir (disease, time) {
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

        for(let x = 0; x<time; x++){
            data.datasets[0].data.push(data.datasets[0].data[x]-((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop))
            data.datasets[1].data.push(data.datasets[1].data[x]+((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop)-disease.u*data.datasets[1].data[x])
            data.datasets[2].data.push(data.datasets[2].data[x]+disease.u*data.datasets[1].data[x])
        }

        return data
    }

    /**
     *
     * @param {Number} disease A virus class. The virus to infect the community with and model for.
     * @param {Number} time Time to predict for.
     * @example
     *
     *      let NewYorkCity = new Community(8419000, 300, 8418700)
     *      let covid = new Virus(5.7, 2.1/100, a=1/8)
     *
     *      outbreak = NewYorkCity.sir(covid, 100)
     */
     seir (disease, time) {
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

        for(let x = 0; x<time; x++){
            data.datasets[0].data.push(data.datasets[0].data[x]-((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop))
            data.datasets[1].data.push(data.datasets[1].data[x]+((disease.rnaught*disease.u)*data.datasets[0].data[x]*data.datasets[1].data[x]/this.pop)-(disease.a*data.datasets[1].data[x]))
            data.datasets[2].data.push(data.datasets[1].data[x]+(disease.a*data.datasets[1].data[x])-disease.u*data.datasets[1].data[x])
            data.datasets[3].data.push(data.datasets[2].data[x]+disease.u*data.datasets[1].data[x])
        }

        return data
    }

    seird (disease, time) {

    }

    seihrd (disease, time) {

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
 *      let covid = new Virus(5.7, 2.1/100)
 *      let covid_variant = new Virus(5, 4/100)
 *
 *      let chart = document.getElementById('model')
 *
 *      covid_outbreak = NewYorkCity.sir(covid, 100)
 *      variant_outbreak = NewYorkCity.sir(covid_variant, 100)
 *
 *      compare(chart, covid_outbreak, variant_outbreak, "COVID-19", "COVID-19 Variant", 100) // We chose 100 as the amount of days, but it could be 50 or 25, not the lenght of the prediction that was in the model.
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
