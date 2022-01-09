const assert = require('assert');
const epijs = require('..');
const package = require('../package.json');
const puppeteer = require('puppeteer');

describe('index.js', function () {
    it('should export all modules', function () {
        assert.equal(typeof epijs.plots, 'object');
        assert.equal(typeof epijs.model, 'object');
        assert.equal(typeof epijs.comp, 'object');
        assert.equal(typeof epijs.utils, 'object');
        assert.equal(typeof epijs.pre, 'object');
    });
    it('should have proper metadata', function () {
        assert.equal(epijs.version, package.version);
        assert.equal(epijs.description, package.description);
    })
});

describe('comp.js', function () {
    it('should be able to create compartments', function () {
        let idiom = new epijs.comp.Idiom("S-(B*S*I)")
        let S = new epijs.comp.Susceptible(["I*0.4/N"], [], true)
        let I = new epijs.comp.Infected([0.3], [["S", "I*0.4/N"]], false) 
        let E = new epijs.comp.Exposed([1/14], ["S*0.4/N"], false)
        let C = new epijs.comp.Critical([0.14, 0.1], [["H", 0.3]], false) 
        let H = new epijs.comp.Hospitalized([0.3], [["I", 0.1], ["E", 0.2]], false)
        let D = new epijs.comp.Dead([0.3], [["I", 0.3]], false)
        let V = new epijs.comp.Vaccinated([0.001], ["S*0.4"], false)
        let R = new epijs.comp.Recovered([ ], [["I", 0.1]], false)
    });
    it('should be able to create sub-compartments', function () {
        let idiom = new epijs.comp.Idiom("S-(B*S*I)")
        let S = new epijs.comp.Susceptible(["I*0.4/N"], [], true)
        let I = new epijs.comp.Infected([0.3], [["S", "I*0.4/N"]], false) 
        let E = new epijs.comp.Exposed([1/14], ["S*0.4/N"], false)
        let C = new epijs.comp.Critical([0.14, 0.1], [["H", 0.3]], false) 
        let H = new epijs.comp.Hospitalized([0.3], [["I", 0.1], ["E", 0.2]])
        let D = new epijs.comp.Dead([0.3], [["I", 0.3]], false)
        let V = new epijs.comp.Vaccinated([0.001], ["S*0.4"], false)
        let R = new epijs.comp.Recovered([], [["I", 0.1]], true)

        // Create sub-compartments
        idiom.addSub("sub-compartment", 10)
        S.addSub("sub-compartment", 10)
        I.addSub("sub-compartment", 10)
        E.addSub("sub-compartment", 10)
        C.addSub("sub-compartment", 10)
        H.addSub("sub-compartment", 10)
        D.addSub("sub-compartment", 10)
        V.addSub("sub-compartment", 10)
        R.addSub("sub-compartment", 10)
    });
})

describe('model', function () {
    let S = new epijs.comp.Susceptible(["I*0.4/N"], [], true)        
    let I = new epijs.comp.Infected([0.3], [["S", "I*0.4/N"]], false)        
    let R = new epijs.comp.Recovered([], [["I", 0.1]], true)

    let key = {
        "S": 10000,
        "B": 0.3,
        "I": 100,
        "R": 0,
        "N": 10100,
        "u": 0.2
    };

    it('should be able to create a model', function () {
        let model = new epijs.model.Model([[S, 'S'], [I, 'I'], [R, 'R']], key)

        assert.equal(model.compartments.length, 3);
    });
    it('should be able to get data', function () {
        let model = new epijs.model.Model([[S, 'S'], [I, 'I'], [R, 'R']], key)

        let data = model.get_data(3)
        assert.equal(typeof data, 'object')
        assert.equal(Object.keys(data).length, 3)
    })
    describe('remove/add compartments', function () {
        let S = new epijs.comp.Susceptible(["I*0.4/N"], [], true)        
        let I = new epijs.comp.Infected([0.3], [["S", "I*0.4/N"]], false)        
        let R = new epijs.comp.Recovered([], [["I", 0.1]], true)

        let key = {
            "S": 10000,
            "B": 0.3,
            "I": 100,
            "R": 0,
            "N": 10100,
            "u": 0.2
        };
        
        let model = new epijs.model.Model([[S, 'S'], [I, 'I'], [R, 'R']], key)
        it('should be able to remove compartments', function () {
            model.remove(S)
            assert.equal(Object.keys(model.compartments).length, 2);
        })

        it('should be able to add compartments', function () {
            model.add([S, 'S'], 0)
            assert.equal(Object.keys(model.compartments).length, 3);
        })
    })
})

describe('web', function () {
    this.timeout(60000)
    it('should have no errors on page', async function () {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        let errors = 0
        let errormsgs = []

        page.on('error', err=> {
            errors += 1
            errormsgs.push(err)
        });
            page.on('pageerror', pageerr=> {
            errors += 1
            errormsgs.push(pageerr)
        });


        await page.goto(`file://${__dirname}/web/test.html`);

        if (errors > 0) {
        throw new Error(`There were ${errors} errors: ${errormsgs.join('\n')}`);
        }
        
        await browser.close();
    });
})