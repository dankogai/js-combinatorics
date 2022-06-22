import { doesNotThrow } from "assert";
import { type } from "os";

/**
 * combinatorics.js
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 * 
 *  @author: Dan Kogai <dankogai+github@gmail.com>
 *
 *  References:
 *  @link: http://www.ruby-doc.org/core-2.0/Array.html#method-i-combination
 *  @link: http://www.ruby-doc.org/core-2.0/Array.html#method-i-permutation
 *  @link: http://en.wikipedia.org/wiki/Factorial_number_system
 */
export const version = '2.0.0';
/**
 * BigInt Workaround
 * 
 * https://github.com/streamich/memfs/issues/275
 */
type anyint = number | bigint;
/**
 * Optional<T> will not be official so
 * @link: https://github.com/microsoft/TypeScript/issues/19944
 */
type Optional<T> = T | undefined;
/**
 * calculates `P(n, k)`.
 *
 * @link https://en.wikipedia.org/wiki/Permutation
 */
export function permutation(n: anyint, k: anyint): bigint {
    if (n < 0) throw new RangeError(`${n} is out of range`);
    if (k < 0) throw new RangeError(`${k} is out of range`);
    if (0 == k) return 1n;
    if (n < k) return 0n;
    let [bn, bk, bp] = [BigInt(n), BigInt(k), 1n];
    while (bk--)
        bp *= bn--;
    return bp;
}
/**
 * calculates `C(n, k)`.
 *
 * @link https://en.wikipedia.org/wiki/Combination
 */
export function combination(n: anyint, k: anyint): bigint {
    if (0 == k) return 1n;
    if (n == k) return 1n;
    if (n < k) return 0n;
    return permutation(n, k) / permutation(k, k);
}
/**
 * calculates `n!` === `P(n, n)`.
 *
 * @link https://en.wikipedia.org/wiki/Factorial
 */
export function factorial(n: anyint): bigint {
    return permutation(n, n);
}
/**
 * returns the factoradic representation of `n`, least significant order.
 *
 * @link https://en.wikipedia.org/wiki/Factorial_number_system
 * @param {number} l the number of digits
 */
export function factoradic(n: anyint, l = 0): number[] {
    if (n < 0) throw new RangeError(`${n} is out of range`);
    let [bn, bf] = [BigInt(n), 1n];
    if (!l) {
        for (l = 1; bf < bn; bf *= BigInt(++l))
            ;
        if (bn < bf)
            bf /= BigInt(l--);
    }
    else {
        bf = BigInt(factorial(l));
    }
    let digits = [0];
    for (; l; bf /= BigInt(l--)) {
        digits[l] = Number(bn / bf);
        bn %= bf;
    }
    return digits;
}
/**
 * `combinadic(n, k)` returns a function
 * that takes `m` as an argument and
 * returns the combinadics representation of `m` for `n C k`.
 *
 * @link https://en.wikipedia.org/wiki/Combinatorial_number_system
 */
export function combinadic(n: anyint, k: anyint): (m: anyint) => number[] {
    const count = combination(n, k);
    const [bn, bk] = [BigInt(n), BigInt(k)];
    return (m) => {
        if (m < 0 || count <= m) throw new RangeError(`${m} is out of range`);
        let digits: number[] = [];
        let [ba, bb] = [bn, bk];
        let x = BigInt(count) - 1n - BigInt(m);
        for (let i = 0; i < k; i++) {
            ba--;
            while (x < combination(ba, bb)) ba--;
            digits.push(Number(bn - 1n - ba));
            x -= combination(ba, bb);
            bb--;
        }
        return digits;
    }
}
/**
 *
 */
const _crypto = typeof crypto !== 'undefined' ? crypto : {};
const _randomBytes: (len: number) => Uint8Array
    = typeof _crypto['randomBytes'] === 'function'
        ? (len: number) => Uint8Array.from(_crypto['randomBytes'](len))
        : typeof _crypto['getRandomValues'] === 'function'
            ? (len: number) => _crypto['getRandomValues'](new Uint8Array(len))
            : (len: number) => Uint8Array.from(Array(len), () => Math.random() * 256);
/**
 * returns random integer `n` where `min` <= `n` < `max`:
 *
 * if the argument is `BigInt` the result is also `BigInt`.
 *
 * @param {anyint} min
 * @param {anyint} max
 */
export function randomInteger(min: anyint = 0, max: anyint = Math.pow(2, 53)): anyint {
    let ctor = min.constructor;
    if (arguments.length === 0) {
        return Math.floor(Math.random() * ctor(max));
    }
    if (arguments.length == 1) {
        [min, max] = [ctor(0), min];
    }
    if (typeof min == 'number') {   // number
        [min, max] = [Math.ceil(Number(min)), Math.ceil(Number(max))];
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const mag = ctor(max) - ctor(min);
    const len = mag.toString(16).length;
    const u8s = _randomBytes(len);
    const rnd = u8s.reduce((a, v) => ((a << ctor(8)) + ctor(v)), ctor(0));
    return ((ctor(rnd) * mag) >> ctor(len * 8)) + ctor(min);
};
/**
 * Base Class of `js-combinatorics`
 */
class _CBase<T, U> {
    /**
     * does `new`
     * @param args
     */
    static of(...args) {
        return new (Function.prototype.bind.apply(this, [null].concat(args)));
    }
    /**
     * Same as `of` but takes a single array `arg`
     *
     * cf. https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
     */
    static from(arg) {
        return new (Function.prototype.bind.apply(this, [null].concat(arg)));
    }
    /**
     * Common iterator
     */
    [Symbol.iterator]() {
        return function* (it, len) {
            for (let i = 0n; i < len; i++) yield it.nth(i);
        }(this, this.length);
    }
    /**
     * returns `[...this]`.
     */
    toArray() {
        return [...this];
    }
    /**
     * @deprecated
     * tells wether you need `BigInt` to access all elements.
     */
    get isBig() {
        return Number.MAX_SAFE_INTEGER < this.length;
    }
    /**
     * @deprecated
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
    _check(n: anyint): anyint {
        if (n < 0) {
            if (this.length < -n) throw new RangeError(`${n} is out of range`);
            return BigInt(this.length) + BigInt(n);
        }
        if (this.length <= n) throw new RangeError(`${n} is out of range`);
        return n;
    }
    /**
     * get the `n`th element of the iterator.
     * negative `n` goes backwards
     */
    nth(n: anyint): Optional<U[]> { return [] };
    /**
     * the seed iterable
     */
    seed: T[];
    /**
     * the size (# of elements) of each element.
     */
    size: number;
    /**
     * the number of elements
     */
    length: bigint;
    /**
     * pick random element
     */
    sample(): Optional<U[]> {
        return this.nth(randomInteger(this.length));
    }
    /**
     * an infinite steam of random elements
     */
    samples() {
        return function* (it) {
            while (true) yield it.sample();
        }(this);
    }
}
/**
 * Permutation
 */
export class Permutation<T> extends _CBase<T, T> {
    constructor(seed: Iterable<T>, size = 0) {
        super();
        this.seed = [...seed];
        this.size = 0 < size ? size : this.seed.length;
        this.length = permutation(this.seed.length, this.size);
        Object.freeze(this);
    }
    nth(n: anyint): Optional<T[]> {
        n = this._check(n);
        if (n === undefined) return undefined;
        const offset = this.seed.length - this.size;
        const skip = factorial(offset);
        let digits = factoradic(BigInt(n) * BigInt(skip), this.seed.length);
        let source = this.seed.slice();
        let result: T[] = [];
        for (let i = this.seed.length - 1; offset <= i; i--) {
            result.push(source.splice(digits[i], 1)[0]);
        }
        return result;
    }
}
/**
 * Combination
 */
export class Combination<T> extends _CBase<T, T> {
    comb: (anyint) => number[];
    constructor(seed: Iterable<T>, size = 0) {
        super();
        this.seed = [...seed];
        this.size = 0 < size ? size : this.seed.length;
        this.size = size;
        this.length = combination(this.seed.length, this.size);
        this.comb = combinadic(this.seed.length, this.size);
        Object.freeze(this);
    }
    /**
     * returns an iterator which is more efficient
     * than the default iterator that uses .nth
     *
     * @link https://en.wikipedia.org/wiki/Combinatorial_number_system#Applications
     */
    bitwiseIterator() {
        // console.log('overriding _CBase');
        if (typeof BigInt !== 'function') throw new TypeError(`needs BigInt`);
        const inc = (x: bigint): bigint => {
            const u = x & -x;
            const v = u + x;
            return v + (((v ^ x) / u) >> 2n);
        }
        let x = (1n << BigInt(this.size)) - 1n; // 0b11...1
        return function* (it, len) {
            for (let i = 0n; i < BigInt(len); i++, x = inc(x)) {
                let result: T[] = [];
                for (let y = x, j = 0; 0n < y; y >>= 1n, j++) {
                    if (y & 1n) result.push(it.seed[j]);
                }
                // console.log(`x = ${x}`);
                yield result;
            }
        }(this, this.length);
    }
    nth(n: anyint): Optional<T[]> {
        n = this._check(n);
        if (n === undefined) return undefined;
        let result: T[] = [];
        for (let i of this.comb(n)) {
            result.push(this.seed[i]);
        }
        return result;
    }
}
/**
 * Base N
 */
export class BaseN<T> extends _CBase<T, T> {
    base: number;
    constructor(seed: Iterable<T>, size = 1) {
        if (size < 1) throw new RangeError(`${size} is out of range`);
        super();
        this.seed = [...seed];
        this.size = size;
        let base = this.seed.length;
        this.base = base;
        this.length = BigInt(size) ** BigInt(base);
        Object.freeze(this);
    }
    nth(n: anyint): Optional<T[]> {
        n = this._check(n);
        if (n === undefined) return undefined;
        let bn = BigInt(n);
        const bb = BigInt(this.base);
        let result: T[] = [];
        for (let i = 0; i < this.size; i++) {
            let bd = bn % bb;
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
export class PowerSet<T> extends _CBase<T, T> {
    constructor(seed: Iterable<T>) {
        super();
        this.seed = [...seed];
        const length = 1n << BigInt(this.seed.length);
        this.length = length;
        Object.freeze(this);
    }
    nth(n: anyint): Optional<T[]> {
        n = this._check(n);
        if (n === undefined) return undefined;
        let bn = BigInt(n);
        let result: T[] = [];
        for (let bi = 0n; bn; bn >>= 1n, bi++)
            if (bn & 1n)
                result.push(this.seed[Number(bi)]);
        return result;
    }
}
/**
 * Cartesian Product
 */
export class CartesianProduct<T> extends _CBase<T[], T> {
    constructor(...args: Iterable<T>[]) {
        super();
        this.seed = args.map(v => [...v]);
        this.size = this.seed.length;
        const length = this.seed.reduce((a, v) => a * BigInt(v.length), 1n);
        this.length = length;
        Object.freeze(this);
    }
    nth(n: anyint): Optional<T[]> {
        n = this._check(n);
        if (n === undefined) return undefined;
        let bn = BigInt(n);
        let result: T[] = [];
        for (let i = 0; i < this.size; i++) {
            const base = this.seed[i].length;
            const bb = BigInt(base);
            const bd = bn % bb;
            result.push(this.seed[i][Number(bd)]);
            bn -= bd;
            bn /= bb;
        }
        return result;
    }
}
