import jwt from "jsonwebtoken";

const generateToken = (res, userID) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //Set jwt as HTTP-only cookie in the server

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in millisecs
  });
};

export default generateToken;
