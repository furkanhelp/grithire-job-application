import mongoose from "mongoose";
import { createJWT } from "../utils/tokenUtils.js";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  googleId: {
    type: String,
    sparse: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatarPublicId: String,
});

UserSchema.methods.createJWT = function () {
  return createJWT({ userId: this._id, role: this.role });
};

// TO GET THE USER WITHOUT DISPLAYING PASSWORD
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
