[![build status](https://secure.travis-ci.org/dankogai/js-combinatrics.png)](http://travis-ci.org/dankogai/js-combinatrics)

combinatrics.js
===============

Simple combinatrics like power set, combination, and permutation in JavaScript

SYNOPSIS
--------

### In Browser
````
<script src="combinatrics.js"></script>
````
### node.js
````
var Combinatrics = require('./combinatrics.js').Combinatrics;
````

#### power set
````
var cmb, a;
cmb = Combinatrics.power(['a','b','c']);
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
#### combination
````
cmb = Combinatrics.combination(['a','b','c','d'], 2);
while(a = cmb.next()) console.log(a);
//  ["a", "b"]
//  ["a", "c"]
//  ["a", "d"]
//  ["b", "c"]
//  ["b", "d"]
//  ["c", "d"]
````
#### permutation
````
cmb = Combinatrics.permutation(['a','b','c','d']); // assumes 4
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

#### Arithmetic Functions

+ .`P(m, n)`
  calculates m P n
+ .`C(m, n)`
  calculates m C n
+ .`factorial(n)`
  calculates `n!`
+ .`factoradic(n)`
  returns the factoradic representation of n in array, *LSB ORDER*.  See
  http://en.wikipedia.org/wiki/Factorial_number_system


DESCRIPTION
-----------

All methods create _generators_.  Instead of creating all elements at once, each element is created on demand.  So it is memory efficient even when you need to iterate through millions of elements.

#### Combinatrics.power( _ary_ )

Creates a generator which generates the power set of _ary_

#### Combinatrics.combination( _ary_ , _nelem_ )

Creates a generator which generates the combination of _ary_ with _nelem_ elements.
When _nelem_ is ommited, _ary_.length is used.

#### Combinatrics.permutation( _ary_, _nelem_ )

Creates a generator which generates the permutation of _ary_ with _nelem_ elements.
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

#### 0 + _generator_

Returns numeric context which is the number of elements.
Which equals to _generator_`.toArray().length` but it is precalculated without actually generating elements.
Handy when you prepare for large iteraiton.

