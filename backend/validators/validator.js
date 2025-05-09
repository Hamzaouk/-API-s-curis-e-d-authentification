const { check } = require('express-validator');

/**
 * User registration validation rules
 */
exports.registerValidator = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Le nom est requis')
    .isLength({ max: 50 })
    .withMessage('Le nom ne peut pas dépasser 50 caractères'),
  
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email invalide')
    .not()
    .isEmpty()
    .withMessage("L'email est requis"),
  
  check('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères')
    .matches(/\d/)
    .withMessage('Le mot de passe doit contenir au moins un chiffre')
];

/**
 * User login validation rules
 */
exports.loginValidator = [
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email invalide')
    .not()
    .isEmpty()
    .withMessage("L'email est requis"),
  
  check('password')
    .not()
    .isEmpty()
    .withMessage('Le mot de passe est requis')
];