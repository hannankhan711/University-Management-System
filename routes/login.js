var express = require("express");
const { waitingCount } = require("../db");
var pool = require("../db");

const loginRouter = express.Router();

loginRouter
    .get('/faculty/', (req, res) => {
        res.render('facultyLogin')
    })
    .post('/faculty/', async (req, res) => {
        try {
            var { username, password } = req.body;
            if (!username || !password) {
                res.redirect('/login/faculty');
            }
            const { rows } = await pool.query('select * from faculty where facultyname = $1 and facultypass = $2;', [username, password]);
            
            if (rows.length === 0) {
                return res.redirect('/login/faculty');
            }

            if (username !== rows[0].facultyname && password !== rows[0].facultypass) {
                return res.redirect('/login/faculty');
            }
            res.cookie('isLoggedIn', true, {
                path: '/'
            })
            return res.redirect(`/login/faculty/${rows[0].faculty_id}`);
        } catch (err) {
            console.log(err);
        }
    })
    .get('/faculty/:id', async (req, res) => {
        if (!req.cookies['isLoggedIn']) {
            return res.redirect('/login/faculty');
        }
        const { id } = req.params
        const { rows } = await pool.query("select * from faculty f,university u ,campus c where f.university_id = u.university_id and c.university_id = u.university_id and faculty_id = $1 ", [Number(id)]);
        res.render("facultyShow", {
            faculty: rows[0]
        })
    })
    .get('/student/', async (req, res) => {
        res.render('studentLogin')
    })
    .post('/student/', async (req, res) => {
        try {
            var { username, password } = req.body;
            if (!username || !password) {
                res.redirect('/login/student');
            }
            const { rows } = await pool.query('select * from students where studentname = $1 and studentpass = $2;', [username, password]);
            //console.log(rows)
            if (rows.length === 0) {
                return res.redirect('/login/student');
            }

            if (username !== rows[0].studentname && password !== rows[0].studentpass) {
                return res.redirect('/login/student');
            }
            res.cookie('isLoggedIn', true, {
                path: '/'
            })

            return res.redirect(`/login/student/${rows[0].student_id}`);


        } catch (err) {
            console.log(err)
        }
    })
    .get('/admin', async (req, res) => {
        try {
            res.render('adminLogin');
        } catch (error) {
            console.log(err);
        }
    })
    .post('/admin/', async (req, res) => {
        try {
            var { username, password } = req.body;
            if (!username || !password) {
                res.redirect('/login/admin');
            };

            if (username !== 'admin' && password !== 'admin') {
                console.log('loginFailed')
                return res.redirect('/login/admin');
            };

            res.cookie('isLoggedIn', true, {
                path: '/'
            })
            //console.log('login success');
            return res.redirect('/login/admin/1');
        } catch (err) {
            console.log(err);
        }
    })


module.exports = loginRouter;