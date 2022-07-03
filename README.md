[![ES2020](https://img.shields.io/badge/JavaScript-ES2020-blue.svg)](https://tc39.es/ecma262/2020/)
[![MIT LiCENSE](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI via GitHub Actions](https://github.com/dankogai/js-combinatorics/actions/workflows/node.js.yml/badge.svg)](https://github.com/dankogai/js-combinatorics/actions/workflows/node.js.yml)

js-combinatorics
================

Simple combinatorics in JavaScript

## HEADS UP: Version 2 and BigInt

Now that [Internet Explorer has officially retired], It is safe to assume `BigInt` is available in every JavaScript environment.  From version 2.0 this module goes fully BigInt.  While integer arguments can still be either `number` or `bigint`, all integer values that can be `bigint` are always `bigint`, whereas previous versions may return `number` when the value <= `Number.MAX_SAFE_INTEGER`.  It is not only more combinatorically natural, but also makes debugging easier especially on TypeScript.

[Internet Explorer has officially retired]: https://blogs.windows.com/windowsexperience/2022/06/15/internet-explorer-11-has-retired-and-is-officially-out-of-support-what-you-need-to-know/
[in every JavaScript environment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt

### For Swift programmers

Check [swift-combinatorics].  More naturally implemented with generics and protocol.

[swift-combinatorics]: https://github.com/dankogai/swift-combinatorics

## SYNOPSIS

```javascript
import * as $C from './combinatorics.js';
let it =  new $C.Combination('abcdefgh', 4);
for (const elem of it) {
  console.log(elem) // ['a', 'b', 'c', 'd'] ... ['e', 'f', 'g', 'h']
}
```

## Usage

load everything…

```javascript
import * as Combinatorics from './combinatorics.js';
```

or just objects you want.

```javascript
import { Combination, Permutation }  from './combinatorics.js';
```

You don't even have to install if you `import` from CDNs.

```javascript
import * as $C from 'https://cdn.jsdelivr.net/npm/js-combinatorics@2.1.1/combinatorics.min.js';
```

Since this is an ES6 module, `type="module"` is required the `<script>` tags. of your HTML files. But you can make it globally available as follows.

```html
<script type="module">
  import * as $C from 'combinatorics.js';
  window.Combinatorics = $C;
</script>
<script>
  // now you can access Combinatorics
  let c = new Combinatorics.Combination('abcdefgh', 4);
</script>
```

### node.js REPL

```shell
% node
Welcome to Node.js v16.15.0.
Type ".help" for more information.
> const $C = await import('js-combinatorics')
undefined
> $C
[Module: null prototype] {
  BaseN: [class BaseN extends _CBase],
  CartesianProduct: [class CartesianProduct extends _CBase],
  Combination: [class Combination extends _CBase],
  Permutation: [class Permutation extends _CBase],
  PowerSet: [class PowerSet extends _CBase],
  combinadic: [Function: combinadic],
  combination: [Function: combination],
  factoradic: [Function: factoradic],
  factorial: [Function: factorial],
  permutation: [Function: permutation],
  randomInteger: [Function: randomInteger],
  version: '2.1.1'
}
> [...new $C.Permutation('abcd')]
[
  [ 'a', 'b', 'c', 'd' ], [ 'a', 'b', 'd', 'c' ],
  [ 'a', 'c', 'b', 'd' ], [ 'a', 'c', 'd', 'b' ],
  [ 'a', 'd', 'b', 'c' ], [ 'a', 'd', 'c', 'b' ],
  [ 'b', 'a', 'c', 'd' ], [ 'b', 'a', 'd', 'c' ],
  [ 'b', 'c', 'a', 'd' ], [ 'b', 'c', 'd', 'a' ],
  [ 'b', 'd', 'a', 'c' ], [ 'b', 'd', 'c', 'a' ],
  [ 'c', 'a', 'b', 'd' ], [ 'c', 'a', 'd', 'b' ],
  [ 'c', 'b', 'a', 'd' ], [ 'c', 'b', 'd', 'a' ],
  [ 'c', 'd', 'a', 'b' ], [ 'c', 'd', 'b', 'a' ],
  [ 'd', 'a', 'b', 'c' ], [ 'd', 'a', 'c', 'b' ],
  [ 'd', 'b', 'a', 'c' ], [ 'd', 'b', 'c', 'a' ],
  [ 'd', 'c', 'a', 'b' ], [ 'd', 'c', 'b', 'a' ]
]
> 
```

### commonjs (node.js)

`./combinatorics.js` is an ECMAScript module but if you still need a UMD or commonjs version, they are available as `./umd/combinatorics.js` and `./commonjs/combinatorics.js` respectively.

## Description

### Arithmetic Functions

Self-explanatory, are they not?

```javascript
import { permutation, combination, factorial, randomInteger } from './combinatorics.js';

permutation(24, 12);  // 1295295050649600n
permutation(26, 13);  // 64764752532480000n

combination(56, 28);  // 7648690600760440n
combination(58, 29);  // 30067266499541040n

factorial(18);  // 6402373705728000n
factorial(19);  // 121645100408832000n

randomInteger(6402373705727999);    // random n  [0,6402373705728000)
randomInteger(121645100408832000n); // ramdom n  [0n, 121645100408832000n)
```

The arithmetic functions above accept both `Number` and `BigInt` (if supported).  Return answers always in `BigInt`.

#### `factoradic()` and `combinadic()`

They need a little more explanation.

```javascript
import { factoradic, combinadic } from './combinatorics.js';

factoradic(6402373705727999);     // [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
factoradic(121645100408831999n);  // [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]

const c16_8 = combinadic(16, 8);
c16_8(0);     // [ 0,  1,  2,  3,  4,  5,  6,  7]
c16_8(12870); // [ 8,  9, 10, 11, 12, 13, 14, 15]
const c58_29 = combinadic(58, 29);
c58_29(0); /* [
   0,  1,  2,  3,  4,  5,  6,  7,  8,
   9, 10, 11, 12, 13, 14, 15, 16, 17,
  18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28
] */
c58_29(30067266499541039n); /* [
  29, 30, 31, 32, 33, 34, 35, 36, 37,
  38, 39, 40, 41, 42, 43, 44, 45, 46,
  47, 48, 49, 50, 51, 52, 53, 54, 55,
  56, 57
] */
```

`factoradic(n)` returns the [factoradic] representation of `n`. For an array `ary` with `n` elements, you can get its `n`th permutation by picking `ary[i]` for each `i` in the factoradic.

[factoradic]: https://en.wikipedia.org/wiki/Factorial_number_system

Unlike other arithmetic functions, `combinadic()` returns a function which returns `m`th [combinadic] digit of `n C k`.  For an array `ary` with `n` elements, you can get its `m`th combination by picking `ary[i]` for each `i` in the combinadic.

[combinadic]: https://en.wikipedia.org/wiki/Combinatorial_number_system

### classes

The module comes with `Permutation`, `Combination`, `PowerSet`, `BaseN`, and `CartesianProduct`.  You can individually `import` them or all of them via `import *`

```javascript
import * as $C from 'combinatorics.js';
```

You construct an iterable object by giving a seed iterable and options.  in the example below, `'abcdefgh'` is the seed and `4` is the size of the element.

```javascript
let it = new $C.Combination('abcdefgh', 4);
```

if you hate `new`, you can use `Klass.of` where `Klass` is one of the classes this module offers.

```javascript
let it = $C.Combination.of('abcdefgh', 4);
```

Once constructed, you can iterate via `for … of` statement or turn it into an array via `[...]` construct.

```javascript
[...it]; /* [
  [ 'a', 'b', 'c', 'd' ], [ 'a', 'b', 'c', 'e' ], [ 'a', 'b', 'c', 'f' ],
  [ 'a', 'b', 'c', 'g' ], [ 'a', 'b', 'c', 'h' ], [ 'a', 'b', 'd', 'e' ],
  [ 'a', 'b', 'd', 'f' ], [ 'a', 'b', 'd', 'g' ], [ 'a', 'b', 'd', 'h' ],
  [ 'a', 'b', 'e', 'f' ], [ 'a', 'b', 'e', 'g' ], [ 'a', 'b', 'e', 'h' ],
  [ 'a', 'b', 'f', 'g' ], [ 'a', 'b', 'f', 'h' ], [ 'a', 'b', 'g', 'h' ],
  [ 'a', 'c', 'd', 'e' ], [ 'a', 'c', 'd', 'f' ], [ 'a', 'c', 'd', 'g' ],
  [ 'a', 'c', 'd', 'h' ], [ 'a', 'c', 'e', 'f' ], [ 'a', 'c', 'e', 'g' ],
  [ 'a', 'c', 'e', 'h' ], [ 'a', 'c', 'f', 'g' ], [ 'a', 'c', 'f', 'h' ],
  [ 'a', 'c', 'g', 'h' ], [ 'a', 'd', 'e', 'f' ], [ 'a', 'd', 'e', 'g' ],
  [ 'a', 'd', 'e', 'h' ], [ 'a', 'd', 'f', 'g' ], [ 'a', 'd', 'f', 'h' ],
  [ 'a', 'd', 'g', 'h' ], [ 'a', 'e', 'f', 'g' ], [ 'a', 'e', 'f', 'h' ],
  [ 'a', 'e', 'g', 'h' ], [ 'a', 'f', 'g', 'h' ], [ 'b', 'c', 'd', 'e' ],
  [ 'b', 'c', 'd', 'f' ], [ 'b', 'c', 'd', 'g' ], [ 'b', 'c', 'd', 'h' ],
  [ 'b', 'c', 'e', 'f' ], [ 'b', 'c', 'e', 'g' ], [ 'b', 'c', 'e', 'h' ],
  [ 'b', 'c', 'f', 'g' ], [ 'b', 'c', 'f', 'h' ], [ 'b', 'c', 'g', 'h' ],
  [ 'b', 'd', 'e', 'f' ], [ 'b', 'd', 'e', 'g' ], [ 'b', 'd', 'e', 'h' ],
  [ 'b', 'd', 'f', 'g' ], [ 'b', 'd', 'f', 'h' ], [ 'b', 'd', 'g', 'h' ],
  [ 'b', 'e', 'f', 'g' ], [ 'b', 'e', 'f', 'h' ], [ 'b', 'e', 'g', 'h' ],
  [ 'b', 'f', 'g', 'h' ], [ 'c', 'd', 'e', 'f' ], [ 'c', 'd', 'e', 'g' ],
  [ 'c', 'd', 'e', 'h' ], [ 'c', 'd', 'f', 'g' ], [ 'c', 'd', 'f', 'h' ],
  [ 'c', 'd', 'g', 'h' ], [ 'c', 'e', 'f', 'g' ], [ 'c', 'e', 'f', 'h' ],
  [ 'c', 'e', 'g', 'h' ], [ 'c', 'f', 'g', 'h' ], [ 'd', 'e', 'f', 'g' ],
  [ 'd', 'e', 'f', 'h' ], [ 'd', 'e', 'g', 'h' ], [ 'd', 'f', 'g', 'h' ],
  [ 'e', 'f', 'g', 'h' ]
] */
```

#### `.length`

The object has `.length` so you don't have to iterate to count the elements.  Note the value is in `bigint` so you may need to convert to `number`.

```javascript
it.length       // 70n
[...it].length  // 70
it.length ==  [...it].length // true because comparisons work between number and bigint
it.length === [...it].length // false because types are different
```

#### `.at()` (or `.nth()`)

And the object has `.at(n)` method so you can random-access each element.  This is the equivalent of subscript in `Array`.  It was previously named `.nth()` but it was renamed to `.at()` ala `Array.prototype.at()` in ES2020. `.nth()` still available for backward compatibility.

```javascript
it.at(0);  //  [ 'a', 'b', 'c', 'd' ];
it.at(69); //  [ 'a', 'd', 'c', 'h' ];
```

`at()` accepts both `Number` and `BigInt`.

```javascript
it.at(69n);  // [ 'a', 'd', 'c', 'h' ];
```

`at()` also accepts negative indexes.   In which case `n` is `(-n)th` element from `.length`.

```javascript
it.at(-1);   // [ 'a', 'd', 'c', 'h' ]
it.at(-70);  // [ 'a', 'b', 'c', 'd' ]
```

#### `.sample()`

And `.sample()` picks random element, which is defined as `.at(randomInteger(.length))`.

```javascript
it.sample() // one of ['a', 'b', 'c', 'd'] ... ['a', 'd', 'e', 'f']
```

### Beyond `Number.MAX_SAFE_INTEGER`

Occasionally you need `BigInt` to access elements beyond `Number.MAX_SAFE_INTEGER`.

```javascript
it = new $C.Permutation('abcdefghijklmnopqrstuvwxyz');
it.length;  // 403291461126605635584000000n
```

You can still access elements before `Number.MAX_SAFE_INTEGER` in `Number`.

```javascript
it.at(0);  /* [
  'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l',
  'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x',
  'y', 'z'
] */
it.at(9007199254740990); /* [
  'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'i', 'p', 'n', 'r', 'z',
  'm', 'h', 'y', 'x', 'u', 't',
  'l', 'j', 'k', 'q', 's', 'o',
  'v', 'w'
] */
```

But how are you goint to acccess elements beyond that?  Just use `BigInt`.

```javascript
it.at(9007199254740991n);  /* [
  'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'i', 'p', 'n', 'r', 'z',
  'm', 'h', 'y', 'x', 'u', 't',
  'l', 'j', 'k', 'q', 's', 'o',
  'w', 'v'
] */
it.at(it.length - 1n); /* [
  'z', 'y', 'x', 'w', 'v', 'u',
  't', 's', 'r', 'q', 'p', 'o',
  'n', 'm', 'l', 'k', 'j', 'i',
  'h', 'g', 'f', 'e', 'd', 'c',
  'b', 'a'
] */
```

You can tell if you need `BigInt` via `.isBig`.  Note `.length` is always `bigint` from version 2.0 so you may not need this method any more.  So it is now deprecated.

```javascript
new $C.Permutation('0123456789').isBig; // false
new $C.Permutation('abcdefghijklmnopqrstuvwxyz').isBig; // true
```

You can also check if it is safe on your platform via `.isSafe`.  It is now deprecated for the same reason as `.isBig`.

```javascript
new $C.Permutation('abcdefghijklmnopqrstuvwxyz').isSafe; // always true
```

### class `Permutation`

An iterable which permutes a given iterable.

`new Permutation(seed, size)`

* `seed`: the seed iterable.   `[...seed]` becomes the seed array.
* `size`: the number of elements in the iterated element.  defaults to `seed.length`

````javascript
import {Permutation} from './combinatorics.js';

let it = new Permutation('abcd'); // size 4 is assumed
it.length;  // 24n
[...it];    /* [
  [ 'a', 'b', 'c', 'd' ], [ 'a', 'b', 'd', 'c' ],
  [ 'a', 'c', 'b', 'd' ], [ 'a', 'c', 'd', 'b' ],
  [ 'a', 'd', 'b', 'c' ], [ 'a', 'd', 'c', 'b' ],
  [ 'b', 'a', 'c', 'd' ], [ 'b', 'a', 'd', 'c' ],
  [ 'b', 'c', 'a', 'd' ], [ 'b', 'c', 'd', 'a' ],
  [ 'b', 'd', 'a', 'c' ], [ 'b', 'd', 'c', 'a' ],
  [ 'c', 'a', 'b', 'd' ], [ 'c', 'a', 'd', 'b' ],
  [ 'c', 'b', 'a', 'd' ], [ 'c', 'b', 'd', 'a' ],
  [ 'c', 'd', 'a', 'b' ], [ 'c', 'd', 'b', 'a' ],
  [ 'd', 'a', 'b', 'c' ], [ 'd', 'a', 'c', 'b' ],
  [ 'd', 'b', 'a', 'c' ], [ 'd', 'b', 'c', 'a' ],
  [ 'd', 'c', 'a', 'b' ], [ 'd', 'c', 'b', 'a' ]
] */

it = new Permutation('abcdefghijklmnopqrstuvwxyz0123456789');
it.length;  // 371993326789901217467999448150835200000000n
it.at(371993326789901217467999448150835199999999n);  /* [
  '9', '8', '7', '6', '5', '4', '3',
  '2', '1', '0', 'z', 'y', 'x', 'w',
  'v', 'u', 't', 's', 'r', 'q', 'p',
  'o', 'n', 'm', 'l', 'k', 'j', 'i',
  'h', 'g', 'f', 'e', 'd', 'c', 'b',
  'a'
] */
````

Making a permutation of the iterable then taking its sample is functionally the same as [Fisher–Yates shuffle] of the iterable.  Instead of shuffling the deck, it make all possible cases available and let you pick one.

```javascript
it.sample(); // something between ['a','b', ... '9'] and ['9','8',....'a'] 
```

It is in fact a little better because `.sample()` only needs one random number (between 0 and `.length - 1`) while Fisher–Yates needs `n` random numbers.

[Fisher–Yates shuffle]: https://en.wikipedia.org/wiki/Fisher–Yates_shuffle

### class `Combination`

An iterable which emits a combination of a given iterable.

`new Combination(seed, size)`

* `seed`: the seed iterable.
* `size`: the number of elements in the iterated element.  

````javascript
import {Combination} from './combinatorics.js';

let it = new Combination('abcd', 2);
it.length;  // 6n
[...it];    /* [
  [ 'a', 'b' ],
  [ 'a', 'c' ],
  [ 'a', 'd' ],
  [ 'b', 'c' ],
  [ 'b', 'd' ],
  [ 'c', 'd' ]
] */

let a100 = Array(100).fill(0).map((v,i)=>i); // [0, 1, ...99]
it = new Combination(a100, 50);
it.length;  // 100891344545564193334812497256n
it.at(100891344545564193334812497255n);  /* [
  50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
  72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
  83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93,
  94, 95, 96, 97, 98, 99
] */
````

### class `PowerSet`

An iterable which emits each element of its power set.

`new PowerSet(seed)`

* `seed`: the seed iterable.

````javascript
import {PowerSet} from './combinatorics.js';

let it = new PowerSet('abc');
it.length;  // 8n
[...it];    /* [
  [],
  [ 'a' ],
  [ 'b' ],
  [ 'a', 'b' ],
  [ 'c' ],
  [ 'a', 'c' ],
  [ 'b', 'c' ],
  [ 'a', 'b', 'c' ]
] */

it = new PowerSet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
);
it.length;  // 18446744073709551616n
it.at(18446744073709551615n);  /* [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
  'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1',
  '2', '3', '4', '5', '6', '7', '8', '9', '+',
  '/'
] */
````

### class `BaseN`

An iterable which emits all numbers in the given system.

`new BaseN(seed, size)`

* `seed`: the seed iterable whose elements represent digits.
* `size`: the number of digits

```javascript
import {BaseN} from './combinatorics.js';

let it = new BaseN('abc', 3);
it.length;  // 27n
[...it];    /* [
  [ 'a', 'a', 'a' ], [ 'b', 'a', 'a' ],
  [ 'c', 'a', 'a' ], [ 'a', 'b', 'a' ],
  [ 'b', 'b', 'a' ], [ 'c', 'b', 'a' ],
  [ 'a', 'c', 'a' ], [ 'b', 'c', 'a' ],
  [ 'c', 'c', 'a' ], [ 'a', 'a', 'b' ],
  [ 'b', 'a', 'b' ], [ 'c', 'a', 'b' ],
  [ 'a', 'b', 'b' ], [ 'b', 'b', 'b' ],
  [ 'c', 'b', 'b' ], [ 'a', 'c', 'b' ],
  [ 'b', 'c', 'b' ], [ 'c', 'c', 'b' ],
  [ 'a', 'a', 'c' ], [ 'b', 'a', 'c' ],
  [ 'c', 'a', 'c' ], [ 'a', 'b', 'c' ],
  [ 'b', 'b', 'c' ], [ 'c', 'b', 'c' ],
  [ 'a', 'c', 'c' ], [ 'b', 'c', 'c' ],
  [ 'c', 'c', 'c' ]
] */

it = BaseN('0123456789abcdef', 16);
it.length;  // 18446744073709551616n
it.at(18446744073709551615n);  /* [
  'f', 'f', 'f', 'f',
  'f', 'f', 'f', 'f',
  'f', 'f', 'f', 'f',
  'f', 'f', 'f', 'f'
] */
```

### class `CartesianProduct`

A [cartesian product] of given sets.

[cartesian Product]: https://en.wikipedia.org/wiki/Cartesian_product

`new CartesianProduct(...args)`

* `args`: iterables that represent sets

```javascript
import {CartesianProduct} from './combinatorics.js';

let it = new CartesianProduct('012','abc','xyz');
it.length;  // 27n
[...it];    /* [
  [ '0', 'a', 'x' ], [ '1', 'a', 'x' ],
  [ '2', 'a', 'x' ], [ '0', 'b', 'x' ],
  [ '1', 'b', 'x' ], [ '2', 'b', 'x' ],
  [ '0', 'c', 'x' ], [ '1', 'c', 'x' ],
  [ '2', 'c', 'x' ], [ '0', 'a', 'y' ],
  [ '1', 'a', 'y' ], [ '2', 'a', 'y' ],
  [ '0', 'b', 'y' ], [ '1', 'b', 'y' ],
  [ '2', 'b', 'y' ], [ '0', 'c', 'y' ],
  [ '1', 'c', 'y' ], [ '2', 'c', 'y' ],
  [ '0', 'a', 'z' ], [ '1', 'a', 'z' ],
  [ '2', 'a', 'z' ], [ '0', 'b', 'z' ],
  [ '1', 'b', 'z' ], [ '2', 'b', 'z' ],
  [ '0', 'c', 'z' ], [ '1', 'c', 'z' ],
  [ '2', 'c', 'z' ]
] */
```

Since the number of arguments to `CartesianProduct` is variable, it is sometimes helpful to give a single array with all arguments.   But you cannot `new ctor.apply(null, args)` this case.  To mitigate that, you can use `.from()`.

```javascript
let a16 =  Array(16).fill('0123456789abcdef');
it = CartesianProduct.from(a16);
it.length;  // 18446744073709551616n
it.at(18446744073709551615n);  /* [
  'f', 'f', 'f', 'f',
  'f', 'f', 'f', 'f',
  'f', 'f', 'f', 'f',
  'f', 'f', 'f', 'f'
] */
````

## What's new from version 0.x?

`js-combinatorics` has gone ES2015 since version 1.

* native iterator instead of custom
* module. `import` instead of `require`.
* `BigInt` where possible

And from version 1.2 it is written in TypeScript.  `combinatorics.js` and  `combinatorics.d.ts` are compiled from `combinatorics.ts`.

APIs will change accordingly.  Old versions are available in the `version0` branch.

### What's gone from version 0.x?

* `bigCombination` is gone because all classes now can handle big -- combinatorially big! -- cases thanks to [BigInt] support getting standard.  Safari 13 and below is a major exception but BigInt is coming to Safari 14 and up.

[BigInt]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt

* `permutationCombination` is gone because the name is misleading and it is now trivially easy to reconstruct as follow:

```javascript
class permutationCombination {
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
```

* `js-combinatorics` is now natively iterable.  Meaning its custom iterators are gone -- with its methods like `.map` and `.filter`.  JS iterators are very minimalistic with only `[...]` and `for ... of`.  But don't worry.  There are several ways to make those functional methods back again. 

For instance, You can use [js-xiterable] like so:

[js-xiterable]: https://github.com/dankogai/js-xiterable

```javascript
import {xiterable as $X} from 
  'https://cdn.jsdelivr.net/npm/js-xiterable@0.0.3/xiterable.min.js';
import {Permutation} from 'combinatorics.js';
let it = new Permutation('abcd');
let words = $X(it).map(v=>v.join(''))
for (const word of words)) console.log(word)
/*
abcd
abdc
...
dcab
dcba
*/
```
