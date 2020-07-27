import { Combination } from '../combinatorics.js';

const $$ = chai.expect.bind(chai);

describe('class Combination', () => {
    let seed = 'abcdefgh';
    for (let len = 0; len <= seed.length; len++) {
        let c = new Combination(seed, len);
        let s = new Set(c);
        it(`new Combination('${seed}', ${len})`, () => $$([...c]).to.deep.equal([...s]));
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
            $$(c.nth(BigInt(sbn) - BigInt(1))).to.deep.equal([
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
                22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
                38, 76, 36, 41, 40, 81, 84, 62, 87, 83, 43,
                91, 88, 33, 34, 35, 39
            ])
        });
        it('.nth(-1n) === .nth(.length-1n)', () =>
            $$(c.nth(-BigInt(1))).to.deep.equal(c.nth(c.length - BigInt(1))));
    } else {
        it.skip(`SKIP new Combination([0,1...99]): BigInt unsupported`, x => x);
    }
});
