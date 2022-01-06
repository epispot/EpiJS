/**
 * @file Graphs plots from the pre module.
 * 
 * Import it with:
 * ```
 *    const plots = require('@epispot/epijs').plots
 * ```
 */

const http = require('http')

function plot(model, time, title='Cases vs. Time') {
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
        let current = model.get_data(x+1)

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
            var data = ${JSON.stringify(plotlyData)}
            var layout = {
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
        console.log('Plotly server running on http://localhost:8080')
    }
}

exports.plot = plot