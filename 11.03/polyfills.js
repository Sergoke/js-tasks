"use strict";

var p = {//p = polyfill
    Object: {
        create: function(proto) {
            return {
                __proto__: proto
            };
        },

        keys: function(obj) {
            var keys = [];
            for(var key in obj){
                keys[keys.length] = key;
            }
            return keys;
        }
    },

    Array: {
        pop: function() {
            var popped = this[this.length - 1];
            this.length--;
            return popped;
        },

        push: function(elem) {//only one parameter
            this[this.length] = elem;
            return this.length;
        },

        shift: function() {
            var shifted = this[0];
            for(var i = 1; i < this.length; i++){
                this[i - 1] = this[i];
            }
            this.length--;
            return shifted;
        },

        unshift: function(elem) {// only one parameter
            for(var i = this.length - 1; i >= 0; i--){
                this[i + 1] = this[i];
            }
            this[0] = elem;
            return this.length;
        },

        map: function(callback) {
            var mapped = [];
            for(var i = 0; i < this.length; i++){
                mapped[i] = callback(this[i], i, this);
            }
            return mapped;
        },

        forEach: function(callback) {
            for(var i = 0; i < this.length; i++){
                callback(this[i], i, this);
            }
        },

        filter: function(callback) {
            var filtered = [];
            for(var i = 0; i < this.length; i++){
                if(callback(this[i], i, this)) {
                    filtered[filtered.length] = this[i];
                }
            }
            return filtered;
        },

        reverse: function() {// не переставляет на месте
            for(var i = 0; i < parseInt(this.length / 2); i++){
                var temp = this[i];
                this[i] = this[this.length - 1 - i];
                this[this.length - 1 - i] = temp;
            }
            return this;
        },

        join: function(separator) {
            if(!arguments.length) separator = ',';
            var res = "";
            for(var i = 0; i < this.length; i++){
                res += this[i];
                if(i !== this.length - 1)
                    res += separator;
            }
            return res;
        },

        reduce: function(callback, initVal) {
            var accum = initVal || this[0];
            var i = initVal ? 0 : 1;
            for(; i < this.length; i++){
                accum = callback(accum, this[i], i, this);
            }
            return accum;
        },

        sort: function(comparator) {
            comparator = comparator || function(a, b) {//default comparator
                if(String(a) > String(b)) return 1;
            };

            for(var i = 1; i < this.length; i++){// insertion sort
                var cur = this[i];
                for(var j = i; j > 0 && comparator(this[j - 1], cur) > 0; j--){
                    this[j] = this[j - 1];
                }
                this[j] = cur;
            }
            return this;
        }
    },

    Function: {
        call: function(context) {
            var argStr = Function.$getArgStr(arguments, 'arguments', 1);
            context[Symbol.for('func')] = this;
            var res = eval("context[Symbol.for('func')](" + argStr + ')');
            delete context[Symbol.for('func')];
            return res;
        },

        apply: function(context, args) {
            var argStr = Function.$getArgStr(args, 'args');
            return eval('this._call(context,' + argStr + ')');
        },

        bind: function(context) {
            var func = this;
            var bindArgs = arguments;
            var bindArgStr = Function.$getArgStr(arguments, 'bindArgs', 1);
            return function(){
                var argStr = Function.$getArgStr(arguments, 'arguments');
                return eval('func._call(context,' + bindArgStr + ',' + argStr + ')');
            }
        },

        //static helper
        getArgStr(args, collectionName, from) {
            var from = from || 0;
            var argStr = '';
            for(var i = from; i < args.length; i++){
                argStr += collectionName + '[' + i + ']';
                if(i !== args.length - 1){
                    argStr += ',';
                }
            }
            return argStr;
        }
    }
};

Object._create = p.Object.create;
Object._keys = p.Object.keys;

Array.prototype._pop = p.Array.pop;
Array.prototype._push = p.Array.push;
Array.prototype._shift = p.Array.shift;
Array.prototype._unshift = p.Array.unshift;
Array.prototype._map = p.Array.map;
Array.prototype._forEach = p.Array.forEach;
Array.prototype._filter = p.Array.filter;
Array.prototype._reverse = p.Array.reverse;
Array.prototype._join = p.Array.join;
Array.prototype._reduce = p.Array.reduce;
Array.prototype._sort = p.Array.sort;

Function.prototype._call = p.Function.call;
Function.prototype._apply = p.Function.apply;
Function.prototype._bind = p.Function.bind;
Function.$getArgStr = p.Function.getArgStr;
