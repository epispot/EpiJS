---
    title: EpiJS - Getting Started
---

# Getting Started

Getting started with EpiJS

## Install

```sh
npm install epijs
```
Or use it in your webpage:
```HTML
<script src="https://cdn.jsdelivr.net/gh/Quantalabs/EpiJS/web/pre.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.0.2/dist/chart.min.js"> <!-- Chart.js is required. -->
```

## Metadata

You can fetch metadata about the package with the following commands (this is only with the NPM Package, unfortunatley):
```js
epijs.about // General metadata
epijs.version // Your current package version
```

## The `Pre` Module

This is the only module EpiJs has currently, and you can use pre-compiled models 
to generate graphs and charts. To check out the functions, see the `pre` docs 
[here](pre.md)
