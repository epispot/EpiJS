---
  title: EpiJS - Pre Module
---

 # Pre Module

## Functions

<dl>
<dt><a href="#sir">sir(rn, s, i, u, p, stochastic)</a> ⇒</dt>
<dd><p>The SIR Model. Returns the model as a <code>model</code> class from the <code>model</code> module.</p>
</dd>
<dt><a href="#seir">seir(rn, s, i, u, a, p, stochastic)</a> ⇒</dt>
<dd><p>The SEIR Model. Returns the model as a <code>model</code> class from the <code>model</code> module.</p>
</dd>
<dt><a href="#seird">seird(rn, s, i, u, a, d, p, stochastic)</a> ⇒</dt>
<dd><p>The SEIRD Model. Returns the model as a <code>model</code> class from the <code>model</code> module.</p>
</dd>
<dt><a href="#seihrd">seihrd(rn, s, i, u, uh, a, di, dh, h, p, stochastic)</a> ⇒</dt>
<dd><p>The SEIHRD Model. Returns the model as a <code>model</code> class from the <code>model</code> module.</p>
</dd>
</dl>

<a name="sir"></a>

## sir(rn, s, i, u, p, stochastic) ⇒
The SIR Model. Returns the model as a `model` class from the `model` module.

**Kind**: global function  
**Returns**: A model class from the `model` module. .  

| Param | Type | Description |
| --- | --- | --- |
| rn | <code>Number</code> | R Naught, or the amount of people one infected infects whlie infected. |
| s | <code>Number</code> | The Susceptible population at the beggining of the outbreak |
| i | <code>Number</code> | The Infected population at the beggining of th outbreak |
| u | <code>Number</code> | The recovery rate |
| p | <code>Number</code> | The total population. |
| stochastic | <code>Boolean</code> | Whether to make the model stochastic or not. |

**Example**  
```js
let sirmodel = sir(4, 9999, 1, 1/21, 10000, true)
```
<a name="seir"></a>

## seir(rn, s, i, u, a, p, stochastic) ⇒
The SEIR Model. Returns the model as a `model` class from the `model` module.

**Kind**: global function  
**Returns**: A model class from the `model` module. .  

| Param | Type | Description |
| --- | --- | --- |
| rn | <code>Number</code> | R Naught, or the amount of people one infected infects whlie infected. |
| s | <code>Number</code> | The Susceptible population at the beggining of the outbreak |
| i | <code>Number</code> | The Infected population at the beggining of th outbreak |
| u | <code>Number</code> | The recovery rate |
| a | <code>Number</code> | The incubation period |
| p | <code>Number</code> | The total population. |
| stochastic | <code>Boolean</code> | Whether to make the model stochastic or not. |

**Example**  
```js
seir(4, 9999, 1, 1/7, 1/7, 10000, true)
```
<a name="seird"></a>

## seird(rn, s, i, u, a, d, p, stochastic) ⇒
The SEIRD Model. Returns the model as a `model` class from the `model` module.

**Kind**: global function  
**Returns**: A model class from the `model` module. .  

| Param | Type | Description |
| --- | --- | --- |
| rn | <code>Number</code> | R Naught, or the amount of people one infected infects whlie infected. |
| s | <code>Number</code> | The Susceptible population at the beggining of the outbreak |
| i | <code>Number</code> | The Infected population at the beggining of the outbreak |
| u | <code>Number</code> | The recovery rate |
| a | <code>Number</code> | The incubation period |
| d | <code>Number</code> | The death rate |
| p | <code>Number</code> | The total population. |
| stochastic | <code>Boolean</code> | Whether to make the model stochastic or not. |

**Example**  
```js
seird(4, 99999, 1, 1/21, 1/14, 1/100, 10000, true)
```
<a name="seihrd"></a>

## seihrd(rn, s, i, u, uh, a, di, dh, h, p, stochastic) ⇒
The SEIHRD Model. Returns the model as a `model` class from the `model` module.

**Kind**: global function  
**Returns**: A model class from the `model` module. .  

| Param | Type | Description |
| --- | --- | --- |
| rn | <code>Number</code> | R Naught, or the amount of people one infected infects whlie infected. |
| s | <code>Number</code> | The Susceptible population at the beggining of the outbreak |
| i | <code>Number</code> | The Infected population at the beggining of the outbreak |
| u | <code>Number</code> | The recovery rate for the infected population |
| uh | <code>Number</code> | The recovery rate for the hospitalized population |
| a | <code>Number</code> | The incubation period |
| di | <code>Number</code> | The death rate for the infected population |
| dh | <code>Number</code> | The death rate for the hospitalized population |
| h | <code>Number</code> | The hospitalization rate |
| p | <code>Number</code> | The total population. |
| stochastic | <code>Boolean</code> | Whether to make the model stochastic or not. |

**Example**  
```js
seihrd(4, 9999, 1, 1/21, 1/40, 1/14, 1/100, 1/20, 1/30, 10000, true)
```
