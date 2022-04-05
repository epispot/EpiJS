---
  title: EpiJS - Model Module
---

 # Model Module

## Classes

<dl>
<dt><a href="#Model">Model</a></dt>
<dd><p>Create a model.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#mexport">mexport(model, output, file_type)</a></dt>
<dd><p>NodeJS only! Exports models to a file which can then be imported later on.</p>
</dd>
<dt><a href="#mimport">mimport(input, file_type)</a></dt>
<dd><p>NodeJS only! Imports a model from a file.</p>
</dd>
</dl>

<a name="Model"></a>

## Model
Create a model.

**Kind**: global class  

* [Model](#Model)
    * [new Model(compartments, key)](#new_Model_new)
    * [.get_data(time)](#Model+get_data)
    * [.remove(compartment)](#Model+remove)
    * [.add(compartment, index)](#Model+add)

<a name="new_Model_new"></a>

### new Model(compartments, key)

| Param | Type | Description |
| --- | --- | --- |
| compartments | <code>Array</code> | Compartments in the model. Each should be a list, with the first value being the compartment, and the second being it's start value in the key. |
| key | <code>Object</code> | The key of values for any variable used in the equation. If you use any variable which represents the population of a compartment, add the starting value into the key. |

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

let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)
```
<a name="Model+get_data"></a>

### model.get\_data(time)
Get data for the outbreak.

**Kind**: instance method of [<code>Model</code>](#Model)  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>Number</code> | The total time to model. |

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

let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)

model.get_data(100) // Get data for 100 days.
```
<a name="Model+remove"></a>

### model.remove(compartment)
Remove a compartment from the model.

**Kind**: instance method of [<code>Model</code>](#Model)  

| Param | Type | Description |
| --- | --- | --- |
| compartment | <code>Object</code> | The compartment to remove. |

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

let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)

sirm.remove(recovered) // Removes the recovered compartment.
```
<a name="Model+add"></a>

### model.add(compartment, index)
Add a compartment to the model.

**Kind**: instance method of [<code>Model</code>](#Model)  

| Param | Type | Description |
| --- | --- | --- |
| compartment | <code>Array</code> | The compartment to add, should be a list, with the first value being the compartment, and the second being it's value in the key. |
| index | <code>Number</code> | The index to add the compartment at. |

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

let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)

sirm.remove(susceptible) // Removes the susceptible compartment.
sirm.add([susceptible, "S"], 0) // Adds the susceptible compartment back to the beginning
```
<a name="mexport"></a>

## mexport(model, output, file_type)
NodeJS only! Exports models to a file which can then be imported later on.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| model |  |  | The EpiJS model to export |
| output | <code>String</code> |  | The output file path, doesn't have to exist |
| file_type | <code>String</code> | <code>.json</code> | The file type to output. Supported inputs are ".json" and ".js". |

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

let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)

mexport(sirm, "output.js", file_type=".js")
```
<a name="mimport"></a>

## mimport(input, file_type)
NodeJS only! Imports a model from a file.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>String</code> |  | The input file path, as a relative path. |
| file_type | <code>String</code> | <code>.json</code> | The file type of the input. Supported inputs are ".json" and ".js". |

**Example**  
```js
// Use mexport to export a model into a file
let sirm = mimport("./output.json") 
```
