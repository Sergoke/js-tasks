"use strict";

var Student = (function(){
    function Student(name, surname, birthYear, marks) {
        this.name = name;
        this.surname = surname || 'Anonymous';
        this.birthYear = birthYear || new Date().getFullYear() - 18;
        this.marks = marks || [];
        this.attendance = Object.defineProperty(new Array(25), 'length', {writable: false});
    }

    Student.prototype.getAge = function() {
        return new Date().getFullYear() - this.birthYear;
    };

    Student.prototype.getAverageMark = function() {
        if(!this.marks.length) return -1;
        var sum = this.marks.reduce(function(prev, cur) {
            return prev + cur;
        });
        return sum / this.marks.length;
    };

    Student.prototype.present = function() {
        return addAttendance.call(this, true);
    };

    Student.prototype.absent = function() {
        return addAttendance.call(this, false);
    };

    Student.prototype.summary = function() {
        var daysPassed = this.attendance.filter(function(){return true}).length;
        var attended = this.attendance.filter(function(day){return day}).length;
        var averageAttendance = attended / daysPassed;
        if(this.getAverageMark() >= 90 && averageAttendance >= 0.9){
            return "Ути какой молодчинка!";
        }
        else if(this.getAverageMark() >= 90 || averageAttendance >= 0.9){
            return "Норм, но можно лучше";
        }
        return "Редиска!";
    };

    //private helpers
    function addAttendance(wasAttended) {
        let index = Math.max(this.attendance.lastIndexOf(true), this.attendance.lastIndexOf(false)) + 1;
        try {
            this.attendance[index] = wasAttended;
        } catch(err) {
            console.error('max array length exceeded,', err);
        }
        return wasAttended;
    }

    return Student;
})();

//tests
var david = new Student('David', 'Smith', 2000, [90, 30, 200]);

for(var i = 0; i < 26; i++){
    Math.random() < 0.95 ? david.present() : david.absent();
}

console.log('age: ' + david.getAge());
console.log('attenance length: ' + david.attendance.length);
console.log('average mark: ' + david.getAverageMark());
console.log('summary: ' + david.summary());
