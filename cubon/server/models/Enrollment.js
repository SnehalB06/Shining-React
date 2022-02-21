const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const enrollmentSchema = new mongoose.Schema({
    RollNo:{
        type: String,
        required:true
    },
    UserName:{
        type: String,
        required:true,
    },
    CourseId:{
        type: String,
        required:true
    },
    enrollmentDate:{
        type: Date,
        required:true
    }
});

mongoose.model('Enrollment',enrollmentSchema);

