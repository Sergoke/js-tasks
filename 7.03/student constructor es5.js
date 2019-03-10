function Student(name, surname, birthYear) {
    this.name = name;
    this.surname = surname;
    this.birthYear = birthYear;
    this.marks = [91, 100, 95, 93];
    this.attendance = new Array(25);

    this.getAge = function() {
        return new Date().getFullYear() - this.birthYear;
    };

    this.getAverageMark = function() {
        let sum = this.marks.reduce(function(prev, cur) {
            return prev + cur;
        });
        return sum / this.marks.length;
    };

    this.present = function() {
        return addAttendance.call(this, true);
    };

    this.absent = function() {
        return addAttendance.call(this, false);
    };

    this.summary = function() {
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

    function addAttendance(wasAttended) {
        let index = Math.max(this.attendance.lastIndexOf(true), this.attendance.lastIndexOf(false)) + 1;
        if(index < this.attendance.length) {
            this.attendance[index] = wasAttended;
            return true;
        }
        return false;
    }
}

let david = new Student('David', 'Smith', 2000);

for(let i = 0; i < 100; i++){
    Math.random() < 0.95 ? david.present() : david.absent();
}

console.log(david.attendance.length);
console.log(david.getAverageMark());
console.log(david.summary());
