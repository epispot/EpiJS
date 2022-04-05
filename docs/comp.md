---
  title: EpiJS - Comp Module
---

 # Comp Module

## Classes

<dl>
<dt><a href="#Idiom">Idiom</a></dt>
<dd><p>Class for a custom compartments.</p>
</dd>
<dt><a href="#Susceptible">Susceptible</a></dt>
<dd><p>Class for Suscepible compartment.</p>
</dd>
<dt><a href="#Infected">Infected</a></dt>
<dd><p>Class for Infected compartment.</p>
</dd>
<dt><a href="#Exposed">Exposed</a></dt>
<dd><p>Class for Exposed compartment.</p>
</dd>
<dt><a href="#Critical">Critical</a></dt>
<dd><p>Class for Critical compartment.</p>
</dd>
<dt><a href="#Hospitalized">Hospitalized</a></dt>
<dd><p>Class for Hospitalized compartment.</p>
</dd>
<dt><a href="#Dead">Dead</a></dt>
<dd><p>Class for the Dead compartment.</p>
</dd>
<dt><a href="#Vaccinated">Vaccinated</a></dt>
<dd><p>Class for Vaccinated compartment.</p>
</dd>
<dt><a href="#Recovered">Recovered</a></dt>
<dd><p>Class for Recovered compartment.</p>
</dd>
</dl>

<a name="Idiom"></a>

## Idiom
Class for a custom compartments.

**Kind**: global class  

* [Idiom](#Idiom)
    * [new Idiom(equation)](#new_Idiom_new)
    * [.addSub(name, percentage)](#Idiom+addSub)

<a name="new_Idiom_new"></a>

### new Idiom(equation)

| Param | Type | Description |
| --- | --- | --- |
| equation | <code>String</code> | The equation for the compartment. This defines what to run to get a new value for the next day in the model. Use any variable in the equation (1 char max), but when making this a model, you need to define this in the key.      If using other compartment classes, they each have their own corresponding variable: <br> - 'S' - Susceptible <br> - 'E' - Exposed <br> - 'I' - Infectious <br> - 'R' - Recovered <br> - 'D' - Dead <br> - 'C' - Critical <br> - 'H' - Hospitalized <br> - 'V' - Vaccinated <br> - 'w' - Reserved for stochastic models. If put, it will be replaced with a random number generated from the gaussian distribution. |

**Example**  
```js
let susceptible = new Idiom("S-(B*S*I)")
```
<a name="Idiom+addSub"></a>

### idiom.addSub(name, percentage)
Add a subcompartment to this compartment.

**Kind**: instance method of [<code>Idiom</code>](#Idiom)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of sub-compartment. |
| percentage | <code>Number</code> | Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment. |

**Example**  
```js
let infected = new Idiom("I+((B*S*I)/p)")

infected.addSub("Asymptomatic", 10) // 10% of the infected population are asymptomatic.
```
<a name="Susceptible"></a>

## Susceptible
Class for Suscepible compartment.

**Kind**: global class  

* [Susceptible](#Susceptible)
    * [new Susceptible(next, prev, stochastic)](#new_Susceptible_new)
    * [.addSub(name, percentage)](#Susceptible+addSub)

<a name="new_Susceptible_new"></a>

### new Susceptible(next, prev, stochastic)

| Param | Type | Description |
| --- | --- | --- |
| next | <code>Array</code> | List of rates of the next compartments This is multiplied by the current susceptible population. |
| prev | <code>Array</code> | List of rates of the previous compartments, which include sub-arrays       with the compartment id (one letter only), as a string, and the rate for the compartment.       If reffering to this compartment's population, use "S" as the id. This parameter is useful       if you want to model a disease with re-susceptibility. |
| stochastic | <code>Boolean</code> | If true, the compartment will be stochastic. You can still pass in your normal equation, and epijs will       auto generate the equations from what you pass in. |

**Example**  
```js
// Note that you can pass in a number as a rate too, 
     // but we use a string because we want to multiply 
     // by other compartment populations. This applies to the prev parameter too. 
     let S = new Susceptible(["I*0.4/N"], [], true) 
```
<a name="Susceptible+addSub"></a>

### susceptible.addSub(name, percentage)
Add a subcompartment to this compartment.

**Kind**: instance method of [<code>Susceptible</code>](#Susceptible)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of sub-compartment. |
| percentage | <code>Number</code> | Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment. |

<a name="Infected"></a>

## Infected
Class for Infected compartment.

**Kind**: global class  

* [Infected](#Infected)
    * [new Infected(next, prev, stochastic)](#new_Infected_new)
    * [.addSub(name, percentage)](#Infected+addSub)

<a name="new_Infected_new"></a>

### new Infected(next, prev, stochastic)

| Param | Type | Description |
| --- | --- | --- |
| next | <code>Array</code> | List of rates of the next compartments This is multiplied by the current infected population. |
| prev | <code>Array</code> | List of rates of the previous compartments, which include sub-arrays       with the compartment id (one letter only), as a string, and the rate for the compartment.       If reffering to this compartment's population, use "I" as the id. |
| stochastic | <code>Boolean</code> | If true, the compartment will be stochastic. |

**Example**  
```js
// Note that you can pass in a string as a rate too, 
     // but we use a number in this case because we don't need to multiply 
     // by other compartment populations. We do actually do this for the prev parameter, though.
     let I = new Infected([0.3], [["S", "I*0.4/N"]], false) 
```
<a name="Infected+addSub"></a>

### infected.addSub(name, percentage)
Add a subcompartment to this compartment.

**Kind**: instance method of [<code>Infected</code>](#Infected)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of sub-compartment. |
| percentage | <code>Number</code> | Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment. |

<a name="Exposed"></a>

## Exposed
Class for Exposed compartment.

**Kind**: global class  

* [Exposed](#Exposed)
    * [new Exposed(next, prev, stochastic)](#new_Exposed_new)
    * [.addSub(name, percentage)](#Exposed+addSub)

<a name="new_Exposed_new"></a>

### new Exposed(next, prev, stochastic)

| Param | Type | Description |
| --- | --- | --- |
| next | <code>Array</code> | List of rates of the next compartments This is multiplied by the current exposed population. |
| prev | <code>Array</code> | List of rates of the previous compartments, which include sub-arrays       with the compartment id (one letter only), as a string, and the rate for the compartment.       If reffering to this compartment's population, use "E" as the id. |
| stochastic | <code>Boolean</code> | If true, the compartment will be stochastic. |

**Example**  
```js
// Note that you can pass in a string as a rate too, 
     // but we use a number in this case because we don't need to multiply 
     // by other compartment populations. We do actually do this for the prev parameter, though.
     let E = new Exposed([1/14], ["S*0.4/N"], false) 
```
<a name="Exposed+addSub"></a>

### exposed.addSub(name, percentage)
Add a subcompartment to this compartment.

**Kind**: instance method of [<code>Exposed</code>](#Exposed)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of sub-compartment. |
| percentage | <code>Number</code> | Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment. |

<a name="Critical"></a>

## Critical
Class for Critical compartment.

**Kind**: global class  

* [Critical](#Critical)
    * [new Critical(next, prev, stochastic)](#new_Critical_new)
    * [.addSub(name, percentage)](#Critical+addSub)

<a name="new_Critical_new"></a>

### new Critical(next, prev, stochastic)

| Param | Type | Description |
| --- | --- | --- |
| next | <code>Array</code> | List of rates of the next compartments This is multiplied by the current critical population. |
| prev | <code>Array</code> | List of rates of the previous compartments, which include sub-arrays       with the compartment id (one letter only), as a string, and the rate for the compartment.       If reffering to this compartment's population, use "C" as the id. |
| stochastic | <code>Boolean</code> | If true, the compartment will be stochastic. |

**Example**  
```js
// Note that you can pass in a string as a rate too, 
     // but we use a number in this case because we don't need to multiply 
     // by other compartment populations.
     let C = new Critical([0.14, 0.1], [["H", 0.3]], false) 
```
<a name="Critical+addSub"></a>

### critical.addSub(name, percentage)
Add a subcompartment to this compartment.

**Kind**: instance method of [<code>Critical</code>](#Critical)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of sub-compartment. |
| percentage | <code>Number</code> | Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment. |

<a name="Hospitalized"></a>

## Hospitalized
Class for Hospitalized compartment.

**Kind**: global class  

* [Hospitalized](#Hospitalized)
    * [new Hospitalized(next, prev, stochastic)](#new_Hospitalized_new)
    * [.addSub(name, percentage)](#Hospitalized+addSub)

<a name="new_Hospitalized_new"></a>

### new Hospitalized(next, prev, stochastic)

| Param | Type | Description |
| --- | --- | --- |
| next | <code>Array</code> | List of rates of the next compartments This is multiplied by the current hospitalized population. |
| prev | <code>Array</code> | List of rates of the previous compartments, which include sub-arrays       with the compartment id (one letter only), as a string, and the rate for the compartment.       If reffering to this compartment's population, use "H" as the id. |
| stochastic | <code>Boolean</code> | If true, the compartment will be stochastic. |

**Example**  
```js
// Note that you can pass in a string as a rate too, 
     // but we use a number in this case because we don't need to multiply 
     // by other compartment populations.
     let H = new Hospitalized([0.3], [["I", 0.1], ["E", 0.2]], false)
```
<a name="Hospitalized+addSub"></a>

### hospitalized.addSub(name, percentage)
Add a subcompartment to this compartment.

**Kind**: instance method of [<code>Hospitalized</code>](#Hospitalized)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of sub-compartment. |
| percentage | <code>Number</code> | Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment. |

<a name="Dead"></a>

## Dead
Class for the Dead compartment.

**Kind**: global class  

* [Dead](#Dead)
    * [new Dead(next, prev, stochastic)](#new_Dead_new)
    * [.addSub(name, percentage)](#Dead+addSub)

<a name="new_Dead_new"></a>

### new Dead(next, prev, stochastic)

| Param | Type | Description |
| --- | --- | --- |
| next | <code>Array</code> | List of rates of the next compartments. This is multiplied by the current dead population.       Useful if you want to have a dead population that can also be the walking dead. |
| prev | <code>Array</code> | List of rates of the previous compartments, which include sub-arrays       with the compartment id (one letter only), as a string, and the rate for the compartment.       If reffering to this compartment's population, use "D" as the id. |
| stochastic | <code>Boolean</code> | If true, the compartment will be stochastic. |

**Example**  
```js
// Note that you can pass in a string as a rate too, 
     // but we use a number in this case because we don't need to multiply 
     // by other compartment populations. We do actually do this for the prev parameter, though.
     let D = new Dead([0.3], [["I", 0.3]], false) // This disease also gives you a 3/10 chance to come alive after death.
```
<a name="Dead+addSub"></a>

### dead.addSub(name, percentage)
Add a subcompartment to this compartment.

**Kind**: instance method of [<code>Dead</code>](#Dead)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of sub-compartment. |
| percentage | <code>Number</code> | Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment. |

<a name="Vaccinated"></a>

## Vaccinated
Class for Vaccinated compartment.

**Kind**: global class  

* [Vaccinated](#Vaccinated)
    * [new Vaccinated(next, prev, stochastic)](#new_Vaccinated_new)
    * [.addSub(name, percentage)](#Vaccinated+addSub)

<a name="new_Vaccinated_new"></a>

### new Vaccinated(next, prev, stochastic)

| Param | Type | Description |
| --- | --- | --- |
| next | <code>Array</code> | List of rates of the next compartments, good if the vaccine isn't 100% effective. This is multiplied by the current vaccinated population. |
| prev | <code>Array</code> | List of rates of the previous compartments, which include sub-arrays       with the compartment id (one letter only), as a string, and the rate for the compartment.       If reffering to this compartment's population, use "V" as the id. |
| stochastic | <code>Boolean</code> | If true, the compartment will be stochastic. |

**Example**  
```js
// Note that you can pass in a string as a rate too, 
     // but we use a number in this case because we don't need to multiply 
     // by other compartment populations. We do actually do this for the prev parameter, though.
     let V = new Vaccinated([0.001], ["S*0.4"], false)
```
<a name="Vaccinated+addSub"></a>

### vaccinated.addSub(name, percentage)
Add a subcompartment to this compartment.

**Kind**: instance method of [<code>Vaccinated</code>](#Vaccinated)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of sub-compartment. |
| percentage | <code>Number</code> | Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment. |

<a name="Recovered"></a>

## Recovered
Class for Recovered compartment.

**Kind**: global class  

* [Recovered](#Recovered)
    * [new Recovered(next, prev, stochastic)](#new_Recovered_new)
    * [.addSub(name, percentage)](#Recovered+addSub)

<a name="new_Recovered_new"></a>

### new Recovered(next, prev, stochastic)

| Param | Type | Description |
| --- | --- | --- |
| next | <code>Array</code> | List of rates of the next compartments, good if the vaccine isn't 100% effective. This is multiplied by the current vaccinated population. |
| prev | <code>Array</code> | List of rates of the previous compartments, which include sub-arrays       with the compartment id (one letter only), as a string, and the rate for the compartment.       If reffering to this compartment's population, use "V" as the id. |
| stochastic | <code>Boolean</code> | If true, the compartment will be stochastic. |

**Example**  
```js
// Note that you can pass in a string as a rate too, 
     // but we use a number in this case because we don't need to multiply 
     // by other compartment populations. We do actually do this for the prev parameter, though.
     let R = new Recovered([ ], [["I", 0.1]], false)
```
<a name="Recovered+addSub"></a>

### recovered.addSub(name, percentage)
Add a subcompartment to this compartment.

**Kind**: instance method of [<code>Recovered</code>](#Recovered)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of sub-compartment. |
| percentage | <code>Number</code> | Percentage of the total compartment population to be in the sub-compartmnet. This will not affect the population of the parent compartment or any other sub-compartment. |

