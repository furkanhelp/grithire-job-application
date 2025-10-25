import { StatusCodes } from "http-status-codes";
import User from '../models/UserModel.js';
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
import passport from "passport";

export const register = async (req, res) => {
    // FIRST REGISTER IS GOING TO BE ADMIN
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';

    // BCRYPTJS HASHING PASSWORDS
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({msg: 'user created'});
};

// LOGIN INFO CHECK
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("invalid credentials");

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  // JSON Web Token
  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000* 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

// LOGOUT CONTROLLER
export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({msg: 'user logged out!'})
}

//GOOGLE REGISTER CONTROLLER
export const googleAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
};

export const googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/login",
    },
    (err, user) => {
      if (err) {
        console.error("Google auth error:", err);
        return res.redirect("/login?error=auth_failed");
      }

      if (!user) {
        return res.redirect("/login?error=user_not_found");
      }

      // Generate JWT token
      const token = user.createJWT();

      // Redirect to frontend with token
      res.redirect(
        `${
          process.env.FRONTEND_URL || "http://localhost:5000"
        }/dashboard?token=${token}`
      );
    }
  )(req, res, next);
};