const User = require("../Models/Auth.Model")


exports.createUserServices = async (userInfo) => {
    const newUser = await User.create(userInfo);
    return newUser;
}

exports.findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

exports.findUserById = async (userId) => {
    const user = await User.findOne({ _id: userId });
    return user;
}

exports.updateUserById = async (userId, data) => {
    const result = await User.updateOne({ _id: userId }, { $set: data }, { runValidators: true });
    return result;
}

exports.getUserService = async () => {
    const users = await User.find();
    return users;
}