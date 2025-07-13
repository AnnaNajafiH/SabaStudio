// Joi (a popular validation library) to validate incoming request data in an Express app  
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.any()
  .valid(Joi.ref('password'))
  .required()
  .label('Confirm password')
  .messages({
    'any.only': '{{#label}} does not match password',
    'any.required': '{{#label}} is required',
  }),
});


export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });
  }
  
  next();
};


// Middleware to validate user signup data
export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body?.email) {
      req.body.email = req.body.email.toLowerCase().trim();
    }

    const { error } = signupSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
      });
    }

    next();
  } catch (err) {
    console.error('Validation error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error during validation',
    });
  }
};
