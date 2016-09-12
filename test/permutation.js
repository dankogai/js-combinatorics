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

describe('Combinatorics.permutation', function () {
    var a = 'abcd'.split(''),
        c = Combinatorics.permutation(a, 1);
    IT([a, 1], is_deeply(c.toArray(), [
        ["a"],
        ["b"],
        ["c"],
        ["d"]
    ]));
    IT(c + 0, is_deeply(c + 0, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));
    c = Combinatorics.permutation(a, 2);
    IT([a, 2], is_deeply(c.toArray(), [
        ["a", "b"],
        ["b", "a"],
        ["a", "c"],
        ["c", "a"],
        ["b", "c"],
        ["c", "b"],
        ["a", "d"],
        ["d", "a"],
        ["b", "d"],
        ["d", "b"],
        ["c", "d"],
        ["d", "c"]
    ]));
    IT([a, 2], is_deeply(c.filter(function(a){ return a[0] === 'a'}), [
        ["a", "b"],
        ["a", "c"],
        ["a", "d"]
    ]));
    IT(c + 0, is_deeply(c + 0, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));

    // Testing lazy filter
    c = Combinatorics.permutation(a, 2).lazyFilter(function(a){ 
        return a[0] === 'a'
    });
    IT([a, 2], is_deeply(c.toArray(), [
        ["a", "b"],
        ["a", "c"],
        ["a", "d"]
    ]));

    // And resetting the lazy filter
    c.lazyFilter();
    IT([a, 2], is_deeply(c.toArray(), [
        ["a", "b"],
        ["b", "a"],
        ["a", "c"],
        ["c", "a"],
        ["b", "c"],
        ["c", "b"],
        ["a", "d"],
        ["d", "a"],
        ["b", "d"],
        ["d", "b"],
        ["c", "d"],
        ["d", "c"]
    ]));

    c = Combinatorics.permutation(a, 3);
    IT([a, 3], is_deeply(c.toArray(), [
        ["a", "b", "c"],
        ["a", "c", "b"],
        ["b", "a", "c"],
        ["b", "c", "a"],
        ["c", "a", "b"],
        ["c", "b", "a"],
        ["a", "b", "d"],
        ["a", "d", "b"],
        ["b", "a", "d"],
        ["b", "d", "a"],
        ["d", "a", "b"],
        ["d", "b", "a"],
        ["a", "c", "d"],
        ["a", "d", "c"],
        ["c", "a", "d"],
        ["c", "d", "a"],
        ["d", "a", "c"],
        ["d", "c", "a"],
        ["b", "c", "d"],
        ["b", "d", "c"],
        ["c", "b", "d"],
        ["c", "d", "b"],
        ["d", "b", "c"],
        ["d", "c", "b"]
    ]));
    IT(c + 0, is_deeply(c + 0, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));
    c = Combinatorics.permutation(a, 4);
    IT([a, 4], is_deeply(c.toArray(), [
        ["a", "b", "c", "d"],
        ["a", "b", "d", "c"],
        ["a", "c", "b", "d"],
        ["a", "c", "d", "b"],
        ["a", "d", "b", "c"],
        ["a", "d", "c", "b"],
        ["b", "a", "c", "d"],
        ["b", "a", "d", "c"],
        ["b", "c", "a", "d"],
        ["b", "c", "d", "a"],
        ["b", "d", "a", "c"],
        ["b", "d", "c", "a"],
        ["c", "a", "b", "d"],
        ["c", "a", "d", "b"],
        ["c", "b", "a", "d"],
        ["c", "b", "d", "a"],
        ["c", "d", "a", "b"],
        ["c", "d", "b", "a"],
        ["d", "a", "b", "c"],
        ["d", "a", "c", "b"],
        ["d", "b", "a", "c"],
        ["d", "b", "c", "a"],
        ["d", "c", "a", "b"],
        ["d", "c", "b", "a"]
    ]));
    IT(c + 0, is_deeply(c + 0, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));

    // Testing lazy map
    c = Combinatorics.permutation(a, 2).lazyMap(function(a){
        if (a[0] === 'a') {
            a[0] = 'z'
        }
        return a;
    });
    IT([a, 2], is_deeply(c.toArray(), [
        ["z", "b"],
        ["b", "a"],
        ["z", "c"],
        ["c", "a"],
        ["b", "c"],
        ["c", "b"],
        ["z", "d"],
        ["d", "a"],
        ["b", "d"],
        ["d", "b"],
        ["c", "d"],
        ["d", "c"]
    ]));

    // And resetting the lazy map
    c.lazyMap();
    IT([a, 2], is_deeply(c.toArray(), [
        ["a", "b"],
        ["b", "a"],
        ["a", "c"],
        ["c", "a"],
        ["b", "c"],
        ["c", "b"],
        ["a", "d"],
        ["d", "a"],
        ["b", "d"],
        ["d", "b"],
        ["c", "d"],
        ["d", "c"]
    ]));
});
