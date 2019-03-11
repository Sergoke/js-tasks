let Student = (function(){
    function Student(name, surname, birthYear, marks) {
        this.name = name;
        this.surname = surname;
        this.birthYear = birthYear;
        this.marks = marks || [];
        this.attendance = new Array(25);
    }

    Student.prototype.getAge = function() {
        return new Date().getFullYear() - this.birthYear;
    };

    Student.prototype.getAverageMark = function() {
        if(!this.marks.length) return -1;
        let sum = this.marks.reduce(function(prev, cur) {
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
        let daysPassed = this.attendance.filter(elem => true).length;
        let attended = this.attendance.filter(day => day).length;
        let averageAttendance = attended / daysPassed;
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
        if(index < this.attendance.length) {
            this.attendance[index] = wasAttended;
            return true;
        }
        return false;
    }

    return Student;
})();

let david = new Student('David', 'Smith', 2000, [90, 30, 200]);

for(let i = 0; i < 100; i++){
    Math.random() < 0.95 ? david.present() : david.absent();
}

console.log('age: ' + david.getAge());
console.log('attenance length: ' + david.attendance.length);
console.log('average mark: ' + david.getAverageMark());
console.log('summary: ' + david.summary());
