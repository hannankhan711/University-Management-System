const { resolveInclude } = require("ejs");
const { response } = require("express");
var express = require("express");
const { reset } = require("nodemon");
var pool = require("../db");

const adminRouter = express.Router();

//ROUTE : login/admin/1

adminRouter.get('/1', async (req, res) => {
    if (!req.cookies['isLoggedIn']) {
        return res.redirect('/login/admin');
    }

    const facultyNumber = await pool.query('select count(faculty_id) from faculty');
    const universityNumber = await pool.query('select count(university_id) from university');
    const campusNumber = await pool.query('select count(campus_id) from campus');
    const schoolNumber = await pool.query('select count(school_id) from schools');
    const studentNumber = await pool.query('select count(student_id) from students');
    const programmeNumber = await pool.query('select count(programmecode) from programmes');
    const totalUniversity = universityNumber.rows[0];
    const totalFaculty = facultyNumber.rows[0];
    const totalCampus = campusNumber.rows[0];
    const totalSchool = schoolNumber.rows[0];
    const totalStudent = studentNumber.rows[0];
    const totalProgrammes = programmeNumber.rows[0];


    res.render('adminShow', {
        facultyNumber: totalFaculty.count,
        universityNumber: totalUniversity.count,
        campusNumber: totalCampus.count,
        schoolNumber: totalSchool.count,
        studentNumber: totalStudent.count,
        programmeNumber: totalProgrammes.count
    })
})
    .get('/1/faculty', async (req, res) => {
        const facultyQuery = await pool.query('select *,faculty.faculty_id from faculty LEFT JOIN schools ON schools.faculty_id = faculty.faculty_id LEFT JOIN university ON faculty.university_id = university.university_id;');
        res.render('adminFaculty', { facultyQuery: facultyQuery.rows })
    })
    .get('/1/faculty/new', async (req, res) => {
        try {
            const univresityQuery = await pool.query('select * from university');
            const universityDetails = univresityQuery.rows
            res.render('adminFacultyNew', { universityDetails });
        } catch (error) {
            console.log(error)
        }
    })
    .post('/1/faculty', async (req, res) => {
        try {
            const { facultyName, facultyPass, facultyField, dean, building, university_id } = req.body;
            const newfacultyQuery = await pool.query('INSERT INTO faculty(facultyName,facultyPass,facultyField,dean,building,university_id) VALUES ($1,$2,$3,$4,$5,$6);', [facultyName, facultyPass, facultyField, dean, building, university_id]);
            res.redirect(`/login/admin/1/faculty`)
        } catch (error) {
            console.log(error)
        }
    })
    .get('/1/faculty/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const facultyQuery = await pool.query('select * from faculty where faculty_id = $1', [Number(id)]);
            const universityQuery = await pool.query('select * from university');
            const universityDetails = universityQuery.rows
            const facultyDetails = facultyQuery.rows[0];
            res.render('adminFacultyEdit', { facultyDetails, universityDetails });
        } catch (error) {
            console.log(error);
        }
    })
    .put('/1/faculty/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { facultyName, facultyField, dean, university_id } = req.body;
            // update faculty set (facultyName, facultyField, dean, university_id) = ('Adnan','Data Analysis','Thomas','1') where faculty.faculty_id = 1
            const updateFaculty = await pool.query('update faculty set (facultyName, facultyField, dean, university_id) = ($1,$2,$3,$4) where faculty.faculty_id = $5', [facultyName, facultyField, dean, university_id, id]);
            res.redirect('/login/admin/1/faculty');
        } catch (error) {
            console.log(error)
        }
    })
    .delete('/1/faculty/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const facultyDelete = await pool.query('DELETE FROM faculty WHERE faculty_id = $1', [id]);
            res.redirect('/login/admin/1/faculty')
        } catch (error) {
            console.log(error)
        }
    })
    .get('/1/campus', async (req, res) => {
        const campusQuery = await pool.query("select * from campus c, university u where c.university_id = u.university_id");
        const campus = campusQuery.rows;
        res.render("adminCampus", { campus: campus });
    })
    .get('/1/campus/new', async (req, res) => {
        res.render('adminCampusNew');
    })
    .post('/1/campus', async (req, res) => {
        const { campusName, address, distanceThroughTheCity, onlyBus, university_id } = req.body;
        const newcampusQuery = await pool.query('INSERT INTO campus(campusName,address,distanceThroughTheCity,onlyBus,university_id) VALUES ($1,$2,$3,$4,$5);', [campusName, address, distanceThroughTheCity, onlyBus, university_id]);
        res.redirect('/login/admin/1/campus');
    })
    .put('/1/campus/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { campusName, address, distanceThroughTheCity, onlyBus, university_id } = req.body;
            const updateCampus = await pool.query('update campus set (campusName,address,distanceThroughTheCity,onlyBus,university_id) = ($1,$2,$3,$4,$5) where campus.campus_id = $6', [campusName, address, distanceThroughTheCity, onlyBus, university_id, id]);
            console.log('Campus Updated')
            res.redirect('/login/admin/1/campus')
        } catch (error) {
            console.log(error);
        }
    })
    .delete('/1/campus/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const deleteCampus = await pool.query('delete from campus where campus_id = $1', [id]);
            res.redirect('/login/admin/1/campus');
        } catch (error) {
            console.log(error)
        }
    })
    .get('/1/campus/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const campusQuery = await pool.query('select * from campus where campus_id = $1', [id]);
            const universityQuery = await pool.query('select * from university')
            const universityDetails = universityQuery.rows
            const campusDetails = campusQuery.rows[0];
            res.render('adminCampusEdit', { campusDetails, universityDetails });
        } catch (error) {
            console.log(error)
        }
    })
    .get('/1/school', async (req, res) => {
        const schoolQuery = await pool.query('select *,faculty from schools LEFT JOIN faculty ON schools.faculty_id = faculty.faculty_id');
        const school = schoolQuery.rows;
        res.render('adminSchool', { school: school });
    })
    .get('/1/school/new', async (req, res) => {
        const facultyQuery = await pool.query('select * from faculty');
        const campusQuery = await pool.query('select * from campus');
        const facultyDetails = facultyQuery.rows;
        const campusDetails = campusQuery.rows
        res.render('adminSchoolNew', { facultyDetails, campusDetails });
    })
    .post('/1/school', async (req, res) => {
        // INSERT INTO schools(schoolName,building,campus_id,faculty_id) VALUES ('Terna College of Engg',1,1,1);
        const { schoolName, building, campus_id, faculty_id } = req.body;
        const newSchoolQuery = await pool.query('INSERT INTO schools(schoolName,building,campus_id,faculty_id) VALUES ($1,$2,$3,$4);', [schoolName, building, campus_id, faculty_id]);
        res.redirect('/login/admin/1/school')
    })
    .get('/1/school/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const facultyQuery = await pool.query('select * from faculty');
            const campusQuery = await pool.query('select * from campus');
            const facultyDetails = facultyQuery.rows
            const campusDetails = campusQuery.rows
            const schoolQuery = await pool.query('select * from schools where school_id = $1', [id])
            const schoolDetails = schoolQuery.rows[0]
            res.render('adminSchoolEdit', { schoolDetails, facultyDetails, campusDetails });
        } catch (error) {
            console.log(error)
        }
    })
    .put('/1/school/:id', async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id);
            const { schoolName, building, campus_id, faculty_id } = req.body;
            const updateSchool = await pool.query('update schools set( schoolName,building,campus_id,faculty_id ) = ($1,$2,$3,$4) where school_id = $5', [schoolName, building, campus_id, faculty_id, id]);
            res.redirect('/login/admin/1/school');
        } catch (error) {
            console.log(error)
        }
    })
    .delete('/1/school/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const deleteSchool = await pool.query('delete from schools where school_id = $1', [id]);
            res.redirect('/login/admin/1/school')
        } catch (error) {
            console.log(error);
        }
    })
    .get('/1/programmes', async (req, res) => {
        const programmeQuery = await pool.query('select * from programmes LEFT JOIN schools ON schools.school_id = programmes.school_id');
        programmes = programmeQuery.rows;
        res.render('adminProgrammes', { programmes: programmes });
    })
    .get('/1/programmes/new', async (req, res) => {
        var programmeTaken = [];
        const schoolQuery = await pool.query('select * from schools');
        const programmeQuery = await pool.query('select programmecode from programmes');
        const programmeDetails = programmeQuery.rows
        programmeDetails.forEach(function (el) {
            programmeTaken.push(el.programmecode)
        })
        var programmeAwailable = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010];
        // myArray = myArray.filter( function( el ) {
        //     return !toRemove.includes( el );
        programmeAwailable = programmeAwailable.filter(function (el) {
            return !programmeTaken.includes(el);
        })
        schoolDetails = schoolQuery.rows
        res.render('adminProgrammesNew', { schoolDetails, programmeAwailable });
    })
    .post('/1/programmes', async (req, res) => {
        // INSERT INTO programmes (programmeCode,programmeTitle,programmeLevel,duration,school_id) VALUES (1001,'Data Science','Beginner','30 days',1);
        const { programmeCode, programmeTitle, programmeLevel, duration, school_id, coursename } = req.body;

        const newProgrammeQuery = await pool.query('INSERT INTO programmes (programmeCode,programmeTitle,programmeLevel,duration,school_id) VALUES ($1,$2,$3,$4,$5);', [programmeCode, programmeTitle, programmeLevel, duration, school_id]);

        if (Array.isArray(coursename)) {
            coursename.filter(Boolean).forEach(async (course) => {
                const newCoursesQuery = await pool.query('INSERT INTO courses (programmeCode,coursename) VALUES ($1,$2);', [programmeCode, course]);
            })

            // Promise.all(coursename.map((course) => {
            //     const newCoursesQuery = await pool.query('INSERT INTO courses (programmeCode,coursename) VALUES ($1,$2);', [programmeCode, course]);
            // }))
        } else {
            const newCoursesQuery = await pool.query('INSERT INTO courses (programmeCode,coursename) VALUES ($1,$2);', [programmeCode, coursename]);
        }

        res.redirect('/login/admin/1/programmes');
    })
    .get('/1/programmes/:id', async (req, res) => {
        try {
            const { id } = req.params
            const { rows: courseNames } = await pool.query('select coursename from courses where programmecode = $1', [id]);
            const { rows: programmeDetails } = await pool.query('select * from programmes where programmecode = $1', [id]);
            const { rows: schoolDetails } = await pool.query('select * from schools');
            res.render('adminProgrammesEdit', { courseNames, schoolDetails, programmeDetails: programmeDetails[0] })
        } catch (error) {
            console.log(error);
        }
    })
    .put('/1/programmes/:id', async (req, res) => {
        try {

            const { id } = req.params;

            await pool.query('DELETE FROM courses where programmecode = $1', [id]);

            const { programmetitle, programmelevel, coursename } = req.body;

            console.log(programmelevel, programmetitle)

            await pool.query('update programmes set (programmetitle,programmelevel) = ($1,$2) where programmecode = $3', [programmetitle, programmelevel, id]);

            if (Array.isArray(coursename)) {
                coursename.filter(Boolean).forEach(async (course) => {
                    await pool.query('INSERT INTO courses (programmeCode,coursename) VALUES ($1,$2);', [id, course]);
                })
            } else {
                await pool.query('INSERT INTO courses (programmeCode,coursename) VALUES ($1,$2);', [id, coursename]);
            }
            res.redirect('/login/admin/1/programmes')
        } catch (error) {
            console.log(error)
        }
    })
    .delete('/1/programmes/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const deleteProgrammes = await pool.query('delete from programmes where programmecode= $1', [id]);
            res.redirect('/login/admin/1/programmes');
        } catch (error) {
            console.log(error)
        }
    })
    .get('/1/student', async (req, res) => {
        const facultyQuery = await pool.query('select * from faculty f,schools s where f.faculty_id = s.faculty_id;');
        facultyDetails = facultyQuery.rows;
        const studentQuery = await pool.query('select * from students s, programmes p, schools sc,faculty f  where s.programmecode = p.programmecode and sc.school_id = p.school_id and f.faculty_id = sc.faculty_id');
        studentDetails = studentQuery.rows;
        res.render('adminStudent', { facultyDetails, studentDetails });
    })

module.exports = adminRouter;