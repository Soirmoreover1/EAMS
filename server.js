require('./db')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const {authorized , adminauthorized} = require('./middlewares/authenticate');

const userRoutes = require('./routes/userRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const companyRoutes = require('./routes/companyRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const shiftRoutes = require('./routes/shiftRoutes');

app.use('/users', userRoutes);
app.use('/attendances' , attendanceRoutes);
app.use('/companys',companyRoutes);
app.use('/departments', departmentRoutes);
app.use('/employees',employeeRoutes);
app.use('/promotions',promotionRoutes);
app.use('/shifts',shiftRoutes);

app.use((err , req ,res ,next)=>{
  res.status(err.status).send({
      message : err.message
  })
})


app.listen(3000, () => {
  console.log('Server started on port 3000');
});