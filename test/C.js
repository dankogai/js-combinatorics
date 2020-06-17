/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
var assert, Combinatorics;
if (this['window'] !== this) {
    assert = require("assert");
    Combinatorics = require('../.');
}

describe('Combinatorics.C', function () {
    it('[3, 2] should equal 3', function() {
        assert.equal(Combinatorics.C(3, 2), 3);
    });

    it('[1, 1] should equal 1', function() {
        assert.equal(Combinatorics.C(1, 1), 1);
    });

    it('[2, 5] should equal 0', function() {
        assert.equal(Combinatorics.C(2, 5), 0);
    });

    it('[5, 1.5] should throw `RangeError`', function() {
        assert.throws(function() { Combinatorics.C(5, 1.5) }, RangeError);
    });
});
try { eval(`
    describe('Combinatorics.C for BigInt', () => {
        it('[3n, 2n] should equal 3n', () => {
            assert.equal(Combinatorics.C(3n, 2n), 3n);
        });
        it('[1n, 1n] should equal 1n', () => {
            assert.equal(Combinatorics.C(1n, 1n), 1n);
        });
        it('[2n, 5n] should equal 0n', () => {
            assert.equal(Combinatorics.C(2n, 5n), 0n);
        });
    });`);
} catch(e) {
};
