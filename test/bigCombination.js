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

describe('Combinatorics.bigCombination', function () {
    var a = 'abcdef'.split(''),
        b = 'abcdefghijklmnopqrstuvwxyz012345'.split(''),
        c = Combinatorics.bigCombination(a, 1);
    IT([a, 1], is_deeply(c.toArray(), [
        ["a"],
        ["b"],
        ["c"],
        ["d"],
        ["e"],
        ["f"]
    ]));
    IT(0 + c, is_deeply(0 + c, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));
    c = Combinatorics.bigCombination(a, 2);
    IT([a, 2], is_deeply(c.toArray(), [
        ["a", "b"],
        ["a", "c"],
        ["b", "c"],
        ["a", "d"],
        ["b", "d"],
        ["c", "d"],
        ["a", "e"],
        ["b", "e"],
        ["c", "e"],
        ["d", "e"],
        ["a", "f"],
        ["b", "f"],
        ["c", "f"],
        ["d", "f"],
        ["e", "f"]
    ]));
    IT(0 + c, is_deeply(0 + c, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));
    c = Combinatorics.bigCombination(a, 3);
    IT([a, 3], is_deeply(c.toArray(), [
        ["a", "b", "c"],
        ["a", "b", "d"],
        ["a", "c", "d"],
        ["b", "c", "d"],
        ["a", "b", "e"],
        ["a", "c", "e"],
        ["b", "c", "e"],
        ["a", "d", "e"],
        ["b", "d", "e"],
        ["c", "d", "e"],
        ["a", "b", "f"],
        ["a", "c", "f"],
        ["b", "c", "f"],
        ["a", "d", "f"],
        ["b", "d", "f"],
        ["c", "d", "f"],
        ["a", "e", "f"],
        ["b", "e", "f"],
        ["c", "e", "f"],
        ["d", "e", "f"]
    ]));
    IT(0 + c, is_deeply(0 + c, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));
    c = Combinatorics.bigCombination(a, 4);
    IT([a, 4], is_deeply(c.toArray(), [
        ["a", "b", "c", "d"],
        ["a", "b", "c", "e"],
        ["a", "b", "d", "e"],
        ["a", "c", "d", "e"],
        ["b", "c", "d", "e"],
        ["a", "b", "c", "f"],
        ["a", "b", "d", "f"],
        ["a", "c", "d", "f"],
        ["b", "c", "d", "f"],
        ["a", "b", "e", "f"],
        ["a", "c", "e", "f"],
        ["b", "c", "e", "f"],
        ["a", "d", "e", "f"],
        ["b", "d", "e", "f"],
        ["c", "d", "e", "f"]
    ]));
    IT(0 + c, is_deeply(0 + c, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));
    c = Combinatorics.bigCombination(a, 5);
    IT([a, 5], is_deeply(c.toArray(), [
        ["a", "b", "c", "d", "e"],
        ["a", "b", "c", "d", "f"],
        ["a", "b", "c", "e", "f"],
        ["a", "b", "d", "e", "f"],
        ["a", "c", "d", "e", "f"],
        ["b", "c", "d", "e", "f"]
    ]));
    IT([a, 5], is_deeply(c.filter(function(a){ return a[0] !== 'a'}), [
        ["b", "c", "d", "e", "f"]
    ]));

    // Testing lazy filter
    c = Combinatorics.bigCombination(a, 5).lazyFilter(function(a){ 
        return a[0] !== 'a'
    });
    IT([a, 5], is_deeply(c.toArray(), [
        ["b", "c", "d", "e", "f"]
    ]));

    // And resetting the lazy filter
    c.lazyFilter();
    IT([a, 5], is_deeply(c.toArray(), [
        ["a", "b", "c", "d", "e"],
        ["a", "b", "c", "d", "f"],
        ["a", "b", "c", "e", "f"],
        ["a", "b", "d", "e", "f"],
        ["a", "c", "d", "e", "f"],
        ["b", "c", "d", "e", "f"]
    ]));

    c = Combinatorics.bigCombination(a, 6);
    IT([a, 6], is_deeply(c.toArray(), [
        ["a", "b", "c", "d", "e", "f"]
    ]));
    IT(0 + c, is_deeply(0 + c, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));

    // Testing large value boundaries...
    c = Combinatorics.bigCombination(b, 1);
    IT([b, 1], is_deeply(c.toArray(), [
        ["a"], ["b"], ["c"], ["d"], ["e"], ["f"],
        ["g"], ["h"], ["i"], ["j"], ["k"], ["l"],
        ["m"], ["n"], ["o"], ["p"], ["q"], ["r"],
        ["s"], ["t"], ["u"], ["v"], ["w"], ["x"],
        ["y"], ["z"], ["0"], ["1"], ["2"], ["3"],
        ["4"], ["5"]
    ]));
    c = Combinatorics.bigCombination(b, 32);
    IT([b, 32], is_deeply(c.toArray(), [
        ["a", "b", "c", "d", "e", "f",
        "g", "h", "i", "j", "k", "l",
        "m", "n", "o", "p", "q", "r",
        "s", "t", "u", "v", "w", "x",
        "y", "z", "0", "1", "2", "3",
        "4", "5"]
    ]));
    c = Combinatorics.bigCombination(b);
    IT([b], is_deeply(c.toArray(), [
        ["a", "b", "c", "d", "e", "f",
        "g", "h", "i", "j", "k", "l",
        "m", "n", "o", "p", "q", "r",
        "s", "t", "u", "v", "w", "x",
        "y", "z", "0", "1", "2", "3",
        "4", "5"]
    ]));

    // Testing lazy map
    c = Combinatorics.bigCombination(a, 5).lazyMap(function(a){
        if (a[0] === 'a') {
            a[0] = 'z'
        }
        return a;
    });
    IT([a, 5], is_deeply(c.toArray(), [
        ["z", "b", "c", "d", "e"],
        ["z", "b", "c", "d", "f"],
        ["z", "b", "c", "e", "f"],
        ["z", "b", "d", "e", "f"],
        ["z", "c", "d", "e", "f"],
        ["b", "c", "d", "e", "f"]
    ]));

    // And resetting the lazy map
    c.lazyMap();
    IT([a, 5], is_deeply(c.toArray(), [
        ["a", "b", "c", "d", "e"],
        ["a", "b", "c", "d", "f"],
        ["a", "b", "c", "e", "f"],
        ["a", "b", "d", "e", "f"],
        ["a", "c", "d", "e", "f"],
        ["b", "c", "d", "e", "f"]
    ]));
});
