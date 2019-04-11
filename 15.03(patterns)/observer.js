"use strict";

function Observable() {
    this.observers = [];
}

//some logic in observable
Observable.prototype.logic = function() {
    var self = this;

    setTimeout(function() {
        self.notifyObservers('Hello, observer, it\'s my message after 1 second');
    }, 1000);

    setTimeout(function() {
        self.notifyObservers('Hello, observer, it\'s my message after 3 seconds');
    }, 3000);

    setTimeout(function() {
        self.notifyObservers('Hello, observer, it\'s my message after 10 seconds');
    }, 10000);
};

Observable.prototype.addObserver = function(observer) {
    this.observers.push(observer);
};

Observable.prototype.notifyObservers = function(data) {
    this.observers.forEach(function(observer) {
        observer(data);
    });
};

var observable = new Observable();
observable.logic();

observable.addObserver(function(data) {
    console.log('first observer got message from observable: "' + data + '"');
});

observable.addObserver(function(data) {
    console.log('second observer got message from observable: "' + data + '"');
});
