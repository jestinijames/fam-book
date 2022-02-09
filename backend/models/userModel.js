const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true  
},
email: {
         type: String,
         unique: true,
         required: true,
         trim: true,
         lowercase: true, 
         validate(value) {
          if(!validator.isEmail(value)) {
              throw new Error('Email is invalid');
          }
         }
},
password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
        if (value.toLowerCase().includes('password')) 
        {
            throw new Error('Password cannot contain "password" as string!!');
        }
    }

},
isAdmin: {
    type: Boolean,
    required: true,
    default: false
}
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);