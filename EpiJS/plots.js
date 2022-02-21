/**
 * @file Graphs plots from the pre module.
 * 
 * Import it with:
 * ```
 *    const plots = require('@epispot/epijs').plots
 * ```
 */

const http = require('http')

/**
 * Plots models from pre or model modules. If in Node, this will generate a localhost, otherwise it will plot it in the HTML div element provided.
 * @param {Object} model A model class from the pre or model modules.
 * @param {Number} time The number of days to plot.
 * @param {String} name The ID of the plot. If this is in HTML, it will be the ID of the div element for the graph.
 * @param {String} title The title of the graph.
 * @example
 * 
 * let susceptible = new Idiom("S-(B*S*I/p)");
 * let infected = new Idiom("I+(B*S*I/p)-(u*I)");
 * let recovered = new Idiom("R+(u*I)");
 * 
 * let key = {
 *     "S": 10000,
 *     "B": 0.3,
 *     "I": 100,
 *     "R": 0,
 *     "p": 10100,
 *     "u": 0.2
 * };
 *
 * let sirm = new Model([[susceptible2, "S"], [infected2, "I"], [recovered2, "R"]], key)
 * 
 * plot(sirout1, 100, "SIR", "SIR Model (Population vs. Time)")
 */
function plot(model, time, name, key, title='Cases vs. Time') {
    // Get model data for every day up to and including `time`
    let data = {
        xvals: [],
        yvals: {}
    }

    for (let x in model.compartments) {
        data.yvals[model.compartments[x][1]] = []
    }

    // For every day until `time`, get the data
    for (let x = 0; x < time; x++) {
        let current = model.get_data(x+1, key)

        // For every compartment, get the data
        for (let y in model.compartments) {
            // If the compartment data is an object, get .population
            if (typeof current[model.compartments[y][1]] === 'object') {
                data.yvals[model.compartments[y][1]].push(current[model.compartments[y][1]].population)
            } else {
                data.yvals[model.compartments[y][1]].push(current[model.compartments[y][1]])
            }
        }
        data.xvals.push(x+1)
    }

    // Create the plot
    let plotlyData = []
    for (let x in data.yvals) {
        plotlyData.push({
            x: data.xvals,
            y: data.yvals[x],
            name: x,
            mode: 'lines'
        })
    }
    /* istanbul ignore if */
    if (typeof process === 'object' && String(process) === '[object process]') { // Is running in NodeJS
        // Create http server
        let server = http.createServer((req, res) => {
            // Send the plot as HTML
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(`<!DOCTYPE html>
            <html>
            <head>
            <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
            </head>
            <body>
            <div id="plot"></div>
            <script>
            let data = ${JSON.stringify(plotlyData)}
            let layout = {
                title: '${title}',
                xaxis: {
                    title: 'Days'
                },
                yaxis: {
                    title: 'Cases'
                }
            }
            Plotly.newPlot('plot', data, layout)
            </script>
            </body>
            </html>`)
            res.end()
        })

        // Start the server
        server.listen(8080)
        console.log('[@epispot/epijs] Plotly server running on http://localhost:8080')
    } /* istanbul ignore next */ 
    else { // Is running in the browser
        const Plotly = require('plotly.js-dist-min')
        
        // Create the plot
        let layout = {
            title: title,
            xaxis: {
                title: 'Days'
            },
            yaxis: {
                title: 'Cases'
            }
        }
        Plotly.newPlot(name, plotlyData, layout)
    }
}

exports.plot = plot