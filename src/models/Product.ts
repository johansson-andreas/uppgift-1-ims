import mongoose, {InferSchemaType} from "mongoose";
import Manufacturer from "./Manufacturer";

const ProductSchema =  new mongoose.Schema(
    {
        name: { type: String, required: true},
        sku: { type: String, required: true, unique: true},
        description: { type: String, required: true},
        price: { type: Number, required: true},
        category: { type: String, required: true},
        manufacturer: { type : mongoose.Schema.Types.ObjectId, required: true, ref: Manufacturer.modelName},
        amountInStock: { type : Number, required: true}
    }
);

const Product = mongoose.model('Product', ProductSchema)
export type ProductType = InferSchemaType<typeof ProductSchema>;
export type ProductTypePartial = Partial<ProductType> & {_id: mongoose.Schema.Types.ObjectId};


export default Product;