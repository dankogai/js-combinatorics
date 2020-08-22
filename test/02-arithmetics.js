import {
    permutation, combination, factorial,factoradic
} from '../combinatorics.js';

const $$ = chai.expect.bind(chai);

describe('permutation', () => {
    it('permutation(3,2) === 6', ()=>$$(permutation(3, 2)).to.equal(6));
    it('permutation(1,1) === 1', ()=>$$(permutation(1, 1)).to.equal(1));
    it('permutation(1,0) === 1', ()=>$$(permutation(1, 0)).to.equal(1));
    it('permutation(2,5) === 0', ()=>$$(permutation(2, 5)).to.equal(0));
    if (!isLegacySafari) {
        it('permutation(5,1.5) throws RangeError', () => {
            chai.assert.throws(() => permutation(5, 1.5), RangeError)
        });
        it('permutation(5, -1) throws RangeError', () => {
            chai.assert.throws(() => permutation(5, -1), RangeError)
        });
    } else {
        it.skip('SKIP permutation(5,1.5): assert.throws may not work', x=>x);
        it.skip('SKIP permutation(5, -1): assert.throws may not work', x=>x);

    }
    if (typeof BigInt === 'function') {
        const sbn = '10333147966386144929666651337523200000000';
        it(`permutation(35,35) === ${sbn}n`, () => {
            $$(permutation(35,35)).to.equal(BigInt(sbn));
        });
    } else {
        it.skip('SKIP permutation(35,35): BigInt unsupported', x=>x);
    }
});

describe('combination', () => {
    it('combination(3,2) === 3', ()=>$$(combination(3, 2)).to.equal(3));
    it('combination(1,1) === 1', ()=>$$(combination(1, 1)).to.equal(1));
    it('combination(1,0) === 1', ()=>$$(combination(1, 0)).to.equal(1));
    it('combination(2,5) === 0', ()=>$$(combination(2, 5)).to.equal(0));
    if (!isLegacySafari) {
        it('combination(5,1.5) throws RangeError', () => {
            chai.assert.throws(() => combination(5, 1.5), RangeError)
        });
        it('combination(5, -1) throws RangeError', () => {
            chai.assert.throws(() => combination(5, -1), RangeError)
        });
    } else {
        it.skip('SKIP combination(5,1.5): assert.throws may not work', x=>x);
        it.skip('SKIP combination(5, -1): assert.throws may not work', x=>x);
    }
    if (typeof BigInt === 'function') {
        const sbn = '23951146041928082866135587776380551750';
        it(`combination(128,64) === ${sbn}n`, () => {
            $$(combination(128,64)).to.equal(BigInt(sbn));
        });
    } else {
        it.skip('SKIP combination(128,64): BigInt unsupported', x=>x);
    }
});

describe('factoradic', () => {
    const count = function*(n) {
        let i = 0; while (i < n) yield i++;
    };
    for (let i of count(32)) {
        let n = factorial(i);
        if (Number.MAX_SAFE_INTEGER <= --n) {
            if (typeof BigInt !== 'function') {
                it.skip(`SKIP factoradic(${i}! - 1): BigInt unsupported`, x=>x);
                break;
            }
        }
        const a = i == 0 ? [0] : [...count(i)];
        it(`factoradic(${i}! - 1)`, () => 
            $$(factoradic(n)).to.deep.equal(a)
        );
    }
});
