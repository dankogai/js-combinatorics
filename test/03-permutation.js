import { Permutation } from '../combinatorics.js';

const $$ = chai.expect.bind(chai);

describe('class Permutation', () => {
    let seed = 'abcd';
    for (let len = 0; len <= seed.length; len++) {
        let c = [... new Permutation(seed, len)];
        let s = [... new Set(c.map(v => [...new Set(v)]))];
        it(`new Permutation('${seed}', ${len})`,
            () => $$(c).to.deep.equal(s));
    }
    let c = new Permutation(seed);
    it(`.nth(-1) === .nth(.length-1)`, () =>
        $$(c.nth(-1)).to.deep.equal(c.nth(c.length - 1)));
    seed = 'abcdefghijklmnopqrstuvwxyz0123456789';
    if (typeof BigInt === 'function') {
        const sbn = '371993326789901217467999448150835200000000';
        let c = new Permutation(seed);
        it(`new Permutation('${seed}').length === ${sbn}n`, () => {
            $$(c.length).to.equal(BigInt(sbn));
        });
        it(`.nth(${sbn}n-1n)`, () => {
            $$(c.nth(BigInt(sbn) - BigInt(1))).to.deep.equal([...seed].reverse())
        });
        it('.nth(-1n) === .nth(.length-1n)', () =>
            $$(c.nth(-BigInt(1))).to.deep.equal(c.nth(c.length - BigInt(1))));
    } else {
        it.skip(`SKIP new Permutation('${seed}'): BigInt unsupported`, x => x);
    }
});
