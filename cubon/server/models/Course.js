const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const courseSchema = new mongoose.Schema({
    
    courseId:{
        type: String,
        required:true,
        unique:true
    },
    courseName:{
        type: String,
        required:true,
        unique:true
    }
});
mongoose.model('Course',courseSchema);
