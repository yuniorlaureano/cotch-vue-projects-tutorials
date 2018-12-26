const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    first: {type: String, require: true},
    last:{type: String, require: true},
    email:{type: String, require: true},
    password:{type: String, require: true},
    isActive:{type: Boolean, require: true},
    createdOn:{type: Date, default: Date.now},
});

const User = mongoose.model('User', userSchema);
module.exports = User;