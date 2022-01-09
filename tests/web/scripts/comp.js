let susceptible2 = new Idiom("S-(B*S*I/p)");
let infected2 = new Idiom("I+(B*S*I/p)-(u*I)");
let recovered2 = new Idiom("R+(u*I)");

infected2.addSub('asymptomatic', 10)

let S = new Susceptible(["I*0.4/N"], [], true);
let I = new Infected([0.2], [['S', 'I*0.4/N']], true);
let R = new Recovered([], [['I', 0.4]], true);

I.addSub('asymptomatic', 10)