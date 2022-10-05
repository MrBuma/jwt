const express = require('express');
const route = express.Router();
const createError = require('http-errors');
const User = require('../Models/user.model');
const {userValidate} = require('../helps/validation');

route.post('/register', async(req, res, next)=>{
      try {
        
            const {email, password} = req.body;
            const { error } = userValidate({email, password});
                 if(error){
                     throw createError( error.details[0].message);
                 }
            const isExist = await User.findOne({username: email});
       
             if (isExist) throw createError.Conflict(`${email} is ready been register`);
             const user = new User({username: email, password});
            const isCreate = await user.save();
            
            res.json({
                status: 'OK',
                element: isCreate
            });
            
}catch(err)
    { next(err)}
})
route.post('/fresh-token', (req, res, next)=>{
    console.log(`fresh-token function`);
});
route.post('/login', async (req, res, next)=>{
    try {

        const {email, password} = req.body;
        console.log(req.body)
        const { error } = userValidate({email, password});
             if(error){
                 throw createError( error.details[0].message);
             }
             const user = await User.findOne({username: email});
             if(!user){
                throw createError.NotFound(' User is not register');
             }

        const isValid = await user.isCheckPassword(password);
             if(!isValid){
                    throw createError.NotFound('Sai mat khau')
             }
                          

        res.send(user);


    } catch (error) {
        next(error)
    }
});
route.post('/logout', (req, res, next)=>{
    console.log(`logout function`);
});



module.exports = route;