
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
describe('Combinatorics.baseN', function () {
    a = 'abc'.split(''), c = Combinatorics.baseN(a);
    it(a, is_deeply(c.toArray(), [
        [ 'a', 'a', 'a' ],
        [ 'b', 'a', 'a' ],
        [ 'c', 'a', 'a' ],
        [ 'a', 'b', 'a' ],
        [ 'b', 'b', 'a' ],
        [ 'c', 'b', 'a' ],
        [ 'a', 'c', 'a' ],
        [ 'b', 'c', 'a' ],
        [ 'c', 'c', 'a' ],
        [ 'a', 'a', 'b' ],
        [ 'b', 'a', 'b' ],
        [ 'c', 'a', 'b' ],
        [ 'a', 'b', 'b' ],
        [ 'b', 'b', 'b' ],
        [ 'c', 'b', 'b' ],
        [ 'a', 'c', 'b' ],
        [ 'b', 'c', 'b' ],
        [ 'c', 'c', 'b' ],
        [ 'a', 'a', 'c' ],
        [ 'b', 'a', 'c' ],
        [ 'c', 'a', 'c' ],
        [ 'a', 'b', 'c' ],
        [ 'b', 'b', 'c' ],
        [ 'c', 'b', 'c' ],
        [ 'a', 'c', 'c' ],
        [ 'b', 'c', 'c' ],
        [ 'c', 'c', 'c' ] 
    ]));
    it(0+c, is_deeply(0+c, c.toArray().length));
    it(c.length, is_deeply(c.length, c.toArray().length));
    it(a, is_deeply(c.filter(function(a){return a[0] === 'a'}),[
        [ 'a', 'a', 'a' ],
        [ 'a', 'b', 'a' ],
        [ 'a', 'c', 'a' ],
        [ 'a', 'a', 'b' ],
        [ 'a', 'b', 'b' ],
        [ 'a', 'c', 'b' ],
        [ 'a', 'a', 'c' ],
        [ 'a', 'b', 'c' ],
        [ 'a', 'c', 'c' ] 
    ]));
});
