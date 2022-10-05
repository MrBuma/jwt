const Joi = require('joi');

const userValidate = data => {
        const userSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        })
    return userSchema.validate(data);
}

module.exports = { 
    userValidate
}