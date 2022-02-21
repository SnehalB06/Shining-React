const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Enroll = mongoose.model('Enrollment');
const User = mongoose.model('User');
const Course = mongoose.model('Course');

const router = express.Router();


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

router.get('/getAllstudents', async (req, res) => {

    const enrollments = await Enroll.find();
    return res.status(200).json(enrollments);


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
module.exports = router;