"use strict";

class Student {
    constructor(name, surname = 'Anonymous', birthYear = new Date().getFullYear() - 18, marks = []) {
        this.name = name;
        this.surname = surname;
        this.birthYear = birthYear;
        this.marks = marks;
    }

    attendance = Object.defineProperty(new Array(25), 'length', {writable: false});

    getAge() {
        return new Date().getFullYear() - this.birthYear;
    }

    present() {
        return Student.addAttendance(this, true);
    }

    absent() {
        return Student.addAttendance(this, false);
    }

    getAverageMark() {
        if(!this.marks.length) return -1;
        const sum = this.marks.reduce((prev, cur) => {
            return prev + cur;
        });
        return sum / this.marks.length;
    }

    summary() {
        const daysPassed = this.attendance.filter(() => true).length;
        const attended = this.attendance.filter(day => day).length;
        const averageAttendance = attended / daysPassed;
        if(this.getAverageMark() >= 90 && averageAttendance >= 0.9){
            return "Ути какой молодчинка!";
        }
        else if(this.getAverageMark() >= 90 || averageAttendance >= 0.9){
            return "Норм, но можно лучше";
        }
        return "Редиска!";
    }

    static addAttendance(student, wasAttended) {
        let index = Math.max(student.attendance.lastIndexOf(true), student.attendance.lastIndexOf(false)) + 1;
        try {
            student.attendance[index] = wasAttended;
        } catch(err) {
            console.error('max array length exceeded,', err);
        }
        return wasAttended;
    }
}

let st = new Student('Sergey', 'Puper', 2000, [90, 100]);
