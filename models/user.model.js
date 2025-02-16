const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
});

// Check if the model exists, if not, create a new one
const User = models.User || model('User', UserSchema);

module.exports = User;