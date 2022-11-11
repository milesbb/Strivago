import express from "express";
import createHttpError from "http-errors";
import UsersModel from "./model.js";
import { checkUsersSchema, checkValidationResult } from "./validation.js";

const usersRouter = express.Router();

// REGISTER USER

usersRouter.post(
  "/register",
  checkUsersSchema,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const newUser = new UsersModel(req.body);
      const { _id } = newUser.save();

      res.status(201).send( _id );
    } catch (error) {
      next(error);
    }
  }
);

// GET

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UsersModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
