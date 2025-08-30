import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    console.log("userauth error !token");
    return res.json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}

export default userAuth;
