import Joi from 'joi'

export const customerF = Joi.object({
      fullname: Joi.string().lowercase().required().trim(),
      phone: Joi.object()
            .keys({
                  countrycode: Joi.string().required(),
                  number: Joi.number().required(),
            })
            .required(),
      email: Joi.string().email().lowercase().required(),
      region: Joi.string(),
      password: Joi.string().required(),
      profile: Joi.string().required()
})

export const userF = Joi.object({
      fullname: Joi.string().lowercase().required().trim(),
      phone: Joi.object()
            .keys({
                  countrycode: Joi.string().required(),
                  number: Joi.number().required(),
            })
            .required(),
      email: Joi.string().email().lowercase(),
      role: Joi.string().valid("admin", "basic"),
      profile: Joi.string()
})

export const customerUF = Joi.object({
      fullname: Joi.string().lowercase().required().trim(),
      phone: Joi.object()
            .keys({
                  countrycode: Joi.string().required(),
                  number: Joi.number().required(),
            })
            .required(),
      email: Joi.string().email().lowercase().required(),
      region: Joi.string().lowercase(),
      profile: Joi.string()
})

export const signinFormat = Joi.object({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().required(),
})

export const emailF = Joi.object({
      email: Joi.string().email().lowercase().required()
})