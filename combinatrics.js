/*
 * $Id: combinatrics.js,v 0.2 2013/03/06 03:08:53 dankogai Exp dankogai $
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  References:
 *    http://www.ruby-doc.org/core-2.0/Array.html#method-i-combination
 *    http://www.ruby-doc.org/core-2.0/Array.html#method-i-permutation
 */

(function (global) {
    /* power set */
    var power = function(ary, fun) {
        if (ary.length > 32) throw 'too many elements';
        var that = ary.slice();
        that.index = 0;
        that.nth = function(n) {
            if (n >= 1 << this.length) return;
            var i = 0, result = [];
            for (; n; n >>>= 1, i++) if (n & 1) result.push(this[i]); 
            return result;
        };
        that.next = function() {
            return that.nth(that.index++);
        };
        that.each = function(f) {
            var i = 0, l= 1 << this.length;
            for (; i < l; i++) f(this.nth(i));
        };
        that.toArray = function() {
            var i = 0, l = 1 << this.length, result = [];
            for (; i < l; i++) result[i] = this.nth(i);
            return result;
        };
        if (typeof(fun) === 'function') that.each(fun);
        return that;
    };
    var baseN = function(b, d, n) {
        var result = [];
        for (var i = d - 1; i >= 0; --i) {
            var x = n % b;
            result[i] = x;
            n -= x; n /= b;
        }
        return result;
    };
    var inOrder = function(a) {
        for (var min = a[0], i = 1, l = a.length; i < l; i++) {
            if (min >= a[i]) return false;
            min = a[i];
        }
        return true;
    };
    var noDupe = function(a) {
        for (var i = 0, l = a.length, seen = {}; i < l; i++) {
            if (seen[a[i]]) return false;
            seen[a[i]] = true;
        }
        return true;
    };
    var make_cp = function(cond) {
        return function(ary, nelem, fun) {
            if (!nelem) nelem = ary.length;
            if (nelem < 1)          throw new RangeError;
            if (nelem > ary.length) throw new RangeError;
            var max  = Math.pow(ary.length, nelem);
            if (max >= Math.pow(2,52)) throw new RangeError;
            var that = ary.slice();
            that.index = 0;
            that.next = function() {
                var idx = this.index, 
                    len = this.length,  
                    digits, result;
                for (; idx < max; idx++) {
                    digits = baseN(len, nelem, idx);
                    if (!cond(digits)) continue;
                    this.index = idx + 1;
                    return digits.map(function(d) { return that[d] });
                }
            }
            that.toArray = function() {
                var e, result = [];
                that.index = 0;
                while(e = that.next()) result.push(e);
                that.index = 0;
                return result;
            };
            that.each = function(f) {
                that.index = 0;
                while(e = that.next()) f(e);
                that.index = 0;
            }
            if (typeof(fun) === 'function') that.each(fun);
            return that;
        };
    };
    /* export */
    if (! global.Combinatrics) global.Combinatrics = {
        combination:make_cp(inOrder),
        permutation:make_cp(noDupe),
        power:power
    };
})(this);
