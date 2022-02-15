require('./models/User')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(express.static('public'));

const mongoURI="mongodb+srv://analytics:Pa55w0rd@mflix.3syee.mongodb.net/Cubon_DB?retryWrites=true&w=majority";
mongoose.connect(mongoURI,{
useNewUrlParser: true,
//useCreateIndex:true
});

mongoose.connection.on('connected',()=>{
    console.log("Connected to Mongo Instance");
});

mongoose.connection.on('error',(err) => {
    console.error("error connecting mongo",err);
});

app.get('/',requireAuth, (req,res)=> {
    res.send(`Your email: ${req.user.email}`);

});

app.listen(3000,()=>{
    console.log("Listening on Port 3000");
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../../views/home.html');
  });
  