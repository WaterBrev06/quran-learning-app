const { check } = require('express-validator');

exports.registerValidator = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('يجب إدخال الاسم'),
  check('arabicName')
    .trim()
    .notEmpty()
    .withMessage('يجب إدخال الاسم بالعربية'),
  check('email')
    .trim()
    .notEmpty()
    .withMessage('يجب إدخال البريد الإلكتروني')
    .isEmail()
    .withMessage('البريد الإلكتروني غير صالح'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('يجب إدخال كلمة المرور')
    .isLength({ min: 6 })
    .withMessage('يجب أن تكون كلمة المرور 6 أحرف على الأقل'),
  check('role')
    .trim()
    .notEmpty()
    .withMessage('يجب تحديد نوع المستخدم')
    .isIn(['mother', 'student', 'teacher', 'admin'])
    .withMessage('نوع المستخدم غير صالح')
];

exports.loginValidator = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('يجب إدخال البريد الإلكتروني')
    .isEmail()
    .withMessage('البريد الإلكتروني غير صالح'),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('يجب إدخال كلمة المرور')
]; 
