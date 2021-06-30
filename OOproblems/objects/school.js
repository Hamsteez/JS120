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

let school = {
  students: [],

  addStudent(name, year) {
    if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year');
      return null;
    }
  },

  enrollStudent(student, obj) {
    this.students.forEach(existingStudent => {
      if (student === existingStudent.name) {
        existingStudent.addCourse(obj);
      }
    });
  },

  addGrade(student, courseCode, grade) {
    this.students.forEach(existingStudent => {
      if (student === existingStudent.name) {
        let idx;
        existingStudent.courses.forEach(course => {
          if (course.code === courseCode) {
            idx = existingStudent.courses.indexOf(course);
            existingStudent.courses[idx].grade = grade;
          }
        });
      }
    });
  },

  getReportCard(student) {
    this.students.forEach(existingStudent => {
      if (student === existingStudent.name) {
        existingStudent.courses.forEach(course => {
          if (course.grade === undefined) {
            console.log(`${course.name}: In progress`);
          } else {
            console.log(`${course.name}: ${course.grade}`);
          }
        });
      }
    });
  },

  courseReport(subject) {
    let grades = 0;
    let studentCntr = 0;
    console.log(`=${subject} Grades=`)
    this.students.forEach(existingStudent => {
      existingStudent.courses.forEach(course => {
        if (course.name === subject) {
          if (course.grade !== undefined) {
            console.log(`${existingStudent.name}: ${course.grade}`);
            grades += course.grade;
            studentCntr += 1;
          }
        }
      });
    });
    console.log(`---`);
    let avg = grades / studentCntr;
    console.log(`Course Average: ${avg}`)
  }

};

school.addStudent('foo', '3rd');
school.enrollStudent('foo', { name: 'Math', code: 101});
school.enrollStudent('foo', { name: 'Advanced Math', code: 102});
school.enrollStudent('foo', { name: 'Physics', code: 202});
school.addGrade('foo', 101, 95);
school.addGrade('foo', 102, 90);

school.addStudent('bar', '1st');
school.enrollStudent('bar', { name: 'Math', code: 101});
school.addGrade('bar', 101, 91);

school.addStudent('qux', '2nd');
school.enrollStudent('qux', { name: 'Math', code: 101});
school.enrollStudent('qux', { name: 'Advanced Math', code: 102});
school.addGrade('qux', 101, 93);
school.addGrade('qux', 102, 90);

school.getReportCard('foo');
school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');