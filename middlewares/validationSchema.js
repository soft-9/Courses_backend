const { body } = require('express-validator');

const validationSchema = () => {
  return [
    body('title')
      .notEmpty().withMessage('Title is required')
      .isLength({ min: 2 }).withMessage('Title should be at least 2 characters long'),
    body('price')
      .notEmpty().withMessage('Price is required')
      .isFloat({ gt: 0 }).withMessage('Price should be a number greater than 0')
  ];
};

module.exports = { validationSchema };
