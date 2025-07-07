import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token_decoded = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.docId = token_decoded.id;
    next();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default authDoctor;
