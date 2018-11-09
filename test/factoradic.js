/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
var assert, Combinatorics;
if (this['window'] !== this) {
    assert = require("assert");
    Combinatorics = require('../.');
}

describe('Combinatorics.factoradic', function () {
    it('1 should equal [0, 1]', function() {
        var expected = [0, 1];
        var actual = Combinatorics.factoradic(1);
        assert.equal(JSON.stringify(actual), JSON.stringify(expected));
    });

    it('5 should equal [0, 1, 2]', function() {
        var expected = [0, 1, 2];
        var actual = Combinatorics.factoradic(5);
        assert.equal(JSON.stringify(actual), JSON.stringify(expected));
    });

    it('[25, 1] should equal [0, 25]', function() {
        var expected = [0, 25];
        var actual = Combinatorics.factoradic(25, 1);
        assert.equal(JSON.stringify(actual), JSON.stringify(expected));
    });

    it('[1, 1.5] should throw `RangeError`', function() {
        assert.throws(function() { Combinatorics.factoradic(1, 1.5) }, RangeError);
    });
});
