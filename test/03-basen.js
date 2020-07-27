import { BaseN } from '../combinatorics.js';

const $$ = chai.expect.bind(chai);

describe('class BaseN', () => {
    let seed = '0123';
    for (let len = 0; len <= seed.length; len++) {
        let c = new BaseN(seed, len);
        let s = new Set(c);
        it(`new BaseN('${seed}', ${len})`, () => $$([...c]).to.deep.equal([...s]));
    }
    seed = '0123456789abcdef';
    let c = new BaseN(seed, 8);
    it(`.nth(-1) === .nth(.length-1)`, () =>
        $$(c.nth(-1)).to.deep.equal(c.nth(c.length - 1)));

    if (typeof BigInt === 'function') {
        const sbn = '18446744073709551616';
        let c = new BaseN(seed, 16);
        it(`new BaseN('${seed}', 16).length === ${sbn}n`, () => {
            $$(c.length).to.equal(BigInt(sbn));
        });
        it(`.nth(${sbn}n-1n)`, () => {
            $$(c.nth(BigInt(sbn) - BigInt(1))).to.deep.equal([...'ffffffffffffffff'])
        });
        it('.nth(-1n) === .nth(.length-1n)', () =>
            $$(c.nth(-BigInt(1))).to.deep.equal(c.nth(c.length - BigInt(1))));
    } else {
        it.skip(`SKIP new BaseN('${seed}',16): BigInt unsupported`, x => x);
    }
});
