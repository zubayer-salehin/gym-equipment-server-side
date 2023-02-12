const jwt = require("jsonwebtoken");


module.exports.verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({ status: "fail", Unauthorized: "access" })
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.tokenSecret, (error, decoded) => {
            if (error) {
                return res.status(403).send({ status: "fail", "Unauthorized": "Forbidden access", error: error.message })
            }
            // console.log(decoded);
            req.email = decoded.email;
            next();
        })

    } catch (error) {
        res.status(400).json({
            code: 400,
            status: "fail",
            error: error.message,
        });
    }

}