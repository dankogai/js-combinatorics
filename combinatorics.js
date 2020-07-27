/**
 * combinatorics.js
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 *
 * @typedef {(number|bigint)} aint
 *
 *  @author: Dan Kogai <dankogai+github@gmail.com>
 *  References:
 *  @link: http://www.ruby-doc.org/core-2.0/Array.html#method-i-combination
 *  @link: http://www.ruby-doc.org/core-2.0/Array.html#method-i-permutation
 *  @link: http://en.wikipedia.org/wiki/Factorial_number_system
 */
export const version = '1.2.0';
const _BI = typeof BigInt == 'function' ? BigInt : Number;
/**
 * crops BigInt
 */
const _crop = (n) => n <= Number.MAX_SAFE_INTEGER ? Number(n) : _BI(n);
/**
 * calculates `P(n, k)`.
 *
 * @link https://en.wikipedia.org/wiki/Permutation
 */
export function permutation(n, k) {
    [n, k] = [_BI(n), _BI(k)];
    let p = _BI(1);
    while (k--)
        p *= n--;
    return _crop(p);
}
/**
 * calculates `C(n, k)`.
 *
 * @link https://en.wikipedia.org/wiki/Combination
 */
export function combination(n, k) {
    const P = permutation;
    const c = _BI(P(n, k)) / _BI(P(k, k));
    return _crop(c);
}
/**
 * calculates `n!` === `P(n, n)`.
 *
 * @link https://en.wikipedia.org/wiki/Factorial
 */
export function factorial(n) {
    return permutation(n, n);
}
/**
 * returns the factoradic representation of `n`, least significant order.
 *
 * @link https://en.wikipedia.org/wiki/Factorial_number_system
 * @param {number} l the number of digits
 */
export function factoradic(n, l = 0) {
    let [bn, bf] = [_BI(n), _BI(1)];
    if (!l) {
        for (l = 1; bf < bn; bf *= _BI(++l))
            ;
        if (bn < bf)
            bf /= _BI(l--);
    }
    else {
        bf = _BI(factorial(l));
    }
    let digits = [0];
    for (; l; bf /= _BI(l--)) {
        digits[l] = Math.floor(Number(bn / bf));
        bn %= bf;
    }
    return digits;
}
/**
 * Base Class of `js-combinatorics`
 */
class _CBase {
    /**
     * does `new`
     * @param args
     */
    static make(...args) {
        return new (Function.prototype.bind.apply(this, [null].concat(args)));
    }
    /**
     * Same as `make` but takes a single array `arg`
     *
     * cf. https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
     */
    static vmake(arg) {
        return new (Function.prototype.bind.apply(this, [null].concat(arg)));
    }
    /**
     * Common iterator
     */
    [Symbol.iterator]() {
        return function* (length, that) {
            let i = 0;
            while (i < length)
                yield that.nth(i++);
        }(this.length, this);
    }
    /**
     * returns `[...this]`.
     */
    toArray() {
        return [...this];
    }
    /**
     * tells wether you need `BigInt` to access all elements.
     */
    get isBig() {
        return Number.MAX_SAFE_INTEGER < this.length;
    }
    /**
     * tells wether it is safe to work on this instance.
     *
     * * always `true` unless your platform does not support `BigInt`.
     * * if not, `true` iff `.isBig` is `false`.
     */
    get isSafe() {
        return typeof BigInt !== 'undefined' || !this.isBig;
    }
    /**
    * check n for nth
    */
    _check(n) {
        if (n < 0) {
            if (this.length < -n)
                throw RangeError(`${n} is too small`);
            return _crop(_BI(this.length) + _BI(n));
        }
        if (this.length <= n)
            throw RangeError(`${n} is too large`);
        return n;
    }
    nth(n) { return []; }
    ;
}
/**
 * Permutation
 */
export class Permutation extends _CBase {
    constructor(seed, size = 0) {
        super();
        this.seed = [...seed];
        this.size = 0 < size && size <= this.seed.length ? size : this.seed.length;
        this.length = permutation(seed.length, this.size);
        Object.freeze(this);
    }
    nth(n, nocheck = false) {
        if (!nocheck)
            n = this._check(n);
        const offset = this.seed.length - this.size;
        const skip = factorial(offset);
        let digits = factoradic(_BI(n) * _BI(skip), this.seed.length);
        let source = this.seed.slice();
        let result = [];
        for (let i = this.seed.length - 1; offset <= i; i--) {
            result.push(source.splice(digits[i], 1)[0]);
        }
        return result;
    }
}
/**
 * Combination
 */
export class Combination extends _CBase {
    constructor(seed, size = 0) {
        super();
        const sseed = [...seed];
        this.perm = new Permutation(sseed, size);
        this.size = this.perm.size;
        this.length = combination(sseed.length, this.size);
        Object.freeze(this);
    }
    nth(n) {
        n = this._check(n);
        function findIndex(n) {
            const [one, two] = typeof n === 'bigint' ? [_BI(1), _BI(2)] : [1, 2];
            if (n <= two)
                return n;
            let p = n - one;
            let s = p & -p;
            let r = p + s;
            let t = r & -r;
            let m = ((t / s) >> one) - one;
            return r | m;
        }
        return this.perm.nth(findIndex(n), true);
    }
}
/**
 * Base N
 */
export class BaseN extends _CBase {
    constructor(seed, size = 1) {
        super();
        this.seed = [...seed];
        this.size = size;
        let base = this.seed.length;
        this.base = base;
        let length = size < 1 ? 0
            : Array(size).fill(_BI(base)).reduce((a, v) => a * v);
        this.length = _crop(length);
        Object.freeze(this);
    }
    nth(n) {
        let bn = _BI(this._check(n));
        const bb = _BI(this.base);
        let result = [];
        for (let i = 0; i < this.size; i++) {
            var bd = bn % bb;
            result.push(this.seed[Number(bd)]);
            bn -= bd;
            bn /= bb;
        }
        return result;
    }
}
/**
 * Power Set
 */
export class PowerSet extends _CBase {
    constructor(seed) {
        super();
        this.seed = [...seed];
        const length = _BI(1) << _BI(this.seed.length);
        this.length = _crop(length);
        Object.freeze(this);
    }
    nth(n) {
        let bn = _BI(this._check(n));
        let result = [];
        for (let bi = _BI(0); bn; bn >>= _BI(1), bi++)
            if (bn & _BI(1))
                result.push(this.seed[Number(bi)]);
        return result;
    }
}
/**
 * Cartesian Product
 */
export class CartesianProduct extends _CBase {
    constructor(...args) {
        super();
        this.seed = args.map(v => [...v]);
        this.size = this.seed.length;
        const length = this.seed.reduce((a, v) => a * _BI(v.length), _BI(1));
        this.length = _crop(length);
        Object.freeze(this);
    }
    nth(n) {
        let bn = _BI(this._check(n));
        let result = [];
        for (let i = 0; i < this.size; i++) {
            const base = this.seed[i].length;
            const bb = _BI(base);
            const bd = bn % bb;
            result.push(this.seed[i][Number(bd)]);
            bn -= bd;
            bn /= bb;
        }
        return result;
    }
}
