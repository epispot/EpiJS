let community = new Community(9999, 1, 10000)
let covid = new Virus(4, 1/21, 1/14, 1/25)
let anothervirus = new Virus(4, 1/10, 1/12, 1/50)

let sirout = community.sir(covid, 100, true)
let sirout2 = community.sir(anothervirus, 100, true)

let seirout = community.seir(covid, 100, true)
let seirout2 = community.seir(anothervirus, 100, true)

let seirdout = community.seird(covid, 200, true)
let seirdout2 = community.seird(anothervirus, 200, true)

compare("canvas-com1", sirout, sirout2, "1", "2", 100)
compare("canvas-com2", seirout, seirout2, "1", "2", 100)
compare("canvas-com3", seirdout, seirdout2, "1", "2", 200)

NewYorkCity = new Community(8419000, 300, 8418700)
covid = new Virus(5.7, 2.1/100)
covid2 = new Virus(6, 2.1/100)

let newoutbreak = NewYorkCity.custom([[susceptible2, "S"], [infected2, "I"], [recovered2, "R"]], 200, covid, {B: covid.rnaught*covid.u})
let newoutbreak2 = NewYorkCity.custom([[susceptible2, "S"], [infected2, "I"], [recovered2, "R"]], 200, covid2, {B: covid2.rnaught*covid.u})
compare("canvas-com4", newoutbreak, newoutbreak2, "1", "2", 200)
console.log(newoutbreak)
console.log(newoutbreak2)