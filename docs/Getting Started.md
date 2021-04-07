# Getting Started

Getting started with EpiJS

## Install

```sh linenums="1"
npm install epijs
```
Or use it in your webpage:
``` HTML linenums="1"
<script src="https://cdn.jsdelivr.net/npm/epijs@v1.0.0/index.min.js">
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.0.2/dist/chart.min.js"> <!-- Chart.js is required. -->
```

You can check your installation with:
```javascript linenums="1"
console.log(epijs.about)
```
You should get a bunch of metadata as the output.

## The `Pre` Module

This is the only module EpiJs has currently, and you can use pre-compiled models 
to generate graphs and charts. To check out the functions, see the `pre` docs 
[here](pre.md)