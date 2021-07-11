let key = {
    "S": 10000,
    "B": 0.3,
    "I": 100,
    "R": 0,
    "p": 10100,
    "u": 0.2
};

let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)
var data = sirm.get_data(100)
document.getElementById('model').innerHTML = 'S: '+data['S']+'<br>'+'I: '+data['I']+'<br>'+'R: '+data['R']