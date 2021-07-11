# EpiJS
The epidemiology package for JavaScript

[![License: GPL--3.0](https://img.shields.io/github/license/Quantalabs/EpiJS?style=flat-square)](https://github.com/Quantalabs/epijs/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@quantalabs/epijs?style=flat-square)
![npm downloads](https://img.shields.io/npm/dt/@quantalabs/epijs?color=%232c5fde&label=npm%20downloads&style=flat-square) ](https://npmjs.org/package/@quantalabs/epijs) 
[![GitHub issues](https://img.shields.io/github/issues/quantalabs/epijs?style=flat-square) ](https://github.com/Quantalabs/epijs/issues/) 
[![GitHub pull requests](https://img.shields.io/github/issues-pr/Quantalabs/epijs?style=flat-square) ](https://github.com/Quantalabs/EpiJS/pulls) 
[![Build Status](https://img.shields.io/github/workflow/status/Quantalabs/EpiJS/Build?label=Build&logo=GitHub&logoColor=white&style=flat-square)](https://github.com/Quantalabs/EpiJS/actions/workflows/build.yml)

## About
EpiJS is a epidemiological modelling package for JavaScript with built-in support
for SIR-based models including SIR, SEIR, SEIRD, and other models, along with allowing
you to create custom models, model community spread through SIR based models, and more.
## Installation

NodeJS:
```sh
npm install @quantalabs/epijs
yarn add @quantalabs/epijs
```
Require:
```javascript
const epijs = require('@quantalabs/epijs')
```
\
On the web:
```html
<script src="https://cdn.jsdelivr.net/gh/Quantalabs/EpiJS/web/index.min.js"></script>
```
## Features

- Pre-built SIR-based models and plotting
- Community Spread
    - Create Viruses
    - Create Communities
    - Compare two outbreaks 
- Custom models
## Roadmap

- Stochastic Modelling ([#37](https://github.com/Quantalabs/EpiJS/issues/37))
- Pre-built customizable compartments ([#28](https://github.com/Quantalabs/EpiJS/issues/28))
## Contributing

<a href="https://open.vscode.dev/Quantalabs/EpiJS"><img src="https://open.vscode.dev/badges/open-in-vscode.svg" alt="Open in Visual Studio Code"></a>

Clone the repo:
```sh
git clone https://github.com/Quantalabs/epijs.git 
cd EpiJS
npm install
```

See [`CONTRIBUTING.md`](https://github.com/Quantalabs/EpiJS/blob/main/CONTRIBUTING.md) for details.

## Running Tests

To run tests, run the following command

```sh
npm run test
```

  
## Related

- epispot - https://github.com/epispot/epispot
- CovaSim - https://covasim.org
## Appendix

- Homepage - https://epi.js.org
- Docs - https://epi.js.org/getting-started.html
- Demo - https://epi.js.org/demo/

### Support

For support, consult the [docs](https://epi.js.org) or submit a [discussion](https://github.com/Quantalabs/EpiJS/discussions/new) on the repo

