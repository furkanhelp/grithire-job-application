import { Router } from "express";
const router = Router();
import {
  login,
  logout,
  register,
  googleAuth,
  googleCallback,
} from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
import rateLimiter from "express-rate-limit";
import passport from "passport";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes" },
});

// Google OAuth routes
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);

router.post("/register", apiLimiter, validateRegisterInput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

export default router;
