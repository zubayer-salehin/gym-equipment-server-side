const { createUserServices, findUserByEmail, findUserById, updateUserById, getUserService } = require("../Services/Auth.Services");
const { sendEmailWithGmail } = require("../Utils/email");
const { generateToken } = require("../Utils/token");


exports.createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await findUserByEmail(email);

        if (user) {
            return res.status(401).json({
                status: "fail",
                message: "This Email User is Already Exists."
            })
        }

        const newUser = await createUserServices(req.body);
        const token = generateToken(email);
        const { password: pwd, ...others } = newUser.toObject();

        res.status(200).json({
            status: "success",
            message: "Successfully create a User Account",
            data: { user: others, token }
        })
    } catch (error) {

        res.status(400).json({
            code: 400,
            status: "fail",
            message: "Couldn't create User",
            error: error.message
        })
    }
}


exports.userLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                message: "Please provide your credantials"
            })
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "No user Found, Please create an Account"
            })
        }

        const isPasswordValid = password === user?.password ? true : false;

        if (!isPasswordValid) {
            return res.status(403).json({
                status: "fail",
                message: "Password is not correct"
            })
        }

        const token = generateToken(email);
        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            status: "success",
            message: "Login successfully",
            data: { user: others, token: token }
        });

    } catch (error) {
        res.status(400).json({
            code: 400,
            status: "fail",
            message: "Something Went Wrong, Please try again",
            error: error.message,
        });
    }
}


exports.forgetPasswordEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "No user Found, Please create an Account"
            });
        }

        sendEmailWithGmail(email, user?._id);

        res.status(200).json({
            status: "success",
            message: "Email was Send",
        });
    } catch (error) {
        res.status(400).json({
            code: 400,
            status: "fail",
            error: error.message,
        });
    }
};


exports.resetPassword = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await findUserById(id);

        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "No user Found, Please create an Account"
            });
        }

        const result = await updateUserById(id, req.body);

        if (!result.modifiedCount) {
            return res.status(401).json({
                status: "fail",
                error: "Couldn't update the Password this user email",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Successfully updated the Password"
        })
    } catch (error) {
        res.status(400).json({
            code: 400,
            status: "fail",
            message: "Couldn't update the Password",
            error: error.message,
        });
    }
};


exports.getUsers = async (req, res, next) => {
    try {

        const users = await getUserService();

        res.status(200).json({
            status: "success",
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the user data",
            error: error.message,
        });
    }
};


exports.userVerifyByToken = async (req, res, next) => {
    try {

        if (!req.email) {
            return res.status(401).json({
                status: "fail",
                message: "Your Token is expire, Please login again!",
            });
        }

        res.status(200).json({
            status: "success",
            email: req.email
        });
    } catch (error) {
        res.status(400).json({
            code: 400,
            status: "fail",
            message: "can't get the user data",
            error: error.message,
        });
    }
};