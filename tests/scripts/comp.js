let susceptible2 = new Idiom("S-(B*S*I/p)");
let infected2 = new Idiom("I+(B*S*I/p)-(u*I)");
let recovered2 = new Idiom("R+(u*I)");

let S = new Susceptible(["I*0.4/N"], []);
let I = new Infected([0.2], [['S', 'I*0.4/N']]);
let R = new Recovered([], [['I', 0.2]]);
