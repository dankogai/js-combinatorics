/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
var assert, Combinatorics;
if (this['window'] !== this) {
    assert = require("assert");
    Combinatorics = require('../.');
}

describe('Combinatorics.P', function () {
    it('[3, 2] should equal 6', function() {
        assert.equal(Combinatorics.P(3, 2), 6);
    });

    it('[1, 1] should equal 1', function() {
        assert.equal(Combinatorics.P(1, 1), 1);
    });

    it('[2, 5] should equal 0', function() {
        assert.equal(Combinatorics.P(2, 5), 0);
    });

    it('[5, 1.5] should throw `RangeError`', function() {
        assert.throws(function() { Combinatorics.P(5, 1.5) }, RangeError);
    });
});
