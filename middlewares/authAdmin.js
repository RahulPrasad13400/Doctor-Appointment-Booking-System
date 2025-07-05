import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers

        if(!atoken){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET);

        if(token_decoded.email !== process.env.ADMIN_EMAIL){
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            });
        }

        next()

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export default authAdmin;