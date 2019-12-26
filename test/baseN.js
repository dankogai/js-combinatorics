
/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
var assert, Combinatorics;
if (this['window'] !== this) {
    assert = require("assert");
    Combinatorics = require('../.');
}
var is_deeply = function (a, e, m) {
    return function () {
        assert.equal(JSON.stringify(a), JSON.stringify(e), m)
    }
};
var IT=function(t,f){it(JSON.stringify(t),f)}; // mocha 3

describe('Combinatorics.baseN', function () {
    a = 'abc'.split(''), c = Combinatorics.baseN(a);
    IT(a, is_deeply(c.toArray(), [
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
    IT(0+c, is_deeply(0+c, c.toArray().length));
    IT(c.length, is_deeply(c.length, c.toArray().length));
    IT(a, is_deeply(c.filter(function(a){return a[0] === 'a'}),[
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

    // Testing lazy filter
    c = Combinatorics.baseN(a).lazyFilter(function(a){ 
        return a[0] === 'a'
    });
    IT(a, is_deeply(c.toArray(),[
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

    // And resetting the lazy filter
    c.lazyFilter();
    IT(a, is_deeply(c.toArray(), [
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
    
    // Testing lazy map
    c = Combinatorics.baseN(a).lazyMap(function(a){ 
        if (a[0] === 'a') {
            a[0] = 'z'
        }
        return a;
    });
    IT(a, is_deeply(c.toArray(),[
        [ 'z', 'a', 'a' ],
        [ 'b', 'a', 'a' ],
        [ 'c', 'a', 'a' ],
        [ 'z', 'b', 'a' ],
        [ 'b', 'b', 'a' ],
        [ 'c', 'b', 'a' ],
        [ 'z', 'c', 'a' ],
        [ 'b', 'c', 'a' ],
        [ 'c', 'c', 'a' ],
        [ 'z', 'a', 'b' ],
        [ 'b', 'a', 'b' ],
        [ 'c', 'a', 'b' ],
        [ 'z', 'b', 'b' ],
        [ 'b', 'b', 'b' ],
        [ 'c', 'b', 'b' ],
        [ 'z', 'c', 'b' ],
        [ 'b', 'c', 'b' ],
        [ 'c', 'c', 'b' ],
        [ 'z', 'a', 'c' ],
        [ 'b', 'a', 'c' ],
        [ 'c', 'a', 'c' ],
        [ 'z', 'b', 'c' ],
        [ 'b', 'b', 'c' ],
        [ 'c', 'b', 'c' ],
        [ 'z', 'c', 'c' ],
        [ 'b', 'c', 'c' ],
        [ 'c', 'c', 'c' ] 
    ]));

    // And resetting the lazy map
    c.lazyMap();
    IT(a, is_deeply(c.toArray(), [
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

    // Testing .reduce
    var r = function(a, e, i){return a + i + ":" + e + ";"};
    var s = c.toArray().reduce(r, "");
    IT( s + " // c.reduce", is_deeply(s, c.reduce(r, "")));

});
