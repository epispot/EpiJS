var x = {
    x: {
        x: {
            x: 10
        },
        y: 10
    },
    y: {
        x: {
            x: 10
        },
        y: 0
    }
}

for (var z in x) {
    // Check if x[z].x is not an empty object
    if (Object.keys(x[z].x).length !== 0) {
        console.log('object: ', z)
    }
}