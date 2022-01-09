# v3.0.0-alpha1

* Fix plotly import error (#123)

# v3.0.0-alpha0

* Plot Models (#83)
* Switch to Plotly (#115)
* Update `pre` module to return model with the same structure as the `model` module models (#117)
* Deprecate `com` module- it might come back later! (#118)
* Sub-compartments (#84)

# v2.2.0

- Add `.remove` and `.add` functions to `Model` class in `model` module to add and remove compartments.

# v2.1.2

- Fix error from previous release

# v2.1.1

- Fix key error in `model`

# v2.1.0
- Adds `manipulate` to manipulate outputs with `plots`
- Adds `mexport` and `mimport` to `model`, which allow for exporting and importing models to `.js` and `.json` files.   
- Adds version locking to the dependencies. This prevents users from installing incompatible releases when installing the package.

# v2.0.0 - LTS
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
- Customizable plotting, with the `plots` module,
- Allows for more interaction with data from `pre` module,
- And metadata on the web, through `EpiJS.about`, `EpiJS.version`, etc.
## What makes this a major release?
This release is a major release for 2 reasons:
- Drops 10.x support
- Syntax for functions/classes was changed with stochastic models
- `pre` module no longer outputs graphs, and is instead replaced with the `plots` module for graphs.

This release is also an LTS release, so bug fixes and security fixes for a while now.

---
# v1.3.1
## Bug Fixes
- Fix formula parsing error in the `model` module.

# v1.3.0
## Features
- Add `comp` module.
    - Create `comp` module, which allows for creating custom compartments, which can then be combined into models
    - Add Idiom class, for custom compartments
- Add `model` module.
    - Create `model` module which combines compartments from `comp` into models.
- Add `com` module.
    - Create `com` module, which models communities.
    - Create the `virus` class, which creates a virus which can infect a community.
    - Create the `community` class which can be infected with a virus, and modeled.
    - Create the compare function, which compares two different outbreaks, whether it's two different communities infected with a virus, two viruses infecting the same community, or even two communities infected by two viruses.

## Unrelated
- Add documentation from vuepress, which provides much better documentation than that of mkdocs.
- Add new dependency - `math.js` which is used in the `comp` module.
# v1.2.1

## Bug Fixes
- Add custom recovered population. Takes difference of population and sum of infected and susceptible populations, instead of automatically setting population to 0 at the beggining of the outbreak.

# v1.2.0

## New Features
- Add SEIHCRD model

## Bug Fixes
- Fix import error for npm package.

# v1.1.0

## New Features
- Add SEIHRD model

## Bug Fixes
None.

---
# v1.0.1 (DEPRECATED)
Minor update

## New Features
None.

## Bug Fixes
None.

---
# v1.0.0 (DEPRECATED)

Initial release.

## Features

The `pre` module. Pre-built models for EpiJS. For example: \
HTML:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EpiJS Test</title>
</head>
<body>
    <canvas id="ctxsir"></canvas>
    <script src="js/pre.min.js"></script> <!-- EpiJS Library -->
    <script src="js/chart.min.js"></script> <!-- The Chart.js Requirement -->
    <script src="js/plot.js"></script> <!-- Our JavaScript Code -->
</body>
</html>
```
JavaScript:
```javascript
let sirchart = document.getElementById('ctxsir')
sir(sirchart, 4, 9999, 1, 100, 1/21, 10000)
```
This includes the SIR, SEIR, and SEIRD models.
