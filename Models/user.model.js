const mongoose = require('mongoose');
const {connectTest} = require('../connection/connect_multi_db');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requried: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{ runSettersOnQuery: true });

userSchema.pre('save',  async function(next){  
    try {
            console.log(`truoc khi luu ${this.username}, ${this.password}`);
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(this.password, salt);
            this.password = hashPassword;
            next();
    } catch (error) {
       next(error)
    }
})

userSchema.methods.isCheckPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        
    }
}

module.exports = connectTest.model('User', userSchema);