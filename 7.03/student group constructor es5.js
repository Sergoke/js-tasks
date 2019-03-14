function Group() {
    this.students = [];
    [].slice.call(arguments).forEach(function(student) {
        this.students.push(student);
    }, this);
}

Group.prototype.attendance = function() {
    var studentsAttendance = this.students.map(function(student) {
        var daysPassed = student.attendance.filter(function() {return true}).length;
        var attended = student.attendance.filter(function(day) {return day}).length;

        return attended / daysPassed;
    });

    var totalAttendance = studentsAttendance.reduce(function(prev, cur) {
        return prev + cur;
    });

    return totalAttendance / this.students.length * 100 + '%';
};

Group.prototype.performance = function() {
    var totalAverageMark = this.students.reduce(function(prev, cur) {
        return prev.getAverageMark() + cur.getAverageMark();
    });

    return totalAverageMark / this.students.length;
};

//tests
var gr = new Group(new Student('David', 'Smith', 2000, [90, 30, 200]), new Student('David', 'Smith', 2000, [90, 30, 100]));
gr.students[0].present();
gr.students[0].absent();
gr.students[1].present();
gr.students[1].present();
console.log(gr, ' attendance:', gr.attendance(), ' performance:', gr.performance());
