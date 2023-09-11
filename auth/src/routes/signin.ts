import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middleware/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
import { Password } from "../utils/password";


const router = express.Router();

const validation = [
  body("email").isEmail().withMessage("Must be a valid email"),
  body("password").trim().notEmpty().withMessage("Must supply a valid password"),
];

router.post("/api/users/signin", validation, validateRequest, async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError("Invalid credentials");
  }

  const isMatch = await Password.compare(existingUser.password, password);

  if (!isMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  // 1. Generate a JWT token
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email,
  }, process.env.JWT_KEY!);

  // 2. Store it on a session cookie
  req.session = {
    jwt: userJwt
  }

  res.status(200).send(existingUser);
});

export { router as signinRouter }