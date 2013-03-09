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
describe('Combinatorics.cartesianProduct', function () {
    var c = Combinatorics.cartesianProduct(
    [0, 1, 2], [0, 10, 20], [0, 100, 200]);
    it(c, is_deeply(c.toArray(), [
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
    it(0 + c, is_deeply(0 + c, c.toArray().length));
    it(c.length, is_deeply(c.length, c.toArray().length));
    it(c, is_deeply(c.filter(function (a) {
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
});
