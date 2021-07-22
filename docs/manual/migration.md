---
title: EpiJS Migration Gide
---

# Migration from v1 to v2
A lot of things have changed from v1 to v2. First and foremost, we have officially dropped support for NodeJS 10, [along with MathJS dropping support](https://github.com/epispot/EpiJS/pull/54). This shouldn't change much as NodeJS 10.x was [already end-of-lifed](https://endoflife.date/nodejs), so we highly suggest upgrading your NodeJS version to the latest version or a LTS release.

Next, the big deprecation. This release now removes built-in plotting from the `pre` module, and moved it to the brand-new `plots` module. Why? Currently, the only way to interact with the data is through the chart, but other things you might want to do with the data, whatever they might be, most likely can't be done. So, we've changed the output to this format:
```JSON
{
    label: '[COMPARTMENT NAME]'
    data: [0, 1, 10, ..., 0]
}
```
Note that this is repeated for each compartment in a list, so to access a compartment, use the number corresponding to the value in the name of the model, for example, `data[0]` would access the susceptible compartment in any model for the `pre` compartment, as it comes first in all the SIR-based models. `data[1]` might access an infected compartment or exposed compartment, based on the model, and so on. 

However the syntax has also changed. Before it was:
```JavaScript
[function]('canvas', [parameters])
```
Take for example the SIR model:
```JavaScript
sir('canvas', 4, 9999, 1, 100, 1/21, 10000)
```
This creates a graph on the canvas for a model of an infection which has an r-naught of 4, susceptble population of 9999, infected population of 1, recovery rate of 1/21, and a total population of 10000, which it plots for 100 days. However, now, it changed to this:
```JavaScript
let ourmodel = sir(4, 9999, 1, 100, 1/21, 10000, true)
plot(ourmodel, 'canvas', 100)
```
We obviously removed the canvas parameter, as we no longer plot with the pre model, and added the `plot` function from the `plots` module to plot it to the canvas. Let's start with that, however. First, we select the model, `ourmodel`, and then select the canvas, and then we add this new parameter, 100, which selects the amount of days to plot for, which allows us to plot 50 days, or even 1 day, but, for this case, we plot it for 100. As for the new parameter in the `sir` function, is a new feature we added. Stochastic modelling. This allows for more accurate modelling of models, and we set it to true to make sure we model stochastically. Stochastic modelling also allows for extinctions, so when the infected population is very low, the disease might go extinct, as there is a probability they won't spread it to the people needed to keep the disease alive. Stochastic models then also give you different outputs each time, to better model an outbreak. You can still set this to false if you'd like to still have the same graph as before.

Another important aspect is that this variable was added to the majority of functions/classes. Your Idiom class can now be stochastic if you add a `w` to the equation, which EpiJS will auto-generate each run as a random number from the gaussian distribution. In the `com` module, when running a function on a class, there's the new parameter `stochastic`, which is like the other parameter in `pre`, it's a boolean which defines whether the model is stochastic or not. 
```JavaScript
let outbreak = com.sir(virus, time)
```
Is now:
```JavaScript
let oubreak = com.sir(virus, time, true) // Makes a stochastic sir model.
```
On the topic of the com module, the `h` parameter is now gone on creating viruses, as there was never a pre-built `seihrd` model, or any model which used a hospitalized compartment.

So, then why should you switch? You're doing fine right now! Well, not only is v2 a LTS release, meaning we'll support it for a long time (we're thinking around 2 major releases, if we even get that far!), but the release is introducing tons of new features!

## New Features in `v2`
- Stochastic modelling,
- Custom models in `com` module,
- New pre-built compartments for you to use in `comp`, including:
    - Susceptible,
    - Exposed,
    - Infected,
    - Hospitalized,
    - Critical,
    - Recovered,
    - Dead,
    - and Vaccinated compartments,
- A new utils compartment, which has epidemiological related utilities,
- Bug fixes,
- Customizable plotting,
- Allows for more interaction with data from `pre` module,
- metadata on the web, through `EpiJS.about`, `EpiJS.version`, etc.

and there's more coming in the new releases! You can just look at the [features project board](https://github.com/epispot/EpiJS/projects/1) to get a preview at what's ahead!

Additionally, you can access all the functions via:
```JavaScript
EpiJS.[module].[function]()
```
like:
```
EpiJS.pre.sir()
```
why you would want to do that when you can just do `sir()` is beyond me, but, it's an option!