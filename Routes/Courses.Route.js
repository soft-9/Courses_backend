const express = require('express');
const router = express.Router();
const CoursesController = require('../controllers/courses.controllers');
const { validationSchema } = require('../middlewares/validationSchema');
const verifyToken = require('../middlewares/verifyToken');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middlewares/allowedTo');

router.route('/')
  .get(CoursesController.getAllCourse)
  .post(verifyToken, validationSchema(), CoursesController.addCourse);

router.route('/:courseId')
  .get(CoursesController.getCourse)
  .patch( CoursesController.updateCourse)
  .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANGER), CoursesController.deleteCourse);

module.exports = router;
