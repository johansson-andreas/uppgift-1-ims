import { Express, Request, Response } from "express";
import Contact from '../../models/Contact'
import Manufacturer  from '../../models/Manufacturer'
import Product from '../../models/Product'
import mongoose from "mongoose";

class ManufacturerController {
 async getManufacturer(req: Request, res: Response)  {

    try {
        const response = Manufacturer.find().populate("contact");
        res.status(200).json(response)
    } catch ( error) {

    }
}
}

export const manufacturerController = new ManufacturerController();