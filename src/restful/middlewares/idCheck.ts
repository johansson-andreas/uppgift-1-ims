import { Response, Request, Express, NextFunction} from "express";
import mongoose from "mongoose";

export const idCheck = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid ID format" });
    next()
}