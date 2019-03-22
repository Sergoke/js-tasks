console.log('tests for Student: ');
var david = new Student('David', 'Smith', 2000, [90, 30, 200]);

for(var i = 0; i < 26; i++) {
    Math.random() < 0.95 ? david.present() : david.absent();
}

console.log('age: ' + david.getAge());
console.log('attenance length: ' + david.attendance.length);
console.log('average mark: ' + david.getAverageMark());
console.log('summary: ' + david.summary());

console.log('\ntests for Students Group: ');
var gr = new Group(new Student('David', 'Smith', 2000, [90, 30, 200]), new Student('David', 'Smith', 2000, [90, 30, 100]));
gr[0].present();
gr[0].absent();
gr[1].present();
gr[1].present();
console.log(gr, ' attendance:', gr.attendance(), ' performance:', gr.performance());
