class Group extends Array {
    attendance() {
        const totalAttendance = this.reduce((acc, cur) => {
            const daysPassed = cur.attendance.filter(() => true).length;
            const attended = cur.attendance.filter(day => day).length;
            return acc + attended / daysPassed;
    }, 0);

        return totalAttendance / this.length * 100 + '%';
    };

    performance() {
        const totalAverageMark = this.reduce(function(acc, cur) {
            return acc + cur.getAverageMark();
        }, 0);
        return totalAverageMark / this.length;
    };
}
