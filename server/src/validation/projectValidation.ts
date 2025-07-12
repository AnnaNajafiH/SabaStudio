import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const projectSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10),
  category: Joi.string().required(),
  location: Joi.string().required(),
  year: Joi.number().required().min(1900).max(new Date().getFullYear() + 10),
  status: Joi.string().valid('completed', 'in-progress', 'planned').required(),
  images: Joi.array().items(Joi.string().uri()).min(1),
  tags: Joi.array().items(Joi.string()),
  featured: Joi.boolean(),
  published: Joi.boolean(),
  client: Joi.string().allow('', null),
  area: Joi.number().positive().allow(null),
  budget: Joi.number().positive().allow(null),
  technicalDetails: Joi.object().pattern(
    Joi.string(), 
    Joi.alternatives().try(Joi.string(), Joi.number())
  ),
});

export const validateProject = (req: Request, res: Response, next: NextFunction) => {
  const { error } = projectSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({
      status: 'error',
      message: 'Invalid project data',
      errors
    });
  }
  
  next();
};
