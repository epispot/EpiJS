---
    title: EpiJS - Getting Started
---

# Getting Started

EpiJS is a toolset for creating and analysing disease outbreaks with epidemiology. It's feature set includes:
   - Custom models
   - Pre-built SIR-based compartmental models
   - Fast execution
   - Web-compatible
   - Community Modeling

along with many other features.

## Install
EpiJS is avaliable through npm, yarn, or on the web.
```sh
npm install @quantalabs/epijs
yarn add @quantalabs/epijs
```
Or use it in your webpage:
```HTML
<script src="https://cdn.jsdelivr.net/gh/Quantalabs/EpiJS/web/index.min.js"></script>
```
See [installation](/installation) for more.

## Metadata

You can fetch metadata about the package with the following commands:
```js
epijs.about // General metadata
epijs.version // Your current package version
```

## Modules

EpiJS has several modules for specfic use cases:

- [`Pre`](/pre) - pre-compiled compartmental models
- [`Comp`](/comp) - creating compartments which can be used in the model module
- [`Model`](/model) - for creating models with custom and pre-built compartments
- [`Utils`](/utils) - for epidemiological-related utilities
- [`Com`](/com) - for better modelling of community spread 

Each of these compartments have documentation avaliable.

## The EpiJS Manual
To get you started, I suggest you check out the [EpiJS Manual](/manual/SIR), which is good if you are starting out in epidemiology, or if you are starting out in EpiJS.
