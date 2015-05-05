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

describe('Combinatorics.permutationCombination', function () {
    var a = 'a'.split(''),
        c = Combinatorics.permutationCombination(a);
    it(a, is_deeply(c.toArray(), [
        ["a"]
    ]));
    it(c + 0, is_deeply(c + 0, c.toArray().length));
    it(c.length, is_deeply(c.length, c.toArray().length));
    a = 'ab'.split('');
    c = Combinatorics.permutationCombination(a);
    it(a, is_deeply(c.toArray(), [
        ["a"],
        ["b"],
        ["a", "b"],
        ["b", "a"]
    ]));
    it(a, is_deeply(c.filter(function(a){ return a[0] === 'a'}), [
        ["a"],
        ["a", "b"]
    ]));
    it(c + 0, is_deeply(c + 0, c.toArray().length));
    it(c.length, is_deeply(c.length, c.toArray().length));
    a = 'abc'.split('');
    c = Combinatorics.permutationCombination(a);
    it(a, is_deeply(c.toArray(), [
        ["a"],
        ["b"],
        ["c"],
        ["a","b"],
        ["b","a"],
        ["a","c"],
        ["c","a"],
        ["b","c"],
        ["c","b"],
        ["a","b","c"],
        ["a","c","b"],
        ["b","a","c"],
        ["b","c","a"],
        ["c","a","b"],
        ["c","b","a"]
    ]));
    it(c + 0, is_deeply(c + 0, c.toArray().length));
    it(c.length, is_deeply(c.length, c.toArray().length));
    a = 'abcd'.split('');
    c = Combinatorics.permutationCombination(a);
    it(a, is_deeply(c.toArray(), [
                ["a"],
                ["b"],
                ["c"],
                ["d"],
                ["a","b"],
                ["b","a"],
                ["a","c"],
                ["c","a"],
                ["b","c"],
                ["c","b"],
                ["a","d"],
                ["d","a"],
                ["b","d"],
                ["d","b"],
                ["c","d"],
                ["d","c"],
                ["a","b","c"],
                ["a","c","b"],
                ["b","a","c"],
                ["b","c","a"],
                ["c","a","b"],
                ["c","b","a"],
                ["a","b","d"],
                ["a","d","b"],
                ["b","a","d"],
                ["b","d","a"],
                ["d","a","b"],
                ["d","b","a"],
                ["a","c","d"],
                ["a","d","c"],
                ["c","a","d"],
                ["c","d","a"],
                ["d","a","c"],
                ["d","c","a"],
                ["b","c","d"],
                ["b","d","c"],
                ["c","b","d"],
                ["c","d","b"],
                ["d","b","c"],
                ["d","c","b"],
                ["a","b","c","d"],
                ["a","b","d","c"],
                ["a","c","b","d"],
                ["a","c","d","b"],
                ["a","d","b","c"],
                ["a","d","c","b"],
                ["b","a","c","d"],
                ["b","a","d","c"],
                ["b","c","a","d"],
                ["b","c","d","a"],
                ["b","d","a","c"],
                ["b","d","c","a"],
                ["c","a","b","d"],
                ["c","a","d","b"],
                ["c","b","a","d"],
                ["c","b","d","a"],
                ["c","d","a","b"],
                ["c","d","b","a"],
                ["d","a","b","c"],
                ["d","a","c","b"],
                ["d","b","a","c"],
                ["d","b","c","a"],
                ["d","c","a","b"],
                ["d","c","b","a"]
    ]));
    it(c + 0, is_deeply(c + 0, c.toArray().length));
    it(c.length, is_deeply(c.length, c.toArray().length));
});
