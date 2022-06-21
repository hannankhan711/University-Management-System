const { resolveInclude } = require("ejs");
const { response } = require("express");
var express = require("express");
var pool = require("../db");
const loginRouter = require("./login");

const studentRouter = express.Router();

// ROUTE: /login/faculty/:id/student/
studentRouter.get('/:id/student', async (req, res) => {
    try {
        const { id } = req.params
        const facultyIdQuery = await pool.query('select * from faculty where faculty_id = $1;', [Number(id)]);
        const facultyIdData = facultyIdQuery.rows;
        const name = facultyIdData[0].facultyname;
        const studentsUnderFacultyQuery = await pool.query
            ('select * from students,programmes,schools,faculty where students.programmecode = programmes.programmecode and programmes.school_id = schools.school_id and schools.faculty_id = faculty.faculty_id and facultyname = $1', [String(name)]);
        const studentsUnderFaculty = studentsUnderFacultyQuery.rows;
        res.render('studentList', {
            facultyStudentData: studentsUnderFaculty,
            facultyId: facultyIdData
        })
    } catch (err) {
        console.error(err);
    }
})
    .get("/:id/student/new", async (req, res) => {
        try {
            const { id } = req.params
            const { rows } = await pool.query("select * from faculty where faculty_id = $1", [Number(id)]);
            res.render("newstudent", { faculty: rows[0] });
        } catch (err) {
            console.log(err);
        }
    })
    .get('/:id/student/:s_id', async (req, res) => {
        try {
            const { id, s_id } = req.params;
            const facultyIdQuery = await pool.query("select * from faculty where faculty_id = $1", [Number(id)]);
            const facultyId = facultyIdQuery.rows[0];
            const studentsFacultyQuery = await pool.query('select * from students s left join programmes p on p.programmecode = s.programmecode left join schools sc on p.school_id = sc.school_id left join courses c on c.programmecode = p.programmecode where student_id = $1 ', [s_id]);
            res.render('studentDetail', {
                studentData: studentsFacultyQuery.rows,
                faculty: facultyId,
                studentId: s_id
            });
        } catch (err) {
            console.log(err)
        }
    })
    .post('/:id/student', async (req, res) => {
        try {
            const { id } = req.params
            const { rows } = await pool.query("select * from faculty where faculty_id = $1", [Number(id)]);
            const { studentname, studentpass, birthday, yearOfEnrollment, programmeCode } = req.body
            const query = await pool.query("insert into students (studentname, studentpass, birthday, yearofenrollment, programmecode) values ($1, $2, $3, $4, $5);", [studentname, studentpass, birthday, yearOfEnrollment, programmeCode])
            res.redirect(`/login/faculty/${rows[0].faculty_id}/student`)
        } catch (err) {
            console.log(err)
        }
    })
    .get('/:id/student/:s_id/update', async (req, res) => {
        try {
            const { id, s_id } = req.params;
            const { rows } = await pool.query('select * from students where student_id = $1 ;', [Number(s_id)]);
            res.render('studentUpdate', {
                student: rows[0],
                studentId: s_id,
                facultyId: id
            });
        } catch (err) {
            console.log(err)
        }
    })
    .put('/:id/student/:s_id', async (req, res) => {
        try {
            const { id, s_id } = req.params
            const { studentname, birthday, yearofenrollment } = req.body
            const updateStudent = await pool.query('UPDATE students SET studentname = $1, birthday = $2,yearofenrollment = $3 where student_id = $4;', [studentname, birthday, yearofenrollment, s_id]);
            console.log("Student was Updated");
            res.redirect('/login/faculty/' + id + '/student/' + s_id);
        } catch (err) {
            console.log(err);
        }
    })
    .delete('/:id/student/:s_id', async (req, res) => {
        try {
            const { id, s_id } = req.params;
            const deleteStudent = await pool.query('DELETE FROM students WHERE student_id = $1', [s_id]);
            console.log("student deleted");
            res.redirect('/login/faculty/' + id + '/student');
        } catch (error) {
            console.log(error);
        }
    });

module.exports = studentRouter;