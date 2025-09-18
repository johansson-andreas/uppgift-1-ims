import mongoose, {ObjectId} from "mongoose";
import {ContactType} from '../models/Contact';
import {ProductType, ProductTypePartial} from '../models/Product';
import {ManufacturerType} from '../models/Manufacturer';
import Product from "../models/Product";
import Contact from "../models/Contact";
import Manufacturer from "../models/Manufacturer";
import { GraphQLError } from "graphql";



const resolvers = {
 
    Query : {
        products : async () => {
            try {
                const response = await Product.find().populate({
                path: "manufacturer",
                populate: { path: "contact" },
                });
            return response;
            } catch (error) {
                throw new GraphQLError(`${error}`, {
                    extensions: {
                        code: '500',
                        http: {status: 500}
                    }
                })
            }
        },
        product : async (_p: any, { _id } : {_id: ObjectId}) => {
            try { 
            if (!mongoose.isValidObjectId(_id)) {
                throw new GraphQLError("ID is not valid", {
                    extensions: {
                        code: "INVALID_INPUT",
                        status: {code: 400}
                                }
                })
            }
                const response = await Product.findById(_id).populate({
                    path: "manufacturer",
                    populate: { path: "contact" },
                });

                return response;
                
                } catch (error) {
                throw new GraphQLError(`${error}`, {
                    extensions: {
                        code: '500',
                        http: {status: 500}
                    }
                })
                }
        },
        totalStockValue: async () => {
            try {
            const [totalStockValue] = await Product.aggregate([{ $match: {}}, {$group: {_id:null, totalStockValue: {$sum: {$multiply: ["$price", "$amountInStock"]}}}}])
            return totalStockValue;
            } catch (error) {
                throw new GraphQLError(`${error}`, {
                    extensions: {
                        code: '500',
                        http: {status: 500}
                    }
                })
            }

        },
        totalStockValueByManufacturer: async () => {
        try {
        
            const totalStockValue = await Product.aggregate([{ $match: {}}, {$group: {_id: "$manufacturer", totalStockValue: {$sum: {$multiply: ["$price", "$amountInStock"]}}}}])
            const mappedStockValue = await Promise.all(totalStockValue.map(async (manufacturer) => {
            const manufacturerName = await Manufacturer.findById(manufacturer._id)
            return {...manufacturer, name: manufacturerName!.name}
        }))
        return mappedStockValue;
        
        } catch (error) {
                throw new GraphQLError(`${error}`, {
                    extensions: {
                        code: '500',
                        http: {status: 500}
                    }
                })
        }
        },
        lowStockProducts: async () => {
    try {

        const lowStock = await Product.aggregate([{$match: { "amountInStock": {$lt: 10}}}])

        return lowStock;
    } catch (error) {
            throw new GraphQLError(`${error}`, {
                extensions: {
                    code: '500',
                    http: {status: 500}
                }
            })
    }
        },
        criticalStockProducts: async () => {
    try { 
        const criticalStock = await Product.aggregate([{$match: { "amountInStock": {$lt: 5}}}, {$lookup: {from: "manufacturers", localField: "manufacturer", foreignField: "_id", as: "manufacturerInfo"}}, {$lookup: {from: "contacts", localField: "manufacturerInfo.contact", foreignField: "_id", as: "contactInfo"}}, {$project: {"name": 1, "sku": 1, "manufacturer": "$manufacturerInfo.name", "contactInfo.name": 1, "contactInfo.phone": 1, "contactInfo.email": 1}}])
        return criticalStock;
        } catch (error) {
            throw new GraphQLError(`${error}`, {
                extensions: {
                    code: '500',
                    http: {status: 500}
                }
            })
    }
        },
        manufacturers: async () => {
            const manufacturer = await Manufacturer.find();
            return manufacturer;
        }

    },

    Mutation : {
        addProduct: async (_p: any, {input} : {input : {ProductInput: ProductType, ManufacturerInput: ManufacturerType, ContactInput: ContactType}} ) => {
            const { ProductInput, ManufacturerInput, ContactInput } = input;
            console.log(input)
            console.log(ContactInput)
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
                
                return product;
                } catch (error) {
                throw new GraphQLError(`${error}`, {
                    extensions: {
                        code: '500',
                        http: {status: 500}
                    }
                })
            }

        },
        updateProduct: async (_p: any, {...input}: ProductTypePartial) => {
        const {_id, ...product} = input;
        try {
            const response = await Product.findByIdAndUpdate(_id, product, {
            new: true,
        });

        return response;
        } catch (error) {
                throw new GraphQLError(`${error}`, {
                    extensions: {
                        code: '500',
                        http: {status: 500}
                    }
                })
        }
        },
        deleteProduct: async (_p: any, _id: ObjectId) => {
            try {
                await Product.findByIdAndDelete(_id);
                return {message: `Product deleted with id ${_id}`}
            } catch (error) {
                            throw new GraphQLError(`${error}`, {
                    extensions: {
                        code: '500',
                        http: {status: 500}
                    }
                })
            }
        }

    }


}



export default resolvers