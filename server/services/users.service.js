const UsersService = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = {

    async createUser(userData) {
        const user = new UsersService(userData);
        const token = jwt.sign({_id: user._id.toString(), role: user.role}, process.env.JWT_SECRET);
        const newUser = await user.save();
        return {token, newUser}
    },

    async login(email, password) {
        const user = await UsersService.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Unable to login");
        }
        const token = jwt.sign({_id: user._id.toString(), role: user.role, name: user.firstName},
            process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        return {user, token};
    }
}

// function generateAuthToken (user) {
//     return jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
// }
