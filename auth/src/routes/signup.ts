import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middleware/validate-request";

const router = express.Router();

const validation = [
  body("email").isEmail().withMessage("Must be a valid email"),
  body("password").trim().isLength({ min: 4, max: 8 }).withMessage("Must provide a password between 4 and 8 characters"),
];

router.post("/api/users/signup", validation, validateRequest, async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email in use");
  }

  const user = User.build({
    email,
    password,
  });
  await user.save();

  // 1. Generate a JWT token
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email,
  }, process.env.JWT_KEY!);

  // 2. Store it on a session cookie
  req.session = {
    jwt: userJwt
  }

  res.status(201).send(user);
});

export { router as signupRouter };