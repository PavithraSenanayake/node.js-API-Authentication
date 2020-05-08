//validation
const Joi = require('@hapi/joi');


//register validation
const registerValidation = data => {
    const schema = Joi.object({
        user_name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6).required()
        .email(),
        password: Joi.string().
        min(6)
        .required()
        });
        const validation = schema.validate(data);
        return validation;

};

//login validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
        });
        
        const validation = schema.validate(data);
        return validation;
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
