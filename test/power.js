
/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
var assert, Combinatorics;
if (this['window'] !== this) {
    assert = require("assert");
    Combinatorics = require('../combinatorics.js').Combinatorics;
}
var is_deeply = function (a, e, m) {
    return function () {
        assert.equal(JSON.stringify(a), JSON.stringify(e), m)
    }
};
describe('Combinatorics.power', function () {
    var a = [], c = Combinatorics.power(a);
    it(c, is_deeply(c.toArray(), [
        []
    ]));
    a = 'abc'.split(''), c = Combinatorics.power(a);
    it(a, is_deeply(c.toArray(), [
        [],
        ["a"],
        ["b"],
        ["a", "b"],
        ["c"],
        ["a", "c"],
        ["b", "c"],
        ["a", "b", "c"]
    ]));
    it(0+c, is_deeply(0+c, c.toArray().length));
    it(c.length, is_deeply(c.length, c.toArray().length));
    it(a, is_deeply(c.filter(function(a){return a.length === 2}),
                    Combinatorics.combination(a,2).toArray()
           ));
});
