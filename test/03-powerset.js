import { PowerSet } from '../combinatorics.js';

const $$ = chai.expect.bind(chai);

describe('class PowerSet', () => {
    let seed = [];
    for (let len = 0; len <= 8; seed.push(len++)) {
        let c = new PowerSet(seed);
        let s = new Set(c);
        it(`new PowerSet([${seed}])`, ()=>$$([...c]).to.deep.equal([...s]));
    }
    seed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    if (typeof BigInt === 'function') {
        const sbn = '18446744073709551616';
        let c = new PowerSet(seed);
        it(`new PowerSet('${seed}').length === ${sbn}n`, () => {
            $$(c.length).to.equal(BigInt(sbn));
        });
        it(`.nth(${sbn}n-1n)`, () => {
            $$(c.nth(BigInt(sbn)-BigInt(1))).to.deep.equal([...seed])
        });
    } else {
        it.skip(`SKIP new PowerSet('${seed}'): BigInt unsupported`, x=>x);
    }
});
