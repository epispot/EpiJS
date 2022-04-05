---
home: true
heroImage: https://i.ibb.co/HKt7Bn3/Logo-Makr-4sk-LGO.png
actionText: Get Started
actionLink: /getting-started.html
subActionText: Install
subActionLink: /installation.html
features:
  - title: Customized SIR-Based Models
    details: Easy, customizable SIR based models, with SEIR, SEIRD, SIR, and more models for you to choose from.
  - title: Quick, readable graphs
    details: Quick and readable graphs made with plotly to get the info you need, when you need it.
  - title: Complex models, simple code
    details: Complex models like SEIHCRD models done simply, in only 1-line of code.
---

::: slot heroText
<b class="gradient">Epidemiology,</b> Made Easy
:::

::: slot tagline
EpiJS is a epidemiological modelling package for JavaScript with built-in support for SIR-based models including SIR, SEIR, SEIRD, and other models, along with allowing you to create custom models, model community spread through SIR based models, and more.
:::

Get started by installing the package:
```sh
npm i @epispot/epijs
yarn add @epispot/epijs
pnpm add @epispot/epijs
```
And add it to your code:
```javascript
const epijs = require('@epispot/epijs')
```
With that we can start by creating a super basic SIR model:
```javascript
const sir = epijs.pre.sir(4, 9999, 1, 1/14, 10000, true)

plot(sir, 100, "SIR", "SIR Model (Population vs. Time)")
```
And:
![EpiJS Plot](https://user-images.githubusercontent.com/55121845/148659758-4541ec34-2978-4a52-be3c-710d65d96d02.png)

::: slot footer
GPL-3.0 Licensed | Copyright © 2022-present epispot
:::