const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        minlength: 8,
    },
    googleId: {
        type: String,
        unique: true,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;