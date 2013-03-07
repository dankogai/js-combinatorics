/*
 * $Id: combinatrics.js,v 0.3 2013/03/07 19:49:04 dankogai Exp dankogai $
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
    var power = function (ary, fun) {
        if (ary.length > 32) throw 'too many elements';
        var that = ary.slice(),
            size = Math.pow(2, that.length);
        that.valueOf = function () {
            return size;
        };
        that.index = 0;
        that.nth = function (n) {
            if (n >= 1 << this.length) return;
            var i = 0,
                result = [];
            for (; n; n >>>= 1, i++) if (n & 1) result.push(this[i]);
            return result;
        };
        that.next = function () {
            return that.nth(that.index++);
        };
        that.forEach = function (f) {
            var i = 0,
                l = 1 << this.length;
            for (; i < l; i++) f(this.nth(i));
        };
        that.toArray = that.map = function (f) {
            var i = 0,
                l = 1 << this.length,
                result = [];
            for (; i < l; i++) result[i] = f ? f(this.nth(i)) : this.nth(i);
            return result;
        };
        return (typeof (fun) === 'function') ? that.map(fun) : that;
    };
    /* utility functions for combination and permutation */
    var P = function (m, n) {
        var t, p = 1;
        if (m < n) {
            t = m;
            m = n;
            n = t
        };
        while (n--) p *= m--;
        return p;
    };
    var C = function (m, n) {
        return P(m, n) / P(n, n);
    };
    /* combination */
    var nextIndex = function (n) {
        var smallest = n & -n,
            ripple = n + smallest,
            new_smallest = ripple & -ripple,
            ones = ((new_smallest / smallest) >> 1) - 1;
        return ripple | ones;
    };
    var combination = function (ary, nelem, fun) {
        if (ary.length > 32) throw 'too many elements';
        if (!nelem) nelem = ary.length;
        if (nelem < 1) throw new RangeError;
        if (nelem > ary.length) throw new RangeError;
        var that = ary.slice(),
            size = C(that.length, nelem),
            first = (1 << nelem) - 1;
        that.valueOf = function () {
            return size;
        };
        that.index = first;
        that.next = function () {
            if (that.index >= 1 << this.length) return;
            var i = 0,
                n = that.index;
            result = [];
            for (; n; n >>>= 1, i++) if (n & 1) result.push(this[i]);
            that.index = nextIndex(that.index);
            return result;
        };
        that.toArray = that.map = function (f) {
            var e, result = [];
            that.index = first;
            while (e = that.next()) result.push(f ? f(e) : e);
            that.index = first;
            return result;
        };
        that.forEach = function (f) {
            that.index = first;
            while (e = that.next()) f(e);
            that.index = first;
        }
        return (typeof (fun) === 'function') ? that.map(fun) : that;
    };
    /* permutation */
    var baseN = function (b, d, n) {
        var result = [];
        for (var i = d - 1; i >= 0; --i) {
            var x = n % b;
            result[i] = x;
            n -= x;
            n /= b;
        }
        return result;
    };
    var inOrder = function (a) {
        for (var min = a[0], i = 1, l = a.length; i < l; i++) {
            if (min >= a[i]) return false;
            min = a[i];
        }
        return true;
    };
    var noDupe = function (a) {
        for (var i = 0, l = a.length, seen = {}; i < l; i++) {
            if (seen[a[i]]) return false;
            seen[a[i]] = true;
        }
        return true;
    };
    var make_cp = function (cond, calc) {
        return function (ary, nelem, fun) {
            if (!nelem) nelem = ary.length;
            if (nelem < 1) throw new RangeError;
            if (nelem > ary.length) throw new RangeError;
            var max = Math.pow(ary.length, nelem);
            if (max >= Math.pow(2, 52)) throw new RangeError;
            var that = ary.slice(),
                size = calc(that.length, nelem);
            that.valueOf = function () {
                return size
            };
            that.index = 0;
            that.next = function () {
                var idx = this.index,
                    len = this.length,
                    digits, result;
                for (; idx < max; idx++) {
                    digits = baseN(len, nelem, idx);
                    if (!cond(digits)) continue;
                    this.index = idx + 1;
                    return digits.map(function (d) {
                        return that[d]
                    });
                }
            }
            that.toArray = that.map = function (f) {
                var e, result = [];
                that.index = 0;
                while (e = that.next()) result.push(f ? f(e) : e);
                that.index = 0;
                return result;
            };
            that.forEach = function (f) {
                that.index = 0;
                while (e = that.next()) f(e);
                that.index = 0;
            }
            return (typeof (fun) === 'function') ? that.map(fun) : that;
        };
    };
    /* export */
    if (!global.Combinatrics) global.Combinatrics = {
        combination: combination, // make_cp(inOrder, C),
        permutation: make_cp(noDupe, P),
        power: power
    };
})(this);
