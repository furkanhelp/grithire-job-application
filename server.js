import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
// ROUTERS
import jobRouter from './routes/jobRouter.js';
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
// CLOUDINARY
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
// MIDDLEWARES
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import {authenticateUser} from "./middleware/authMiddleware.js";

// PUBLIC FOLDER
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//GOOGLE AUTH
import session from "express-session";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

//GOOGLE
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "./models/UserModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile received:", profile);

        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          console.log("Existing user found:", user.email);
          return done(null, user);
        }

        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          console.log("Linking Google account to existing user:", user.email);
          user.googleId = profile.id;
          user.avatar = profile.photos[0].value;
          user.isVerified = true;
          await user.save();
          return done(null, user);
        }

        console.log("Creating new user with Google data");
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          location: "Unknown",
          isVerified: true,
        });

        console.log("New user created:", user.email);
        return done(null, user);
      } catch (error) {
        console.error("Google authentication error:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
})

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
});
} catch (error) {
  console.log(error);
  process.exit(1);
}



