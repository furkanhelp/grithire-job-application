import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE, JOB_PRIORITY } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";
const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error)=> error.msg);
            if (errorMessages[0].startsWith('no job')){
                throw new NotFoundError(errorMessages);
            }
            if (errorMessages[0].startsWith("not authorized")) {
             throw new UnauthorizedError("not authorized to access this route");
            }
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};

export const validateJobInput = withValidationErrors([
  body("company")
    .notEmpty()
    .withMessage("Company name is required")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Company name must be less than 100 characters"),

  body("position")
    .notEmpty()
    .withMessage("Position is required")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Position must be less than 100 characters"),

  body("jobLocation")
    .notEmpty()
    .withMessage("Job location is required")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Job location must be less than 100 characters"),

  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid job status"),

  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type"),

  body("priority")
    .optional()
    .isIn(Object.values(JOB_PRIORITY))
    .withMessage("Invalid priority level"),

  body("jobDescription")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Job description must be less than 2000 characters"),

  body("requirements")
    .optional()
    .trim()
    .isLength({ max: 1500 })
    .withMessage("Requirements must be less than 1500 characters"),

  body("benefits")
    .optional()
    .trim()
    .isLength({ max: 1500 })
    .withMessage("Benefits must be less than 1000 characters"),

  body("contactEmail")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email address (e.g., name@company.com)"),

  body("contactPhone")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Phone number must be less than 20 characters"),

  body("applicationUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage(
      "Application URL must be a valid web address (e.g., https://example.com)"
    ),

  body("interviewDate")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid date"),

  body("applicationDeadline")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid date"),

  body("notes")
    .optional()
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
]);

export const validateIdParam = withValidationErrors([
    param('id').custom(async (value, {req })=> {
    const isValIdMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValIdMongoId) throw new BadRequestError("invalid MongoDB id");

    const job = await Job.findById(value);
      if (!job) throw new NotFoundError(`no job with id ${value}`);
      // TO DON'T REACH OUT THE INFO EXCEPT THE ADMIN
      const isAdmin = req.user.role === 'admin'
      const isOwner = req.user.useId === job.createdBy.toString();
      if(!isAdmin && !isOwner) throw new UnauthorizedError('not authorized to access this route')
}),
]);

// REGISTER
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("location is required"),
]);

// LOGIN
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),

  body("password").notEmpty().withMessage("password is required")
]);


// USER UPDATE
export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    }),
  body("location").notEmpty().withMessage("location is required"),
]);