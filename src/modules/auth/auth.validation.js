const Joi = require('joi');

// User registration validation schema
const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'
      )
    )
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 128 characters',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required',
    }),

  name: Joi.string().min(2).max(50).trim().optional().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name must not exceed 50 characters',
  }),

  avatar: Joi.string().uri().optional().messages({
    'string.uri': 'Avatar must be a valid URL',
  }),
});

// User login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),

  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

// Update profile validation schema
const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().optional().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name must not exceed 50 characters',
  }),

  avatar: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Avatar must be a valid URL',
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional()
    .messages({
      'string.email': 'Please provide a valid email address',
    }),
});

// Change password validation schema
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'any.required': 'Current password is required',
  }),

  newPassword: Joi.string()
    .min(8)
    .max(128)
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'
      )
    )
    .required()
    .messages({
      'string.min': 'New password must be at least 8 characters long',
      'string.max': 'New password must not exceed 128 characters',
      'string.pattern.base':
        'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'New password is required',
    }),
});

// Refresh token validation schema
const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'any.required': 'Refresh token is required',
  }),
});

// Validation middleware function
const validateRequest = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const validationErrors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        data: {
          errors: validationErrors,
        },
      });
    }

    next();
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
  refreshTokenSchema,
  validateRequest,
};
