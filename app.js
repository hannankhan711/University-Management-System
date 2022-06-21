var cookieParser = require('cookie-parser')
var express = require("express");
var pool = require("./db")
var app = express();
methodOverride = require("method-override");


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"));
app.set('view engine', 'ejs')
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query('select * from faculty;');
        res.render("home", { faculty: rows });
    } catch (err) {
        console.log(err);
    }
});

app.use('/logout/', (req, res) => {
    res.clearCookie('isLoggedIn')
    return res.redirect('/')
});
app.use('/login/', require('./routes/login'));
app.use('/login/admin', require('./routes/adminDetails'));
app.use('/login/faculty', require('./routes/studentData'));
app.use('/login/student', require('./routes/studentDetails'));

app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("The server has started");
});