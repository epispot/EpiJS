---
  title: EpiJS - Plots Module
---

 # Plots Module

<a name="plot"></a>

## plot(model, time, name, title)
Plots models from pre or model modules. If in Node, this will generate a localhost, otherwise it will plot it in the HTML div element provided.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| model | <code>Object</code> |  | A model class from the pre or model modules. |
| time | <code>Number</code> |  | The number of days to plot. |
| name | <code>String</code> |  | The ID of the plot. If this is in HTML, it will be the ID of the div element for the graph. |
| title | <code>String</code> | <code>Cases vs. Time</code> | The title of the graph. |

**Example**  
```js
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

let sirm = new Model([[susceptible2, "S"], [infected2, "I"], [recovered2, "R"]], key)

plot(sirout1, 100, "SIR", "SIR Model (Population vs. Time)")
```
