const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');


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

router.get('/getAllUsers', async (req, res) => {

    const users = await User.find();
    return res.status(200).json(users);


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