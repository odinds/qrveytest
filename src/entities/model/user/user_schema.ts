import * as Joi from '@hapi/joi';

/**
 * User validation schema.
 */
export const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(30),
  email: Joi.string().email().min(5).max(200).required(),
});
