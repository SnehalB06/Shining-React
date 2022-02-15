const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const Course = mongoose.model('Course');
const Enroll = mongoose.model('Enrollment');


const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log(req.body);

    try {
        const { Phone, FirstName, LastName, UserName, Password, email } = req.body;
        const user = new User({ Phone, FirstName, LastName, UserName, Password, email });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });

    }
    catch (err) {
        return res.status(422).send(err.message);
    }

});

router.post('/signin', async (req, res) => {
    console.log(req.body);
    const { Password, email } = req.body;

    if (!email || !Password) {
        return res.status(422).send({ error: 'Must provide Password and email' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(422).send({ error: 'Invalid Password or email' });
    }


    try {
        await user.comparePassword(Password);
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });

    }
    catch (err) {
        console.log(err);
        return res.status(422).send({ error: 'Invalid Password or email' });
    }

});

router.post('/addCourse', async (req, res) => {
    console.log(req.body);

    try {
        const { courseId, courseName } = req.body;
        const course = new Course({ courseId, courseName });
        await course.save();

        res.status(200).send('Course Entered Successfully');
    }
    catch (err) {
        return res.status(422).send(err.message);
    }

});

router.post('/enrollCourse', async (req, res) => {
    console.log(req.body);

    try {
        const { RollNo, UserName, CourseId, enrollmentDate } = req.body;
        const enroll = new Enroll({ RollNo, UserName, CourseId, enrollmentDate });

        if (!UserName || !CourseId) {
            return res.status(422).send({ error: 'Must provide UserName and courseId' });
        }

        const course = await Course.findOne({ CourseId });
        if (!course) {
            return res.status(422).send({ error: 'Invalid courseId' });
        }

        const student = await User.findOne({ UserName });
        if (!student) {
            return res.status(422).send({ error: 'Invalid user' });
        }

        await enroll.save();

        res.status(200).send('Student Enrolled Successfully');
    }
    catch (err) {
        return res.status(422).send(err.message);
    }

});

router.get('/getAllCourses', async (req, res) => {

    const courses = await Course.find();
    return res.status(200).send({ courses });


});

router.get('/getAllUsers', async (req, res) => {

    const users = await User.find();
    return res.status(200).send({ users });


});

router.get('/getAllstudents', async (req, res) => {

    const enrollments = await Enroll.find();
    return res.status(200).send({ enrollments });


});

router.post('/searchStudent', async (req, res) => {
    //console.log(req.body);

    try {

        const { RollNo, UserName } = req.body;

        if (!RollNo && !UserName) {
            return res.status(422).send({ error: 'Must provide UserName or RollNo' });
        }

        else if (!RollNo) {
            const enrollmentsCount = await Enroll.find({ UserName }).count();
            //console.log(enrollmentsCount);
            if (enrollmentsCount == 0) {
                return res.status(200).send({ message: "No Record Found" });
            }
            else {
                const enrollments = await Enroll.find({ UserName });
                return res.status(200).send({ enrollments: enrollments, noOfRecords: enrollmentsCount });

            }

        }
        else if (!UserName) {

            const enrollmentsCount = await Enroll.find({ RollNo }).count();
            //console.log(enrollmentsCount);
            if (enrollmentsCount == 0) {
                return res.status(200).send({ message: "No Record Found" });
            }
            else {
                const enrollments = await Enroll.find({ RollNo });
                return res.status(200).send({ enrollments: enrollments, noOfRecords: enrollmentsCount });

            }

        }

        else if (RollNo && UserName) {

            const enrollmentsCount = await Enroll.find({ RollNo }).count();
            //console.log(enrollmentsCount);
            if (enrollmentsCount == 0) {
                return res.status(200).send({ message: "No Record Found" });
            }
            else {
                const enrollments = await Enroll.findOne({ UserName });
                //console.log(enrollments.RollNo);
                if (enrollments.RollNo == RollNo) {
                    const Enrollments = await Enroll.find({ UserName });
                    return res.status(200).send({ enrollments: enrollments, noOfRecords: enrollmentsCount });
                }
                else {

                    return res.status(400).send({ err: 'Wrong RollNo!' });
                }
            }
        }
        else {
            return res.status(400).send({ error: 'Invalid Request' });
        }

    }
    catch (err) {

        return res.status(400).send({ error: err.message });

    }

});
router.post('/searchCourse', async (req, res) => {
    try {
        const { courseName } = req.body;
        console.log(courseName, "course");

        courseCount = await Course.find({ courseName }).count();
        console.log(courseCount, "Count");
        if (courseCount == 0) {
            return res.status(200).send({ message: "No Record Found" });
        }
        else {
            console.log(typeof (courseName));

            regC = '/.*' + courseName + '*./';
            console.log(regC);
            const course = await Course.find({ "courseName": courseName });
            //console.log(course);
            console.log(courseName, "course");
            return res.status(200).send({ course, courseCount });

        }

    }
    catch (err) {
        return res.status(400).send({ error: err.message });

    }


});

router.post('/searchUser', async (req, res) => {
    try {
        const { UserName, email } = req.body;

        if (!email && !UserName) {
            return res.status(422).send({ error: 'Must provide UserName or email' });
        }

        else if (!email) {
            const userCount = await User.find({ UserName }).count();
            //console.log(enrollmentsCount);
            if (userCount == 0) {
                return res.status(200).send({ message: "No Record Found" });
            }
            else {
                const user = await User.find({ UserName });
                return res.status(200).send({ user: user, noOfRecords: userCount });

            }

        }
        else if (!UserName) {

            const userCount = await User.find({ email }).count();
            //console.log(enrollmentsCount);
            if (userCount == 0) {
                return res.status(200).send({ message: "No Record Found" });
            }
            else {
                const user = await User.find({ email });
                return res.status(200).send({ user: user, noOfRecords: userCount });

            }

        }

        else if (email && UserName) {

            const userCount = await User.find({ email }).count();
            //console.log(enrollmentsCount);
            if (userCount == 0) {
                return res.status(200).send({ message: "No Record Found" });
            }
            else {
                const user = await User.findOne({ UserName });
                //console.log(enrollments.email);
                if (user.email == email) {
                    const user = await User.find({ UserName });
                    return res.status(200).send({ user: user, noOfRecords: userCount });
                }
                else {

                    return res.status(400).send({ err: 'Wrong email!' });
                }
            }
        }
        else {
            return res.status(400).send({ error: 'Invalid Request' });
        }



    }
    catch (err) {
        return res.status(400).send({ error: err.message });

    }

});

module.exports = router;