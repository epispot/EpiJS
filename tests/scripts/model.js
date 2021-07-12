let key = {
    "S": 10000,
    "B": 0.3,
    "I": 100,
    "R": 0,
    "p": 10100,
    "u": 0.2
};

let sirm = new Model([[susceptible2, "S"], [infected2, "I"], [recovered2, "R"]], key)
var data = sirm.get_data(100)
document.getElementById('model').innerHTML = 'S: '+data.S+'<br>'+'I: '+data.I+'<br>'+'R: '+data.R // skipcq: JS-0096

let key1 = {
    "S": 10000,
    "I": 100,
    "R": 0,
    "N": 10100
};

let sirm2 = new Model([[S, "S"], [I, "I"], [R, "R"]], key1)
var data = sirm2.get_data(100)
console.log(data)