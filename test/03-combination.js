import { Combination } from '../combinatorics.js';

const $$ = chai.expect.bind(chai);

describe('class Combination', () => {
    let seed = 'abcdefgh';
    for (let len = 0; len <= seed.length; len++) {
        let c = [...new Combination(seed, len)];
        let s = [...new Set(c.slice(0).map(v => v.sort()))];
        // all unique, each in lex order
        it(`new Combination('${seed}', ${len})`, () => $$(c).to.deep.equal(s));
    }
    let c = new Combination(seed, 4);
    it(`.nth(-1) === .nth(.length-1)`, () =>
        $$(c.nth(-1)).to.deep.equal(c.nth(c.length - 1)));
    seed = Array(100).fill(0).map((v, i) => i);
    if (typeof BigInt === 'function') {
        const sbn = '100891344545564193334812497256';
        let c = new Combination(seed, 50);
        it(`new Combination([0,1...99],50).length === ${sbn}n`, () => {
            $$(c.length).to.equal(BigInt(sbn));
        });
        it(`.nth(${sbn}n-1n)`, () => {
            $$(c.nth(BigInt(sbn) - BigInt(1))).to.deep.equal(
                Array(50).fill(50).map((v, i) => v + i)
            )
        });
        it('.nth(-1n) === .nth(.length-1n)', () =>
            $$(c.nth(-BigInt(1))).to.deep.equal(c.nth(c.length - BigInt(1))));
    } else {
        it.skip(`SKIP new Combination([0,1...99]): BigInt unsupported`, x => x);
    }
});
