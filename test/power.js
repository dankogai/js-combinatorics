
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
describe('Combinatrics.power', function () {
    var a = [], c = Combinatrics.power(a);
    it(c, is_deeply(c.toArray(), [
        []
    ]));
    a = 'abc'.split(''), c = Combinatrics.power(a);
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
});