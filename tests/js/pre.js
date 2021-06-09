let rdisplay = document.getElementById('rdisplay')
let sirchart = document.getElementById('ctxsir')
let seirchart = document.getElementById('ctxseir')
let seirdchart = document.getElementById('ctxseird')
let seihrdmodelchart = document.getElementById('ctxseihrd')

sir(sirchart, 4, 9999, 1, 100, 1/21, 10000)
seir(seirchart, 4, 9999, 1, 100, 1/7, 1/7, 10000)
seird(seirdchart, 4, 9999, 1, 265, 1/21, 1/14, 1/100, 10000)
seihrd(seihrdmodelchart, 4, 9999, 1, 265, 1/21, 1/40, 1/14, 1/100, 1/20, 1/30, 10000)