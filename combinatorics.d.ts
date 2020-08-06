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
export declare const version = "1.3.0";
/**
 * BigInt Workaround
 *
 * https://github.com/streamich/memfs/issues/275
 */
declare type anyint = number | bigint;
/**
 * Optional<T> will not be official so
 * @link: https://github.com/microsoft/TypeScript/issues/19944
 */
declare type Optional<T> = T | undefined;
/**
 * calculates `P(n, k)`.
 *
 * @link https://en.wikipedia.org/wiki/Permutation
 */
export declare function permutation(n: anyint, k: anyint): number | bigint;
/**
 * calculates `C(n, k)`.
 *
 * @link https://en.wikipedia.org/wiki/Combination
 */
export declare function combination(n: anyint, k: anyint): number | bigint;
/**
 * calculates `n!` === `P(n, n)`.
 *
 * @link https://en.wikipedia.org/wiki/Factorial
 */
export declare function factorial(n: anyint): number | bigint;
/**
 * returns the factoradic representation of `n`, least significant order.
 *
 * @link https://en.wikipedia.org/wiki/Factorial_number_system
 * @param {number} l the number of digits
 */
export declare function factoradic(n: anyint, l?: number): number[];
/**
 * returns random integer `n` where `min` <= `n` < `max`:
 *
 * if the argument is `BigInt` the result is also `BigInt`.
 *
 * @param {anyint} min
 * @param {anyint} max
 */
export declare function randomInteger(min?: anyint, max?: anyint): any;
/**
 * Base Class of `js-combinatorics`
 */
declare class _CBase {
    /**
     * does `new`
     * @param args
     */
    static of(...args: any[]): any;
    /**
     * Same as `of` but takes a single array `arg`
     *
     * cf. https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
     */
    static from(arg: any): any;
    /**
     * Common iterator
     */
    [Symbol.iterator](): Generator<any[], void, unknown>;
    /**
     * returns `[...this]`.
     */
    toArray(): any[][];
    /**
     * tells wether you need `BigInt` to access all elements.
     */
    get isBig(): boolean;
    /**
     * tells wether it is safe to work on this instance.
     *
     * * always `true` unless your platform does not support `BigInt`.
     * * if not, `true` iff `.isBig` is `false`.
     */
    get isSafe(): boolean;
    /**
    * check n for nth
    */
    _check(n: anyint): Optional<anyint>;
    nth(n: anyint): Optional<any[]>;
    seed: any[];
    size: number;
    length: anyint;
    sample(): Optional<any[]>;
    samples(): Generator<any[], never, unknown>;
}
/**
 * Permutation
 */
export declare class Permutation extends _CBase {
    constructor(seed: any, size?: number);
    nth(n: anyint, nocheck?: boolean): Optional<any[]>;
}
/**
 * Combination
 */
export declare class Combination extends _CBase {
    perm: Permutation;
    constructor(seed: Iterable<any>, size?: number);
    nth(n: anyint): Optional<any[]>;
}
/**
 * Base N
 */
export declare class BaseN extends _CBase {
    base: number;
    constructor(seed: Iterable<any>, size?: number);
    nth(n: anyint): Optional<any[]>;
}
/**
 * Power Set
 */
export declare class PowerSet extends _CBase {
    constructor(seed: Iterable<any>);
    nth(n: anyint): Optional<any[]>;
}
/**
 * Cartesian Product
 */
export declare class CartesianProduct extends _CBase {
    constructor(...args: Iterable<any>[]);
    nth(n: anyint): Optional<any[]>;
}
export {};
