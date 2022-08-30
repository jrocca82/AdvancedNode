const mongoose = require("mongoose"),
Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false //required for local users only
    },
    facebookid: {
        type: String,
        required: false //required for facebook users only
    }
});

module.exports = mongoose.model("User", UserSchema);