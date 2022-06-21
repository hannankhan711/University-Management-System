const { resolveInclude } = require("ejs");
var express = require("express");
const { reset } = require("nodemon");
var pool = require("../db");

const onestudentRouter = express.Router();

onestudentRouter.get('/:id', async (req, res) => {
    if (!req.cookies['isLoggedIn']) {
        return res.redirect('/login/student')
    }
    const { id } = req.params
    const studentIdquery = await pool.query('select * from students where student_id = $1;', [Number(id)]);
    studentId = studentIdquery.rows[0];
    const attributes = '*';
    const tables = 'students s, schools sc, programmes p, faculty f';
    const relations = ' s.programmecode = p.programmecode and sc.school_id = p.school_id and s.programmecode = p.programmecode and sc.faculty_id = f.faculty_id';
    const schoolNameQuery = await pool.query(`select ${attributes} from ${tables} where ${relations} and s.student_id = $1;`, [Number(id)]);
    schoolName = schoolNameQuery.rows[0];
    //console.log(schoolNameQuery);
    res.render('studentShow', {
        students: studentId,
        school: schoolName
    })
})
    .get('/:id/details', async (req, res) => {
        const { id } = req.params
        const attributes = '*';
        const tables = 'students s, programmes p,courses c';
        const relations = 's.programmecode = p.programmecode and c.programmecode = p.programmecode'
        const { rows } = await pool.query(`select ${attributes} from ${tables} where ${relations} and s.student_id = $1;`, [Number(id)]);
        res.render('studentProgrammes', {
            studentProgrammes: rows
        })
    })
module.exports = onestudentRouter;