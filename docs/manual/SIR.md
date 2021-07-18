---
title: Creating a SIR Model in EpiJS | Manual
---

# Creating a SIR Model in EpiJS

## Table of Contents

[[toc]]


## The Base
There are several ways to create an SIR model, and we're going to go through all of them. But first, we need to cover what the SIR model is. The SIR model is made up of several compartments:

- **S**usceptible
- **I**nfected
- **R**ecovered/removed

For now, we'll treat the last compartment as removed and not recovered, to better represent an outbreak. To model the outbreak, we need to introduce some more parameters:

- β - The infection rate
- γ - The recovery rate
- R<sub>0</sub> or R-Naught - The number of people one infected infects 
​
:::tip
You don't need to know the infection rate when modelling. You can easily calculate it by taking R-Naught and multiplying it with the recovery rate. Because of this, we only need to know 2 of the 3 compartments, since you can find the other by finding the product or quotient of the other two numbers.
:::

Additionally, we have N, the total population, which we can quickly define as the sum of the three populations.

With these definitions, we can start to create equations for each compartment:

<div align="center" ><img src="https://i.ibb.co/5837sMf/image.png" alt="Equations for the SIR Model"></div>

And now that we know our equations, we can start to create the models in code.

## Approach No. 1 - Custom Models
Our first aproach is the most extensible. This allows us to easily add compartments beyond the S, I, and R. Let's start with the setup:

:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
 
::: tab HTML id="first-tab"
```HTML
<script src="https://cdn.jsdelivr.net/gh/Quantalabs/EpiJS/web/index.min.js"></script>
```
:::
::: tab NodeJS id="second-tab"
Install:
```SH
npm install @quantalabs/epijs
```
Require:
```JavaScript
const { model, comp } = require('@quantalabs/epijs')

// Import the required classes into the program
const Model = model.Model
const Idiom = comp.Idiom
```
:::
::::

Now that we have everything set up, we can define each of our compartments and create the model

```JavaScript
// Include configuration from above
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

let sir = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)
```
Let's go through this code. The first few lines define compartments with the `Idiom` class, which allows you to create compartments with equations. The next section defines the starting values for the variables in the equation. We define the start susceptible population as 10000, the infected population as 100, and the recovered populaton as 0. We then also define p, which is our total population. The other parameters are:

- `B` - Infection rate
- `u` - The recovery rate

Finally we define our model with the Model class, where we first pass in a list with sublists, where we define the compartment and their corresponding values in the key, and then the key itself. 

We can now test the SIR model like so:

```JavaScript
console.log(sir.get_data(100)) // Get's data for the 100th day
```
This will return something like:
```JSON
{
    "S": data,
    "I": data,
    "R": data
}
```

## Approach No. 2 - Pre-Compiled Models
This step is the easiest of them all, as you don't really have to write that much code, most of the work is done for you.

Let's start by setting up your program:

```HTML
<canvas id="SIR-Model"></canvas>
<script src="https://cdn.jsdelivr.net/gh/Quantalabs/EpiJS/web/index.min.js"></script>
<script>
/** All Code Snippets Go Here */
</script>
```
Now, we can use the one line of code:
```JavaScript
sir(rn, s, i, time, u, p, stochastic)
```
Where:
 - `c` is the canvas element,
 - `rn` is R-Naught,
 - `s` is the susceptible population,
 - `i` is the infected population,
 - `time` is the time to model for,
 - `u` is the recovery rate,
 - `p` is the total population,
 - and `stochastic` is whether or not our model is stochastic

So let's create our model:
```JavaScript
let sirdata = sir(1.5, 10000, 100, 100, 0.2, 10100, false)
```

Now, we can plot it with the plots module:
```JavaScript
plot(sirdata, "SIR-Model", 100)
```

## Approach No. 3 - Pre-Compiled Models with Community Modelling

EpiJS also has a `com` module, which allows for community modelling with pre-built or custom models. We're going to use the pre-build models for today, however you can read the docs for the modue for detailed instructions on custom models, which are useful if you want to use compartments from the `comp` module in the `com` module. First, however, let's set up our program:
```HTML
<canvas id='our-model'></canvas>
<script src="https://cdn.jsdelivr.net/gh/Quantalabs/EpiJS/web/index.min.js"></script>
<script>
/** All Code Snippets Go Here */
</script>
```
First, we need to create our community, and our virus:
```JavaScript
let covid = new Virus(5.7, 2.1/100)
let NewYorkCity = new Community(8419000, 300, 8418700)
```
Let's go through this. When we define the virus, we pass in two parameters:

 - R-naught - 5.7
 - Recovery rate - 2.1/100

Next, for the community, we pass in three:

 - Population - 8.419 million
 - Infected population at the beggining of the outbreak - 300
 - Total population - 8.4187 million

We now use an SIR model:
```JavaScript
let data = NewYorkCity.sir(covid, 100, false)
console.log(data)
```
You'll get a console output of data from these compartments.

However, if you wanted to compare two compartments, you could also do that:
```JavaScript
let NewYorkCity = new Community(8419000, 300, 8418700)
let covid = new Virus(5.7, 2.1/100)
let covid_variant = new Virus(5, 4/100)

let chart = document.getElementById('our-model')

covid_outbreak = NewYorkCity.sir(covid, 100, false)
variant_outbreak = NewYorkCity.sir(covid_variant, 100, false)

compare(chart, covid_outbreak, variant_outbreak, "COVID-19", "COVID-19 Variant", 100)
```
and we get:
![Output of the compare function](https://i.ibb.co/LRMLNBL/image.png)

​
:::tip
You can compare anything, as long as they are an output of the com module. You can compare two outbreaks of the same community with different viruses, or different communities with the same virus, or even two different communities with two different viruses!
:::
