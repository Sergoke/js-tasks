var Group = (function(){
    function Group(){
        this.length = 0;
        Object.defineProperty(this, 'length', {configurable: false, enumerable: false});

        [].slice.call(arguments).forEach(function(student) {
            this[this.length++] = student;
        }, this);
    }

    Group.prototype.attendance = function(){
        var totalAttendance = 0;
        for(var key in this){
            var daysPassed = this[key].attendance.filter(function(){return true}).length;
            var attended = this[key].attendance.filter(function(day) {return day}).length;

            totalAttendance +=  attended / daysPassed;
        }

        return totalAttendance / this.length * 100 + '%';
    };
    Object.defineProperty(Group.prototype, 'attendance', {configurable: false, enumerable: false});

    Group.prototype.performance = function(){
        var totalAverageMark = 0;
        for(var key in this){
            totalAverageMark += this[key].getAverageMark();
        }
        return totalAverageMark / this.length;
    };
    Object.defineProperty(Group.prototype, 'performance', {configurable: false, enumerable: false});

    return Group;
})();

//tests
var gr = new Group(new Student('David', 'Smith', 2000, [90, 30, 200]), new Student('David', 'Smith', 2000, [90, 30, 100]));
gr[0].present();
gr[0].absent();
gr[1].present();
gr[1].present();
console.log(gr, ' attendance:', gr.attendance(), ' performance:', gr.performance());
