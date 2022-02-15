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


const userSchema = new mongoose.Schema({
    Phone:{
        type: Number,
        unique:true,
        required:true
    },
    FirstName:{
        type: String,
        required:true
    },
    LastName:{
        type: String,
        required:true
    },
    UserName:{
        type: String,
        required:true,
        unique:true
    },
    Password:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    }
});


userSchema.pre('save',function(next) {
    const user = this;
    if (!user.isModified('Password')){
        return next();
    }
    
    bcrypt.genSalt(10,(err,salt) => {
        if (err){
            return next(err);
        }
        
        bcrypt.hash(user.Password,salt,(err,hash)=>{
            if (err){
                return next(err);
            }
            user.Password = hash;
            next();

        });
    });

});


userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    const user = this;

    return new Promise((resolve, reject)=>{
        bcrypt.compare(candidatePassword, user.Password,(err,isMatch)=>{

            if (err){
                return reject(err);
            }
            if (!isMatch){
                return reject(false);
            }
            else{
            resolve(true);
            }

        });
    });
}
mongoose.model('User',userSchema);
mongoose.model('Course',courseSchema);
mongoose.model('Enrollment',enrollmentSchema);

