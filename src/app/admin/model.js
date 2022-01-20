"use strict";

const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../../helper/database")
const { secrets: { saltRounds, adminSecret }, expireDurations: { tokenExpireAt }, isProduction } = require("../../helper/config");

const adminSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        default: "admin",
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true,
    },
    defaultAvatar: {
        type: String,
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true,
    strict: true,
});

adminSchema.methods.generateHashedPassword = async function () {
    this.password = await bcrypt.hash(this.password, saltRounds);
}

adminSchema.methods.createDefaultAvatar = async function () {
    const adminInitials = this.fullName.split(" ").map(word => word.charAt(0)).join("");
    this.defaultAvatar = `https://avatars.dicebear.com/api/initials/${adminInitials}.svg`;
}

adminSchema.methods.generateAdminAuthToken = async function () {
    const token = jwt.sign({_id: this._id.toString()}, adminSecret, { expiresIn: tokenExpireAt });
    return token;
}

adminSchema.statics.authenticateAdminAuthToken = async function ({token}) {
    let admin;
    try {
        admin = await jwt.verify(token, adminSecret, async (err, decoded) => {
            if(err) throw err;
            admin = await this.findById({_id: decoded._id});
            if(!admin) console.log("Unable to Find Admin");
            return admin;
        });
        return admin;
    } catch (error) {
        console.log(error);
    }
}

adminSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        await this.generateHashedPassword();
        await this.createDefaultAvatar();
    }
    next();
})

const Admin = model("Admin", adminSchema);

module.exports = Admin;

