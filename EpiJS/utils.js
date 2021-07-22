/**
 * @file Epidemiological Utilities, like calculating the R-Naught and the infection rate of a disease.
 *
 * Import it with:
 * ```
 *    const utils = require('@epispot/epijs').utils
 * ```
 */

/**
 * Calculate R-Naught
 * @param {Number} b The infection rate
 * @param {Number} u The recovery rate
 */
function calcrn (b, u) { 
    return b/u
};

/** 
 * Calculate Infection rate
 * @param {Number} rn R-Naught Value
 * @param {Number} u1 The recovery rate
 */
function calcb (rn, u1) {
    return rn*u1
};


/** 
 * Calculate Recovery Rate
 * @param {Number} rn1 R-Naught Value
 * @param {Number} b1 The infection rate
 */
function calcu (rn1, b1) {
    return b1/rn1
};

exports.calcrn = calcrn;
exports.calcb = calcb;
exports.calcu = calcu;