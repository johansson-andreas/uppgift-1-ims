import {ErrorRequestHandler, Response, Request, NextFunction } from "express"
import zod from "zod"

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  if (error instanceof zod.ZodError) {
    res.status(400).json({ message: zod.prettifyError(error) });
  }
  else if (error.code === 11000) {
    res.status(409).json({
      message: "Duplicate key error",
      keyValue: error.keyValue,
    });
  }
  else {
    res.status(500).json({message:"Internal server error"})
  }
};
