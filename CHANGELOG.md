# v1.0.1
Minor update

## New Features
None.

## Bug Fixes
None.

## Deprecations
Remove the `check` function from the `pre` module.

---
# v1.0.0

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
