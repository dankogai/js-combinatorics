/*
 * $Id: combinatorics.js,v 0.20 2013/03/09 01:06:30 dankogai Exp dankogai $
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  References:
 *    http://www.ruby-doc.org/core-2.0/Array.html#method-i-combination
 *    http://www.ruby-doc.org/core-2.0/Array.html#method-i-permutation
 */
(function (global) {
    if (global.Combinatorics) return;
    /* combinatory arithmetics */
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
    var factorial = function (n) {
        return P(n, n);
    };
    // http://en.wikipedia.org/wiki/Factorial_number_system
    var factoradic = function (n, d) {
        var f = 1;
        if (!d) {
            for (d = 1; f < n; f *= ++d);
            if (f > n) f /= d--;
        } else {
            f = factorial(d);
        }
        var result = [0];
        for (; d; f /= d--) {
            result[d] = Math.floor(n / f);
            n %= f;
        };
        return result;
    };
    /* power set */
    var power = function (ary, fun) {
        if (ary.length > 32) throw new RangeError;
        var that = ary.slice(),
            size = 1 << that.length;
        that.valueOf = function () {
            return size;
        };
        that.index = 0;
        that.nth = function (n) {
            if (n >= size) return;
            var i = 0,
                result = [];
            for (; n; n >>>= 1, i++) if (n & 1) result.push(this[i]);
            return result;
        };
        that.next = function () {
            return this.nth(this.index++);
        };
        that.forEach = function (f) {
            this.index = 0;
            var i = 0,
                l = 1 << this.length;
            for (; i < l; i++) f(this.nth(i));
        };
        that.toArray = that.map = function (f) {
            this.index = 0;
            var i = 0,
                l = 1 << this.length,
                result = [];
            for (; i < l; i++) result[i] = f ? f(this.nth(i)) : this.nth(i);
            return result;
        };
        return (typeof (fun) === 'function') ? that.map(fun) : that;
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
        if (ary.length > 32) throw new RangeError;
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
            while (e = this.next()) result.push(f ? f(e) : e);
            that.index = first;
            return result;
        };
        that.forEach = function (f) {
            var e;
            that.index = first;
            while (e = this.next()) f(e);
            that.index = first;
        }
        return (typeof (fun) === 'function') ? that.map(fun) : that;
    };
    /* permutation */
    var _permutation = function (ary) {
        var that = ary.slice(),
            size = factorial(that.length);
        that.valueOf = function () {
            return size;
        };
        that.index = 0;
        that.next = function () {
            if (that.index >= size) return;
            var copy = this.slice(),
                digits = factoradic(this.index, this.length),
                result = [],
                i = this.length - 1;
            for (; i >= 0; --i) result.push(copy.splice(digits[i], 1)[0]);
            that.index++;
            return result;
        };
        return that;
    };
    // which is really a permutation of combination
    var permutation = function (ary, nelem, fun) {
        if (!nelem) nelem = ary.length;
        if (nelem < 1) throw new RangeError;
        if (nelem > ary.length) throw new RangeError;
        var that = ary.slice(),
            size = P(that.length, nelem);
        that.valueOf = function () {
            return size;
        };
        that.init = function () {
            this.cmb = combination(ary, nelem);
            this.per = _permutation(that.cmb.next());
        };
        that.init();
        that.next = function () {
            var result = this.per.next();
            if (!result) {
                var cmb = this.cmb.next();
                if (!cmb) return;
                this.per = _permutation(cmb);
                return this.next();
            }
            return result;
        }
        that.toArray = that.map = function (f) {
            var e, result = [];
            this.init();
            while (e = this.next()) result.push(f ? f(e) : e);
            this.init();
            return result;
        };
        that.forEach = function (f) {
            var e;
            this.init();
            while (e = this.next()) f(e);
            this.init();
        }
        return (typeof (fun) === 'function') ? that.map(fun) : that;
    };
    /* Cartesian Product */
    var arraySlice = Array.prototype.slice;
    var cartesianProduct = function () {
        if (!arguments.length) throw new RangeError;
        var that = arraySlice.call(arguments),
            size = 1;
        that.forEach(function (e) {
            size *= e.length
        });
        if (!size) throw new RangeError;
        that.valueOf = function () {
            return size;
        };
        that.index = 0;
        that.get = function () {
            if (arguments.length !== this.length) return;
            var result = [],
                d = 0,
                dim = this.length;
            for (; d < dim; d++) {
                var i = arguments[d];
                if (i >= this[d].length) return;
                result.push(this[d][i]);
            }
            return result;
        };
        that.nth = function (n) {
            var result = [],
                d = 0,
                dim = this.length;
            for (; d < dim; d++) {
                var l = this[d].length;
                var i = n % l;
                result.push(this[d][i]);
                n -= i;
                n /= l;
            }
            return result;
        };
        that.next = function () {
            if (this.index >= 0 + this) return;
            var result = this.nth(this.index);
            this.index++;
            return result;
        }
        that.toArray = that.map = function (f) {
            this.index = 0;
            var i = 0,
                l = 0 + this,
                result = [];
            for (; i < l; i++) result[i] = f ? f(this.nth(i)) : this.nth(i);
            return result;
        };
        that.forEach = function (f) {
            this.index = 0;
            var i = 0,
                l = 0 + this;
            for (; i < l; i++) f(this.nth(i));
        }
        return that;
    };
    /* export */
    global.Combinatorics = {
        C: C,
        P: P,
        factorial: factorial,
        factoradic: factoradic,
        cartesianProduct: cartesianProduct,
        combination: combination,
        permutation: permutation,
        power: power
    };
})(this);
