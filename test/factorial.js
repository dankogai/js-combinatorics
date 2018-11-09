/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
var assert, Combinatorics;
if (this['window'] !== this) {
    assert = require("assert");
    Combinatorics = require('../.');
}

describe('Combinatorics.factorial', function () {
    it('0 should equal 1', function() {
        assert.equal(Combinatorics.factorial(0), 1);
    });

    it('1 should equal 1', function() {
        assert.equal(Combinatorics.factorial(1), 1);
    });

    it('4 should equal 24', function() {
        assert.equal(Combinatorics.factorial(4), 24);
    });

    it('1.5 should throw `RangeError`', function() {
        assert.throws(function() { Combinatorics.factorial(1.5) }, RangeError);
    });
});
