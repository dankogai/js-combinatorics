/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
var assert, Combinatorics;
if (this['window'] !== this) {
    assert = require("assert");
    Combinatorics = require('../.');
}
var is_deeply = function (a, e, m) {
    return function () {
        assert.equal(JSON.stringify(a), JSON.stringify(e), m)
    }
};
var IT=function(t,f){it(JSON.stringify(t),f)}; // mocha 3

describe('Combinatorics.cartesianProduct', function () {
    var c = Combinatorics.cartesianProduct(
    [0, 1, 2], [0, 10, 20], [0, 100, 200]);
    IT(c.toArray(), is_deeply(c.toArray(), [
        [0, 0, 0],
        [1, 0, 0],
        [2, 0, 0],
        [0, 10, 0],
        [1, 10, 0],
        [2, 10, 0],
        [0, 20, 0],
        [1, 20, 0],
        [2, 20, 0],
        [0, 0, 100],
        [1, 0, 100],
        [2, 0, 100],
        [0, 10, 100],
        [1, 10, 100],
        [2, 10, 100],
        [0, 20, 100],
        [1, 20, 100],
        [2, 20, 100],
        [0, 0, 200],
        [1, 0, 200],
        [2, 0, 200],
        [0, 10, 200],
        [1, 10, 200],
        [2, 10, 200],
        [0, 20, 200],
        [1, 20, 200],
        [2, 20, 200]
    ]));
    IT(0 + c, is_deeply(0 + c, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));
    IT(c.toArray(), is_deeply(c.filter(function (a) {
        return a[0] === 0
    }), [
        [0, 0, 0],
        [0, 10, 0],
        [0, 20, 0],
        [0, 0, 100],
        [0, 10, 100],
        [0, 20, 100],
        [0, 0, 200],
        [0, 10, 200],
        [0, 20, 200]
    ]));

    // Testing lazy filter
    c = Combinatorics.cartesianProduct(
    [0, 1, 2], [0, 10, 20], [0, 100, 200]).lazyFilter(function(a){ 
        return a[0] === 0
    });
    IT(c.toArray(), is_deeply(c.toArray(), [
        [0, 0, 0],
        [0, 10, 0],
        [0, 20, 0],
        [0, 0, 100],
        [0, 10, 100],
        [0, 20, 100],
        [0, 0, 200],
        [0, 10, 200],
        [0, 20, 200]
    ]));

    // And resetting the lazy filter
    c.lazyFilter();
    IT(c.toArray(), is_deeply(c.toArray(), [
        [0, 0, 0],
        [1, 0, 0],
        [2, 0, 0],
        [0, 10, 0],
        [1, 10, 0],
        [2, 10, 0],
        [0, 20, 0],
        [1, 20, 0],
        [2, 20, 0],
        [0, 0, 100],
        [1, 0, 100],
        [2, 0, 100],
        [0, 10, 100],
        [1, 10, 100],
        [2, 10, 100],
        [0, 20, 100],
        [1, 20, 100],
        [2, 20, 100],
        [0, 0, 200],
        [1, 0, 200],
        [2, 0, 200],
        [0, 10, 200],
        [1, 10, 200],
        [2, 10, 200],
        [0, 20, 200],
        [1, 20, 200],
        [2, 20, 200]
    ]));    

    // Testing lazy map
    c = Combinatorics.cartesianProduct(
    [0, 1, 2], [0, 10, 20], [0, 100, 200]).lazyMap(function(a){ 
        if (a[0] === 2) {
            a[0] = 3
        }
        return a;
    });
    IT(c.toArray(), is_deeply(c.toArray(), [
        [0, 0, 0],
        [1, 0, 0],
        [3, 0, 0],
        [0, 10, 0],
        [1, 10, 0],
        [3, 10, 0],
        [0, 20, 0],
        [1, 20, 0],
        [3, 20, 0],
        [0, 0, 100],
        [1, 0, 100],
        [3, 0, 100],
        [0, 10, 100],
        [1, 10, 100],
        [3, 10, 100],
        [0, 20, 100],
        [1, 20, 100],
        [3, 20, 100],
        [0, 0, 200],
        [1, 0, 200],
        [3, 0, 200],
        [0, 10, 200],
        [1, 10, 200],
        [3, 10, 200],
        [0, 20, 200],
        [1, 20, 200],
        [3, 20, 200]
    ]));

    // And resetting the lazy map
    c.lazyMap();
    IT(c.toArray(), is_deeply(c.toArray(), [
        [0, 0, 0],
        [1, 0, 0],
        [2, 0, 0],
        [0, 10, 0],
        [1, 10, 0],
        [2, 10, 0],
        [0, 20, 0],
        [1, 20, 0],
        [2, 20, 0],
        [0, 0, 100],
        [1, 0, 100],
        [2, 0, 100],
        [0, 10, 100],
        [1, 10, 100],
        [2, 10, 100],
        [0, 20, 100],
        [1, 20, 100],
        [2, 20, 100],
        [0, 0, 200],
        [1, 0, 200],
        [2, 0, 200],
        [0, 10, 200],
        [1, 10, 200],
        [2, 10, 200],
        [0, 20, 200],
        [1, 20, 200],
        [2, 20, 200]
    ]));  

    // Testing .reduce
    var r = function(a, e, i){return a + i + ":" + e + ";"};
    var s = c.toArray().reduce(r, "");
    IT( s + " // c.reduce", is_deeply(s, c.reduce(r, "")));

});
