const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Course = mongoose.model('Course');

const router = express.Router();


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



router.get('/getAllCourses', async (req, res) => {

    const courses = await Course.find();
    return res.status(200).json(courses);


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
            return res.status(200).json(course);

        }

    }
    catch (err) {
        return res.status(400).send({ error: err.message });

    }


});

module.exports = router;