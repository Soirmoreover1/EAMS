require('./db')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./middlewares/auth').passport;
const {authorized , adminauthorized} = require('./middlewares/authenticate');
app.use(session({ secret: process.env.JWT_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(bodyParser.json());
app.disable("x-powered-by");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())


const userRoutes = require('./routes/userRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const companyRoutes = require('./routes/companyRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const bonusRoutes = require('./routes/bonusRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const deductionRoutes = require('./routes/deductionRoutes');
const shiftRoutes = require('./routes/shiftRoutes');

app.use('/user', userRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/company',companyRoutes);
app.use('/department', departmentRoutes);
app.use('/employee', employeeRoutes);
app.use('/promotion', promotionRoutes);
app.use('/bonus', bonusRoutes);
app.use('/deduction', deductionRoutes);
app.use('/leave', leaveRoutes);
app.use('/salary', salaryRoutes);
app.use('/shift', shiftRoutes);



app.use((err , req ,res ,next)=>{
  res.status(err.status).send({
      message : err.message
  })
})


app.listen(3000, () => {
  console.log('Server started on port 3000');
});