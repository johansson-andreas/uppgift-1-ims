import { Express, Request, Response, NextFunction } from "express";
import Contact from "../../models/Contact";
import Manufacturer from "../../models/Manufacturer";
import Product from "../../models/Product";
import { ContactSchema } from "../schemas/contact.schema";
import { PartialProductSchema, ProductSchema } from "../schemas/products.schema";
import { ManufacturerSchema } from "../schemas/manufacturer.schema";

class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const response = await Product.find().populate({
        path: "manufacturer",
        populate: { path: "contact" },
      });
      res.status(200).json({ message: response });
    } catch (error) {}
  }

  async getOneProduct(req: Request, res: Response) {
    const id = req.query.id;

    const response = await Product.findById(id).populate({
      path: "manufacturer",
      populate: { path: "contact" },
    });
    res.status(200).json({ message: response });
    try {
    } catch (error) {}
  }

  async getTotalStockValue(req: Request, res: Response) {
    try {
      const [totalStockValue] = await Product.aggregate([
        { $match: {} },
        {
          $group: {
            _id: null,
            totalStockValue: {
              $sum: { $multiply: ["$price", "$amountInStock"] },
            },
          },
        },
      ]);

      res.status(200).json({
        message: `Total stock value: ${totalStockValue.totalStockValue}`,
      });
    } catch (error) {}
  }
  async getTotalStockValueBM(req: Request, res: Response) {
    try {
      const totalStockValue = await Product.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "manufacturers",
            localField: "manufacturer",
            foreignField: "_id",
            as: "manufacturerInfo",
          },
        },
        { $unwind: "$manufacturerInfo" },
        {
          $group: {
            _id: "$manufacturer",
            name: { $first: "$manufacturerInfo.name" },
            totalStockValue: {
              $sum: { $multiply: ["$price", "$amountInStock"] },
            },
          },
        },
      ]);
      res.status(200).json(totalStockValue);
    } catch (error) {
      console.log(error);
    }
  }

  async getLowStock(req: Request, res: Response) {
    try {
      const lowStock = await Product.aggregate([
        { $match: { amountInStock: { $lt: 10 } } },
      ]);

      res.status(200).json(lowStock);
    } catch (error) {}
  }

  async getCriticalStock(req: Request, res: Response) {
    try {
      const criticalStock = await Product.aggregate([
        { $match: { amountInStock: { $lt: 5 } } },
        {
          $lookup: {
            from: "manufacturers",
            localField: "manufacturer",
            foreignField: "_id",
            as: "manufacturerInfo",
          },
        },
        {
          $lookup: {
            from: "contacts",
            localField: "manufacturerInfo.contact",
            foreignField: "_id",
            as: "contactInfo",
          },
        },
        {
          $project: {
            name: 1,
            sku: 1,
            manufacturer: "$manufacturerInfo.name",
            "contactInfo.name": 1,
            "contactInfo.phone": 1,
            "contactInfo.email": 1,
          },
        },
      ]);
      res.status(200).json(criticalStock);
    } catch (error) {
      console.error(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const NewContact = ContactSchema.parse(req.body.ContactInput);
      const NewProduct = ProductSchema.parse(req.body.ProductInput);
      const NewManufacturer = ManufacturerSchema.parse(
        req.body.ManufacturerInput
      );

      const contactID = await Contact.create(NewContact);

      const manufacturerID = await Manufacturer.create({
        ...NewManufacturer,
        contact: contactID._id,
      });

      const product = await Product.create({
        ...NewProduct,
        manufacturer: manufacturerID._id,
      });

      res.status(201).json({ product, message: "Product created" });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const id = req.query.id;
    try {
      const updatedProduct = PartialProductSchema.parse(req.body);

      const response = await Product.findByIdAndUpdate(id, updatedProduct, {
        new: true,
      });

      res.status(201).json(response);
    } catch (error) {
      next(error)
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const id = req.query.id;
    try {
      await Product.findByIdAndDelete(id).lean();
      res.status(200).json({ message: "Succesfully deleted" });
    } catch (error) {}
  }
}

export const productController = new ProductController();
