import mongoose from "mongoose";


const ProductSchema =  new mongoose.Schema(
    {
        name: { type: String, required: true},
        sku: { type: String, required: true, unique: true},
        description: { type: String, required: true},
        price: { type: Number, required: true},
        category: { type: String, required: true},
        manufacturer: { type : mongoose.Schema.Types.ObjectId, required: true, ref: 'manufacturer'},
        amountInStock: { type : Number, required: true}
    }
);

const Product = mongoose.model('Product', ProductSchema)

export default Product;