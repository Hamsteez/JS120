/* eslint-disable max-lines-per-function */
function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    notes: {},

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    listCourses() {
      console.log(this.courses);
    },

    addCourse(obj) {
      this.courses.push(obj);
    },

    addNote(inpCode, inpNote) {
      this.courses.forEach(course => {
        if (course.code === inpCode) {
          if (!(inpCode in this.notes)) {
            this.notes[inpCode] = `${course.name}: ${inpNote}`;
          } else {
            this.notes[inpCode] += `; ${inpNote}`;
          }
        }
      });
    },

    viewNotes() {
      for (const prop in this.notes) {
        console.log(`${this.notes[prop]}`);
      }
    },

    updateNote(inpCode, inpNote) {
      this.courses.forEach(course => {
        if (course.code === inpCode) {
          this.notes[inpCode] = `${course.name}: ${inpNote}`;
        }
      });
    }
  };
}


let foo = createStudent('Foo', '1st');
foo.info();
foo.listCourses();
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
foo.updateNote(101, 'Fun course');
foo.viewNotes();