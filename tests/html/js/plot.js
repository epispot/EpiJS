let rdisplay = document.getElementById('rdisplay')
let sirchart = document.getElementById('ctx')

let rval = r(0.0028717, 8280000, 202.08)

sir(sirchart, 1, 9999, 1, 100, 0.1, 10000)

rdisplay.innerHTML += rval