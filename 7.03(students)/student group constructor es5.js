var Group = (function() {
    function Group() {
        this.length = 0;
        Object.defineProperty(this, 'length', {configurable: false, enumerable: false});

        [].slice.call(arguments).forEach(function(student) {
            this.push(student);
        }, this);
    }

    Group.prototype = Object.create(Array.prototype);
    Group.prototype.constructor = Group;

    Group.prototype.attendance = function() {
        var totalAttendance = this.reduce(function(acc, cur) {
            var daysPassed = cur.attendance.filter(function() {return true}).length;
            var attended = cur.attendance.filter(function(day) {return day}).length;
            return acc + attended / daysPassed;
        }, 0);

        return totalAttendance / this.length * 100 + '%';
    };
    Object.defineProperty(Group.prototype, 'attendance', {enumerable: false});

    Group.prototype.performance = function() {
        var totalAverageMark = this.reduce(function(acc, cur) {
            return acc + cur.getAverageMark();
        }, 0);
        return totalAverageMark / this.length;
    };
    Object.defineProperty(Group.prototype, 'performance', {enumerable: false});

    return Group;
})();
