import { Permutation, Combination } from '../combinatorics.js';

const $$ = chai.expect.bind(chai);

class PermComb {
    constructor(seed) {
        this.seed = [...seed];
    }
    [Symbol.iterator]() {
        return function*(it){
            for (let i = 1, l = it.length; i <= l; i++) {
                yield* new Permutation(it, i);
            }
        }(this.seed);
    }
}

describe('Permutation of Combination (not in the module)', () => {
    let seed = [];
    for (let len = 0; len <= 4; seed.push(len++)) {
        let c = new PermComb(seed);
        let s = new Set(c);
        it(`new PermComb([${seed}])`, ()=>$$([...c]).to.deep.equal([...s]));
    }
 });
