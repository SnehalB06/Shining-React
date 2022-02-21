require('./models/User');
require('./models/Enrollment');
require('./models/Course');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const enrollmentRouter = require('./routes/enrollments');
const requireAuth = require('./middlewares/requireAuth');
const courseRouter = require('./routes/courses');



const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.get('/',requireAuth, (req,res)=> {
    res.send(`Your email: ${req.user.email}`);

});
app.use('/users/', usersRouter);
app.use('/enrollment/', enrollmentRouter);
app.use('/courses/', courseRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
