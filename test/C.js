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
});
