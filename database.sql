DROP TABLE courses;
drop table students;
drop table programmes;
drop table schools;
drop table faculty;
drop table campus;
drop table university;


CREATE TABLE university
(
	university_id SERIAL PRIMARY KEY,
	universityName VARCHAR(20)
);


CREATE TABLE campus
(
	campus_id SERIAL PRIMARY KEY,
	campusName VARCHAR(50),
	address VARCHAR(50),
	distanceThroughTheCity VARCHAR(50),
	onlyBus VARCHAR(50),
	university_id SERIAL,
	CONSTRAINT university_id
    	FOREIGN KEY(university_id) 
      		REFERENCES university(university_id)
);

CREATE TABLE faculty
(
	faculty_id SERIAL PRIMARY KEY,
	facultyName VARCHAR(40),
	facultyPass VARCHAR (40),
	facultyField varchar(40),
	dean VARCHAR(40),
	building INTEGER,
	university_id SERIAL,
	CONSTRAINT university_id
    	FOREIGN KEY(university_id) 
      		REFERENCES university(university_id)
);

CREATE TABLE schools
(
	school_id SERIAL PRIMARY KEY,
	schoolName VARCHAR(40),
	building integer,
	campus_id SERIAL,
	CONSTRAINT campus_id
    	FOREIGN KEY(campus_id) 
      		REFERENCES campus(campus_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	faculty_id INT NULL,
	FOREIGN KEY(faculty_id) 
      		REFERENCES faculty(faculty_id)
	ON UPDATE SET NULL 
	ON DELETE SET NULL

);

CREATE TABLE programmes
(
	programmeCode SERIAL PRIMARY KEY,
	programmeTitle VARCHAR(20),
	programmeLevel VARCHAR(20),
	duration VARCHAR(20),
	school_id SERIAL,
	CONSTRAINT school_id
    	FOREIGN KEY(school_id) 
      		REFERENCES schools(school_id)
	ON UPDATE CASCADE 
	ON DELETE CASCADE
);

CREATE TABLE students
(
	student_id SERIAL PRIMARY KEY,
	studentName VARCHAR(20),
	studentPass VARCHAR(20),
	birthday DATE,
	yearOfEnrollment DATE,
	programmeCode SERIAL,
	CONSTRAINT programmeCode
    	FOREIGN KEY(programmeCode) 
      		REFERENCES programmes(programmeCode)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE courses
(
	courseCode SERIAL PRIMARY KEY,
	courseName VARCHAR(20),
	programmeCode SERIAL,
	CONSTRAINT programmeCode
    	FOREIGN KEY(programmeCode) 
      		REFERENCES programmes(programmeCode)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

INSERT INTO university
	(universityName)
VALUES
	('University Of Mumbai');
INSERT INTO university
	(universityName)
VALUES
	('University Of Pune');


INSERT INTO campus
	(campusName,address,distanceThroughTheCity,onlyBus,university_id)
VALUES
	('Terna Campus', 'Terna Campus nerul west', '200 meter', 'heanco', 1);
INSERT INTO campus
	(campusName,address,distanceThroughTheCity,onlyBus,university_id)
VALUES
	('Ramrao Adik ', 'Ramrao Adik Campus nerul east', '500 meter', 'heanco', 1);
INSERT INTO campus
	(campusName,address,distanceThroughTheCity,onlyBus,university_id)
VALUES
	('Savitri Bai Phule Campus', 'Savitri Bai Phule Campus Pune', '1200 meter', 'rumpes', 2);


INSERT INTO faculty
	(facultyName,facultyPass,facultyField,dean,building,university_id)
VALUES
	('Adnan', 'password', 'Data Science', 'Thomas', 1, 1);
INSERT INTO faculty
	(facultyName,facultyPass,facultyField,dean,building,university_id)
VALUES
	('Yukta', 'password', 'Data Analytics', 'Dean', 2, 1);
INSERT INTO faculty
	(facultyName,facultyPass,facultyField,dean,building,university_id)
VALUES
	('Anushka', 'password', 'Web Development', 'Edison', 3, 2);


INSERT INTO schools
	(schoolName,building,campus_id,faculty_id)
VALUES
	('Terna College of Engg', 1, 1, 1);
INSERT INTO schools
	(schoolName,building,campus_id,faculty_id)
VALUES
	('Ramrao Adik Engg College ', 2, 2, 2);
INSERT INTO schools
	(schoolName,building,campus_id,faculty_id)
VALUES
	('Ramrao Adik Research College', 3, 2, 2);
INSERT INTO schools
	(schoolName,building,campus_id,faculty_id)
VALUES
	('Savitri Bai Phule Engg College', 4, 3, 3);


INSERT INTO programmes
	(programmeCode,programmeTitle,programmeLevel,duration,school_id)
VALUES
	(1001, 'Data Science', 'Beginner', '30 days', 1);
INSERT INTO programmes
	(programmeCode,programmeTitle,programmeLevel,duration,school_id)
VALUES
	(1002, 'Data Analytics', 'Beginner', '25 days', 2);
INSERT INTO programmes
	(programmeCode,programmeTitle,programmeLevel,duration,school_id)
VALUES
	(1003, 'Data Mining', 'Beginner', '35 days', 3);
INSERT INTO programmes
	(programmeCode,programmeTitle,programmeLevel,duration,school_id)
VALUES
	(1004, 'Web Development', 'Intermediate', '40 days', 4);


INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('John Styles', 'password', '2000-12-21', '2020-08-01', 1001);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Tony Lakes', 'password', '2000-08-15', '2020-08-01', 1001);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Kayle Trusty', 'password', '2000-01-13', '2020-08-01', 1001);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Pearl Desouza', 'password', '2000-04-16', '2020-08-01', 1001);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Joel Parera', 'password', '2000-08-17', '2020-08-01', 1001);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Shantanu Jacks', 'password', '2000-07-19', '2020-08-01', 1001);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Logan Paul', 'password', '2000-11-16', '2020-08-01', 1001);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Jake Paul', 'password', '2000-11-26', '2020-08-01', 1001);

INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Laker Jayesh', 'password', '2000-02-13', '2020-09-01', 1002);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Maya Korey', 'password', '2000-03-15', '2020-09-01', 1002);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Layla Banks', 'password', '2000-04-13', '2020-09-01', 1002);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Jhonathan Pubg', 'password', '2000-05-16', '2020-09-01', 1002);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Piyush Ghodale', 'password', '2000-08-06', '2020-09-01', 1002);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Mohit Carry', 'password', '2000-07-19', '2020-09-01', 1002);

INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Jhonny Papa', 'password', '2000-02-04', '2020-09-15', 1003);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Sout OP', 'password', '2000-04-15', '2020-09-15', 1003);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Carry Nagar', 'password', '2000-03-13', '2020-09-15', 1003);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Faug Game', 'password', '2000-05-16', '2020-09-15', 1003);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Priyanka Mahale', 'password', '2000-12-06', '2020-09-15', 1003);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Chad Grover', 'password', '2000-07-19', '2020-09-15', 1003);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Salman Bhai', 'password', '2000-11-19', '2020-09-15', 1003);

INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Laker Jayesh', 'password', '2000-02-04', '2020-09-15', 1004);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Sout OP', 'password', '2000-04-15', '2020-09-15', 1004);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Carry Nagar', 'password', '2000-03-13', '2020-09-15', 1004);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Faug Game', 'password', '2000-05-16', '2020-09-15', 1004);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Priyanka Mahale', 'password', '2000-12-06', '2020-09-15', 1004);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Chad Grover', 'password', '2000-07-19', '2020-09-15', 1004);
INSERT INTO students
	(studentName,studentPass,birthday,yearOfEnrollment,programmeCode)
VALUES
	('Salman Bhai', 'password', '2000-11-19', '2020-09-15', 1004);
INSERT INTO courses
	(courseName,programmeCode)
VALUES
	('Python', 1001);
INSERT INTO courses
	(courseName,programmeCode)
VALUES
	('Machine Learning', 1001);
INSERT INTO courses
	(courseName,programmeCode)
VALUES
	('Data Mining', 1001);
INSERT INTO courses
	(courseName,programmeCode)
VALUES
	('SQL', 1002);
INSERT INTO courses
	(courseName,programmeCode)
VALUES
	('Advanced SQL', 1002);
INSERT INTO courses
	(courseName,programmeCode)
VALUES
	('Python', 1003);
INSERT INTO courses
	(courseName,programmeCode)
VALUES
	('Weka', 1003);
INSERT INTO courses
	(courseName,programmeCode)
VALUES
	('HTML', 1004);
INSERT INTO courses
	(courseName,programmeCode)
VALUES
	('CSS', 1004);
INSERT INTO courses
	(courseName,programmeCode)
VALUES
	('Javascript', 1004);
