import { CartesianProduct } from '../combinatorics.js';

const $$ = chai.expect.bind(chai);

describe('class CartesianProduct', () => {
    let seed = [];
    for (let len = 0; len <= 4; seed.push('0123'), len++) {
        let c = CartesianProduct.from(seed);
        let s = new Set(c);
        let seedstr = JSON.stringify(seed)
        it(`new CartesianProduct(${seedstr})`, () => $$([...c]).to.deep.equal([...s]));
    }
    let c = CartesianProduct.from(seed);
    it(`.nth(-1) === .nth(.length-1)`, () =>
        $$(c.nth(-1)).to.deep.equal(c.nth(c.length - 1)));
    seed = Array(16).fill('0123456789abcdef');
    if (typeof BigInt === 'function') {
        const sbn = '18446744073709551616';
        let c = CartesianProduct.from(seed);
        it(`new CartesianProduct(...'0123456789abcdef').length === ${sbn}n`, () => {
            $$(c.length).to.equal(BigInt(sbn));
        });
        it(`.nth(${sbn}n-1n)`, () => {
            $$(c.nth(BigInt(sbn) - BigInt(1))).to.deep.equal([...'ffffffffffffffff']);
        });
        it('.nth(-1n) === .nth(.length-1n)', () =>
            $$(c.nth(-BigInt(1))).to.deep.equal(c.nth(c.length - BigInt(1))));
    } else {
        it.skip(`SKIP new CartesianProduct('${seed}'): BigInt unsupported`, x => x);
    }
});
