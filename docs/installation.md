---
    title: EpiJS - Installation
---

# Installation

The prefered way of installation is through npm or in your html:

:::: tabs

::: tab NodeJS
```SH
npm install @epispot/epijs
yarn add @epispot/epijs
```
:::
::: tab HTML

```HTML
<script src="https://cdn.jsdelivr.net/gh/epispot/EpiJS/web/index.min.js"></script>
```
:::
::::


## Other Installation Methods

EpiJS can also be built from the source, however, this might introduce bugs.
```SH
git clone https://github.com/epispot/EpiJS.git --depth=1
cd EpiJS
```
Once cloned you can use it in the prefered way:

:::: tabs
::: tab NodeJS
Install
```SH
npm install .
```
Require:
```JAVASCRIPT
const epijs = require('./epijs/')
```
:::
::: tab HTML
First build:
```SH
npm run build
```
Then import:
```HTML
<script src="./web/index.min.js"></script>
```
:::
::::

### CDNs

EpiJS is avaliable on multiple CDNs:

:::: tabs
::: tab JSDelivr
```HTML
<script src="https://cdn.jsdelivr.net/gh/epispot/EpiJS@2.0.0/web/index.min.js"></script>
```
:::
::: tab Unpkg
```HTML
<script src="https://unpkg.com/@epispot/epijs@2.0.0/web/index.min.js"></script>
```
:::
::: tab CDNJS
```HTML
<script src="https://cdnjs.cloudflare.com/ajax/libs/epijs/2.0.0/index.min.js"></script>
```
:::
::: tab Download
Alternatively, you can download the minified js attachment and use that yourself from [here](https://github.com/epispot/EpiJS/releases/)
```HTML
<script src="./epijs.min.js"></script>
```
Download is also avaliable through npm/yarn:
```SH
yarn add @epispot/epijs
npm install @epispot/epijs
```
And in your html:
```HTML
<script src="./node_modules/@epispot/epijs/web/index.min.js"></script>
```
:::
::::