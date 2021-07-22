(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{374:function(t,a,s){"use strict";s.r(a);var n=s(44),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h3",{attrs:{id:"table-of-contents"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#table-of-contents"}},[t._v("#")]),t._v(" Table of Contents")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#plot"}},[t._v("plot")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#parameters"}},[t._v("Parameters")])]),t._v(" "),s("li",[s("a",{attrs:{href:"#examples"}},[t._v("Examples")])])])]),t._v(" "),s("li",[s("a",{attrs:{href:"#manipulate"}},[t._v("manipulate")])])]),t._v(" "),s("h2",{attrs:{id:"plot"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#plot"}},[t._v("#")]),t._v(" Plot")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("*   [Examples][7]\n")])])]),s("h2",{attrs:{id:"chart"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#chart"}},[t._v("#")]),t._v(" chart")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("   const plots = require('@epispot/epijs').plots\n")])])]),s("h2",{attrs:{id:"plot-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#plot-2"}},[t._v("#")]),t._v(" plot")]),t._v(" "),s("p",[t._v("Plots a output of a model from the pre module.")]),t._v(" "),s("h3",{attrs:{id:"parameters"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#parameters"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("model")]),t._v(" "),s("strong",[s("a",{attrs:{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array",target:"_blank",rel:"noopener noreferrer"}},[t._v("Array"),s("OutboundLink")],1)]),t._v(" The output from the pre module function.")]),t._v(" "),s("li",[s("code",[t._v("options")]),t._v(" "),s("strong",[s("a",{attrs:{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array",target:"_blank",rel:"noopener noreferrer"}},[t._v("Object"),s("OutboundLink")],1)]),t._v(" Optional. Custom configuration to pass into the options parameter for chart.js, defaults to:")])]),t._v(" "),s("div",{staticClass:"language-JSON extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[t._v("*   `days` **"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Number"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("** The amount of days to plot\n*   `colors` **"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Array"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("** Custom colors for the graph"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" in the same order the compartments are. (optional"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" default `"),s("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),t._v("`)\n*   `options` **"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Object"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("11")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("** Optional. Custom configuration to pass into the options parameter for chart.js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" defaults to"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("```JSON\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     title"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         display"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n         text"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Total Cases"')]),t._v("\n     "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n     scales"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         yAxes"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n             ticks"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                 beginAtZero"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n             "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n```     "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    ``` (optional"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" default `"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("title"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("display"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("text"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("'Total Cases'"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("scales"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("yAxes"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("ticks"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("beginAtZero"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("`)\n\n### Examples\n\n```javascript\nlet sirout1 = sir("),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("9999")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("/"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("21")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10999")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(")\n\nplot(sirout1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"canvas-pre1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),t._v(") "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Plots data for 100 days onto the canvas-pre1 chart, with the data from the SIR model.")]),t._v("\n")])])]),s("p",[t._v("Returns "),s("strong",[t._v("any")]),t._v(" Returns the chart.js chart, if needed for modification.")]),t._v(" "),s("h2",{attrs:{id:"manipulate"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#manipulate"}},[t._v("#")]),t._v(" manipulate")]),t._v(" "),s("p",[t._v("Manipulate the chart.js graph")]),t._v(" "),s("h3",{attrs:{id:"parameters-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#parameters-2"}},[t._v("#")]),t._v(" Parameters")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("id")]),t._v("  The chart.js graph")]),t._v(" "),s("li",[s("code",[t._v("mvalue")]),t._v(" "),s("strong",[s("a",{attrs:{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String",target:"_blank",rel:"noopener noreferrer"}},[t._v("String"),s("OutboundLink")],1)]),t._v(" The value to manipulate in "),s("code",[t._v("chart.data.datasets[x]")]),t._v(". This can be any valid chart.js parameter. See "),s("a",{attrs:{href:"https://www.chartjs.org/docs/v2.0.0/charts/line.html#line-styling",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.chartjs.org/docs/v2.0.0/charts/line.html#line-styling"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("code",[t._v("value")]),t._v("  The value to insert into the graph")])]),t._v(" "),s("h3",{attrs:{id:"examples"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[t._v("#")]),t._v(" Examples")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" sirout1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sir")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("9999")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("21")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10999")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" sirplot "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("plot")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sirout1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"canvas-pre1"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nsirplot"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("manipulate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sirplot"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"fill"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Set fill to true")]),t._v("\n")])])]),s("p",[t._v("Returns "),s("strong",[t._v("any")]),t._v(" The chart.js graph")])])}),[],!1,null,null,null);a.default=e.exports}}]);