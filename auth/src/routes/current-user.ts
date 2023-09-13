import express, { Request, Response } from "express";
import { currentUser } from "@euticketing/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req: Request, res: Response) => {
  // Check if user logged in before using currentUser middleware
  // if (!req.session?.jwt) {
  //   return res.send({ currentUser: null })
  // }

  // try {
  //   const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
  //   res.send({currentUser: payload});

  // } catch (err) {
  //   res.send({ currentUser: null })
  // }

  res.send({ currentUser: req.currentUser || null })
});

export { router as currentuserRouter }
