let rdisplay = document.getElementById('rdisplay')
let sirchart = document.getElementById('ctxsir')
let seirchart = document.getElementById('ctxseir')
let seirdchart = document.getElementById('ctxseird')
let seihrdmodelchart = document.getElementById('ctxseihrd')
let seihcrdchart = document.getElementById('ctxseihcrd')

sir(sirchart, 4, 9999, 1, 100, 1/21, 10000)
seir(seirchart, 4, 9999, 1, 100, 1/7, 1/7, 10000)
seird(seirdchart, 4, 9999, 1, 265, 1/21, 1/14, 1/100, 10000)
seihrd(seihrdmodelchart, 4, 9999, 1, 265, 1/21, 1/40, 1/14, 1/100, 1/20, 1/30, 10000)
seihcrd(seihcrdchart, 4, 9999, 1, 265, 1/21, 1/40, 1/14, 1/100, 1/20, 1/10, 1/40, 2/5, 1/5, 1/5, 1/5, 1/30, 10000)

let community = new Community(10000, 1, 9999)
let covid = new Virus(4, 1/21, 1/14, 1/25)
let anothervirus = new Virus(4, 1/10, 1/12, 1/50)

let sirout = community.sir(covid, 100)
let sirout2 = community.sir(anothervirus, 100)

let seirout = community.seir(covid, 100)
let seirout2 = community.seir(anothervirus, 100)

let seirdout = community.seird(covid, 200)
let seirdout2 = community.seird(anothervirus, 200)

compare("sir_compare", sirout, sirout2, "1", "2", 100)
compare("seir_compare", seirout, seirout2, "1", "2", 100)
compare("seird_compare", seirdout, seirdout2, "1", "2", 200)


let susceptible = new Idiom("S-(B*S*I/p)");
let infected = new Idiom("I+(B*S*I/p)-(u*I)");
let recovered = new Idiom("R+(u*I)");

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
console.log(data);

NewYorkCity = new Community(8419000, 300, 8418700)
covid = new Virus(5.7, 2.1/100)

let newoutbreak = NewYorkCity.custom([[susceptible, "S"], [infected, "I"], [recovered, "R"]], 100, covid, {B: covid.rnaught*covid.u})
console.log(newoutbreak)