
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

describe('Combinatorics.power', function () {
    var a = [], c = Combinatorics.power(a);
    IT(c, is_deeply(c.toArray(), [
        []
    ]));
    a = 'abc'.split(''), c = Combinatorics.power(a);
    IT(a, is_deeply(c.toArray(), [
        [],
        ["a"],
        ["b"],
        ["a", "b"],
        ["c"],
        ["a", "c"],
        ["b", "c"],
        ["a", "b", "c"]
    ]));
    IT(0+c, is_deeply(0+c, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));
    IT(a, is_deeply(c.filter(function(a){return a.length === 2}),
                    Combinatorics.combination(a,2).toArray()
           ));


    // Testing lazy filter
    c = Combinatorics.power(a).lazyFilter(function(a){ 
        return a.length === 2
    });
    IT(a, is_deeply(c.toArray(), 
                         Combinatorics.combination(a,2).toArray()
            ));

    // And resetting the lazy filter
    c.lazyFilter();
    IT(a, is_deeply(c.toArray(), [
        [],
        ["a"],
        ["b"],
        ["a", "b"],
        ["c"],
        ["a", "c"],
        ["b", "c"],
        ["a", "b", "c"]
    ]));

    // Testing lazy map
    c = Combinatorics.power(a).lazyMap(function(a){ 
        if (a[0] === 'a') {
            a[0] = 'z'
        }
        return a;
    });
    IT(a, is_deeply(c.toArray(), [
        [],
        ["z"],
        ["b"],
        ["z", "b"],
        ["c"],
        ["z", "c"],
        ["b", "c"],
        ["z", "b", "c"]
    ]));

    // And resetting the lazy map
    c.lazyMap();
    IT(a, is_deeply(c.toArray(), [
        [],
        ["a"],
        ["b"],
        ["a", "b"],
        ["c"],
        ["a", "c"],
        ["b", "c"],
        ["a", "b", "c"]
    ])); 
});
