import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    // Check if the authorization header exists
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        message: "No authorization header provided",
        success: false,
      });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "No token provided",
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: "Invalid token",
          success: false,
        });
      }
      // Attach the decoded user ID to the request body
      req.body.userId = decode.id;
      // Move to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal server error",
      success: false,
    });
  }
};
