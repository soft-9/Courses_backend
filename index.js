const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const httpStatusText = require('./utils/httpStatusText');
const mongoose = require('mongoose');

const url = process.env.MONGO_URL;
mongoose.connect(url)
  .then(() => {
    console.log('MongoDB server started');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use(express.json());
app.use(cors());

const coursesRouter = require('./Routes/Courses.Route');
const usersRouter = require('./Routes/users.Route');

app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

app.all("*", (req, res, next) => {
  return res.status(404).json({ status: httpStatusText.ERROR, message: "This resource is not available" });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
