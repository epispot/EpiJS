/**
 * @file Epidemiological Utilities, like calculating the R-Naught and the infection rate of a disease.
 *
 * Import it with:
 * ```
 *    const comp = require('@quantalabs/epijs').comp
 * ```
 */

/**
 * Calculate R-Naught
 * @param {Number} b The infection rate
 * @param {Number} u The recovery rate
 */
function rn (b, u) { // skipcq: JS-0085
    return b/u
};

/** 
 * Calculate Infection rate
 * @param {Number} rn R-Naught Value
 * @param {Number} u The recovery rate
 */
function b (rn, u) { // skipcq: JS-0085
    return rn*u
};


/** 
 * Calculate Recovery Rate
 * @param {Number} rn R-Naught Value
 * @param {Number} b The infection rate
 */
function u (rn, b) { // skipcq: JS-0085
    return b/rn
};

exports.rn = rn;
exports.b = b;
exports.u = u;