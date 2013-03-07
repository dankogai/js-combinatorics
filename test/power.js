
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
    var a = [];
    it(a, is_deeply(Combinatrics.power(a).toArray(), [
        []
    ]));
    a = 'abc'.split('');
    it(a, is_deeply(Combinatrics.power(a).toArray(), [
        [],
        ["a"],
        ["b"],
        ["a", "b"],
        ["c"],
        ["a", "c"],
        ["b", "c"],
        ["a", "b", "c"]
    ]))
});