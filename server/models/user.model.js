const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const roles = require("../common/roles/roles");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
        },
        books: [
            {
                id: {
                    type: mongoose.Types.ObjectId,
                    required: true
                }
            }
        ],
        role:{
            type: String,
            trim: true,
            default: roles.reader
        }
    },
    {
        timestamps: true,
    }
);


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
};

userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
