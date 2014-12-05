[![build status](https://secure.travis-ci.org/dankogai/js-combinatorics.png)](http://travis-ci.org/dankogai/js-combinatorics)

js-combinatorics
================

Simple combinatorics like power set, combination, and permutation in JavaScript

SYNOPSIS
--------

### In Browser
````
<script src="combinatorics.js"></script>
````
### node.js
````
var Combinatorics = require('js-combinatorics');
````

Usage
-----

### power set
````
var cmb, a;
cmb = Combinatorics.power(['a','b','c']);
cmb.each(function(a){ console.log(a) });
//  []
//  ["a"]
//  ["b"]
//  ["a", "b"]
//  ["c"]
//  ["a", "c"]
//  ["b", "c"]
//  ["a", "b", "c"]
````

### combination
````
cmb = Combinatorics.combination(['a','b','c','d'], 2);
while(a = cmb.next()) console.log(a);
//  ["a", "b"]
//  ["a", "c"]
//  ["a", "d"]
//  ["b", "c"]
//  ["b", "d"]
//  ["c", "d"]
````
### permutation
````
cmb = Combinatorics.permutation(['a','b','c','d']); // assumes 4
console.log(cmb.toArray());
//  [
  ["a","b","c","d"],["a","b","d","c"],["a","c","b","d"],["a","c","d","b"],
  ["a","d","b","c"],["a","d","c","b"],["b","a","c","d"],["b","a","d","c"],
  ["b","c","a","d"],["b","c","d","a"],["b","d","a","c"],["b","d","c","a"],
  ["c","a","b","d"],["c","a","d","b"],["c","b","a","d"],["c","b","d","a"],
  ["c","d","a","b"],["c","d","b","a"],["d","a","b","c"],["d","a","c","b"],
  ["d","b","a","c"],["d","b","c","a"],["d","c","a","b"],["d","c","b","a"]
]
````

### permutation of combination
````
cmb = Combinatorics.permutationCombination(['a','b','c']);
console.log(cmb.toArray());
// [ 
  [ 'a' ],
  [ 'b' ],
  [ 'c' ],
  [ 'a', 'b' ],
  [ 'b', 'a' ],
  [ 'a', 'c' ],
  [ 'c', 'a' ],
  [ 'b', 'c' ],
  [ 'c', 'b' ],
  [ 'a', 'b', 'c' ],
  [ 'a', 'c', 'b' ],
  [ 'b', 'a', 'c' ],
  [ 'b', 'c', 'a' ],
  [ 'c', 'a', 'b' ],
  [ 'c', 'b', 'a' ] ]
````

### cartesian product
````
cp = Combinatorics.cartesianProduct([0, 1, 2], [0, 10, 20], [0, 100, 200]);
console.log(cp.toArray());
//  [
  [0, 0, 0],   [1, 0, 0],   [2, 0, 0],
  [0, 10, 0],  [1, 10, 0],  [2, 10, 0],
  [0, 20, 0],  [1, 20, 0],  [2, 20, 0],
  [0, 0, 100], [1, 0, 100], [2, 0, 100],
  [0, 10, 100],[1, 10, 100],[2, 10, 100],
  [0, 20, 100],[1, 20, 100],[2, 20, 100],
  [0, 0, 200], [1, 0, 200], [2, 0, 200],
  [0, 10, 200],[1, 10, 200],[2, 10, 200],
  [0, 20, 200],[1, 20, 200],[2, 20, 200]
]
````

### base N

````
baseN = Combinatorics.baseN(['a','b','c'], 3);
console.log(baseN.toArray())
// [ 
  [ 'a', 'a', 'a' ],
  [ 'b', 'a', 'a' ],
  [ 'c', 'a', 'a' ],
  [ 'a', 'b', 'a' ],
  [ 'b', 'b', 'a' ],
  [ 'c', 'b', 'a' ],
  [ 'a', 'c', 'a' ],
  [ 'b', 'c', 'a' ],
  [ 'c', 'c', 'a' ],
  [ 'a', 'a', 'b' ],
  [ 'b', 'a', 'b' ],
  [ 'c', 'a', 'b' ],
  [ 'a', 'b', 'b' ],
  [ 'b', 'b', 'b' ],
  [ 'c', 'b', 'b' ],
  [ 'a', 'c', 'b' ],
  [ 'b', 'c', 'b' ],
  [ 'c', 'c', 'b' ],
  [ 'a', 'a', 'c' ],
  [ 'b', 'a', 'c' ],
  [ 'c', 'a', 'c' ],
  [ 'a', 'b', 'c' ],
  [ 'b', 'b', 'c' ],
  [ 'c', 'b', 'c' ],
  [ 'a', 'c', 'c' ],
  [ 'b', 'c', 'c' ],
  [ 'c', 'c', 'c' ]
]
````

### Arithmetic Functions

+ .`P(m, n)`
  calculates m P n
+ .`C(m, n)`
  calculates m C n
+ .`factorial(n)`
  calculates `n!`
+ .`factoradic(n)`
  returns the factoradic representation of n in array, *in least significant order*.  See
  http://en.wikipedia.org/wiki/Factorial_number_system


DESCRIPTION
-----------

All methods create _generators_.  Instead of creating all elements at once, each element is created on demand.  So it is memory efficient even when you need to iterate through millions of elements.

#### Combinatorics.power( _ary_ )

Creates a generator which generates the power set of _ary_

#### Combinatorics.combination( _ary_ , _nelem_ )

Creates a generator which generates the combination of _ary_ with _nelem_ elements.
When _nelem_ is ommited, _ary_.length is used.

#### Combinatorics.permutation( _ary_, _nelem_ )

Creates a generator which generates the permutation of _ary_ with _nelem_ elements.
When _nelem_ is ommited, _ary_.length is used.

#### Combinatorics.permutationCombination( _ary_)

Creates a generator which generates the permutation of the combination of _ary_.
Equivalent to
`Combinatorics.permutation(Combinatorics.combination(ary))`
but more efficient.

#### Combinatorics.cartesianProduct( _ary0_, ...)

Creates a generator which generates the cartesian product of the arrays.  All arguments must be arrays with more than one element.

#### Combinatorics.baseN( _ary_ , _nelem_ )

Creates a generator which generates _nelem_ -digit "numbers" where each digit is element in _ary_ .
Note this "number" is in least significant order.

When _nelem_ is ommited, _ary_.length is used.

### Generator Methods

All generators have following methods:

#### .next()

Returns the element or `undefined` if no more element is available.

#### .forEach(function(a){ ... });

Applies the callback function for each element.

#### .toArray()

All elements at once.

#### .map(function(a){ ... })

All elements at once with function f applied to each element.

#### .filter(function(a){ ... })

Returns an array with elements that passes the filter function.
For example, you can redefine combination as follows:

````
myCombination = function(ary, n) {
  return Combinatorics.power(ary).filter(function (a) {
    return a.length === n;
  });
};
````

#### .length

Returns the number of elements to be generated
Which equals to _generator_`.toArray().length` but it is precalculated without actually generating elements.
Handy when you prepare for large iteraiton.

#### 0 + _generator_

Same as _generator_`.length`

#### .nth(n)

Returns the *n*th element (starting 0).  Available for  `power`, `cartesianProduct` and `baseN`.

#### .get(x0, ...)

Available for `cartesianProduct` generator.  Arguments are coordinates in integer.
Arguments can be out of bounds but it returns `undefined` in such cases.
