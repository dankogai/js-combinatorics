import { Permutation } from '../combinatorics.js';

const $$ = chai.expect.bind(chai);

describe('class Permutation', () => {
    let seed = 'abcd';
    for (let len = 0; len <= seed.length; len++) {
        let c = new Permutation(seed, len);
        let s = new Set(c);
        it(`new Permutation('${seed}', ${len})`, ()=>$$([...c]).to.deep.equal([...s]));
    }
    seed = 'abcdefghijklmnopqrstuvwxyz0123456789';
    if (typeof BigInt === 'function') {
        const sbn = '371993326789901217467999448150835200000000';
        let c = new Permutation(seed);
        it(`new Permutation('${seed}').length === ${sbn}n`, () => {
            $$(c.length).to.equal(BigInt(sbn));
        });
        it(`new Permutation('${seed}').nth(${sbn}n-1n)`, () => {
            $$(c.nth(BigInt(sbn)-BigInt(1))).to.deep.equal([...seed].reverse())
        });
    } else {
        it.skip(`SKIP new Permutation('${seed}'): BigInt unsupported`, x=>x);
    }
});
