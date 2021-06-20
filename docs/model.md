---
title: EpiJS Module - Model
---
<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [Model][1]
    *   [Parameters][2]
    *   [get_data][3]
        *   [Parameters][4]
        *   [Examples][5]
*   [Model][6]
    *   [Parameters][7]
    *   [get_data][8]
        *   [Parameters][9]
        *   [Examples][10]

# Model

EpiJS module for creating custom models, which are made of compartments.

Import it with:
```javascript
       const comp = require('@quantalabs/epijs').model
```
## Model
Create custom models from compartments.
### Parameters

*   `compartments`  
*   `key`  

### get_data

Get data for the outbreak.

#### Parameters

*   `time` **[Number][11]** The total time to model.

#### Examples

```javascript
let susceptible = new Idiom("S-(B*S*I/p)");
     let infected = new Idiom("I+(B*S*I/p)-(u*I)");
     let recovered = new Idiom("R+(u*I)");

     let key = {
       "S": 10000,
       "B": 0.3,
       "I": 100,
       "R": 0,
       "p": 10100,
       "u": 0.2
     };

     let sirm = new Model([[susceptible, "S"], [infected, "I"], [recovered, "R"]], key)

     model.get_data(100) // Get data for 100 days.
```

[1]: #model-2

[2]: #parameters

[3]: #get_data

[4]: #parameters-1

[5]: #examples

[6]: #model-1

[7]: #parameters-2

[8]: #get_data-1

[9]: #parameters-3

[10]: #examples-1

[11]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[12]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[13]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object