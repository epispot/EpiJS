---
    title: EpiJS - Installation
---

# Installation

The prefered way of installation is through npm or in your html:

:::: tabs

::: tab NodeJS
```SH
npm install @quantalabs/epijs
yarn add @quantalabs/epijs
```
:::
::: tab HTML

```HTML
<script src="https://cdn.jsdelivr.net/gh/Quantalabs/EpiJS/web/index.min.js"></script>
```
:::
::::


## Other Installation Methods

EpiJS can also be built from the source, however, this might introduce bugs.
```SH
git clone https://github.com/Quantalabs/EpiJS.git --depth=1
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
const epijs = require('@quantalabs/epijs')
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
<script src="https://cdn.jsdelivr.net/gh/Quantalabs/EpiJS/web/index.min.js"></script>
```
:::
::: tab Unpkg
```HTML
<script src="https://unpkg.com/@quantalabs/epijs@2.0.0/web/index.min.js"></script>
```
:::
::: tab CDNJS
Coming soon. Our PR has been submitted, we are waiting for approval. Watch the status [here](https://github.com/cdnjs/packages/pull/775)
:::
::: tab Download
Alternatively, you can download the minified js attachment and use that yourself from [here](https://github.com/Quantalabs/EpiJS/releases/)
```HTML
<script src="./epijs.min.js"></script>
:::
::::