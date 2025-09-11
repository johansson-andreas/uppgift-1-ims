import { Express, Request, Response } from "express";
import Contact from "../../models/Contact";
import Manufacturer from "../../models/Manufacturer";
import Product from "../../models/Product";

class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const response = await Product.find().populate({
        path: "manufacturer",
        populate: { path: "contact" },
      });
      res.status(200).json({message:response});
    } catch (error) {}
  }
  async getOneProduct(req: Request, res: Response) {
    const id = req.query.id;

    const response = await Product.findById(id).populate({
        path: "manufacturer",
        populate: { path: "contact" },
      });
      res.status(200).json({message:response})
    try {
    } catch (error) {}
  }
  async getTotalStockValue(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
  async getTotalStockValueBM(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
  async getCriticalStock(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
  async createProduct(req: Request, res: Response) {
    const { ProductInput, ManufacturerInput, ContactInput } = req.body;
    // console.log(req.body)
    // console.log('product', ProductInput)
    console.log("Manu", ManufacturerInput);
    // console.log('Contact', ContactInput)
    try {
      const contactID = await Contact.create(ContactInput);
      console.log(contactID);

      const manufacturerID = await Manufacturer.create({
        ...ManufacturerInput,
        contact: contactID._id,
      });
      console.log(manufacturerID);
      const product = await Product.create({
        ...ProductInput,
        manufacturer: manufacturerID._id,
      });

      res.status(201).json({ product, message: "Product created" });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  async updateProduct(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
  async deleteProduct(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
}


export const productController = new ProductController();
