/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
var assert, Combinatrics;
if (this['window'] !== this) {
    assert = require("assert");
    Combinatrics = require('../combinatrics.js').Combinatrics;
}
var is_deeply = function (a, e, m) {
    return function () {
        assert.equal(JSON.stringify(a), JSON.stringify(e), m)
    }
};

describe('Combinatrics.combination', function () {
    var a = 'abcdef'.split('');
    it([a,1], is_deeply(Combinatrics.combination(a, 1).toArray(), [
        ["a"],
        ["b"],
        ["c"],
        ["d"],
        ["e"],
        ["f"]
    ]));
    it([a,2], is_deeply(Combinatrics.combination(a, 2).toArray(), [
        ["a", "b"],
        ["a", "c"],
        ["a", "d"],
        ["a", "e"],
        ["a", "f"],
        ["b", "c"],
        ["b", "d"],
        ["b", "e"],
        ["b", "f"],
        ["c", "d"],
        ["c", "e"],
        ["c", "f"],
        ["d", "e"],
        ["d", "f"],
        ["e", "f"]
    ]));
    it([a,3], is_deeply(Combinatrics.combination(a, 3).toArray(), [
        ["a", "b", "c"],
        ["a", "b", "d"],
        ["a", "b", "e"],
        ["a", "b", "f"],
        ["a", "c", "d"],
        ["a", "c", "e"],
        ["a", "c", "f"],
        ["a", "d", "e"],
        ["a", "d", "f"],
        ["a", "e", "f"],
        ["b", "c", "d"],
        ["b", "c", "e"],
        ["b", "c", "f"],
        ["b", "d", "e"],
        ["b", "d", "f"],
        ["b", "e", "f"],
        ["c", "d", "e"],
        ["c", "d", "f"],
        ["c", "e", "f"],
        ["d", "e", "f"]
    ]));
    it([a,4], is_deeply(Combinatrics.combination(a, 4).toArray(), [
        ["a", "b", "c", "d"],
        ["a", "b", "c", "e"],
        ["a", "b", "c", "f"],
        ["a", "b", "d", "e"],
        ["a", "b", "d", "f"],
        ["a", "b", "e", "f"],
        ["a", "c", "d", "e"],
        ["a", "c", "d", "f"],
        ["a", "c", "e", "f"],
        ["a", "d", "e", "f"],
        ["b", "c", "d", "e"],
        ["b", "c", "d", "f"],
        ["b", "c", "e", "f"],
        ["b", "d", "e", "f"],
        ["c", "d", "e", "f"]
    ]));
    it([a,5], is_deeply(Combinatrics.combination(a, 5).toArray(), [
        ["a", "b", "c", "d", "e"],
        ["a", "b", "c", "d", "f"],
        ["a", "b", "c", "e", "f"],
        ["a", "b", "d", "e", "f"],
        ["a", "c", "d", "e", "f"],
        ["b", "c", "d", "e", "f"]
    ]));
    it([a,6], is_deeply(Combinatrics.combination(a, 6).toArray(), [
        ["a", "b", "c", "d", "e", "f"]
    ]));
});