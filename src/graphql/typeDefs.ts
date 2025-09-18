import mongoose from "mongoose";

const typeDefs = /* GraphQL */ `


    type Contact {
        name: String,
        email: String,
        phone: String
    }

    type Manufacturer {
        name: String,
        country: String,
        website: String,
        description: String,
        address: String,
        contact: ID
    }

    type Product {
        name: String,
        sku: String,
        description: String,
        price: Float,
        category: String,
        manufacturer: ID,
        amountInStock: Int,
    }
    input ContactI {
        name: String,
        email: String,
        phone: String
    }

    input ManufacturerI {
        name: String,
        country: String,
        website: String,
        description: String,
        address: String,
    }

    input ProductI {
        name: String,
        sku: String,
        description: String,
        price: Float,
        category: String,
        amountInStock: Int,
    }

    type TSVBM {
        _id: ID,
        name: String,
        totalStockValue: Int,
    }

    type TSV {
        _id: ID,
        totalStockValue: Float,
    }

    type CSP {
        _id: ID!,
        name: String!,
        sku: String!,
        contactInfo: [Contact]!,
        manufacturer: [String],
    }

    input addProductInput {
        ProductInput: ProductI,
        ContactInput: ContactI,
        ManufacturerInput: ManufacturerI,
    }

    input updateProductInput {
        _id: ID!,
        name: String,
        sku: String,
        description: String,
        price: Float,
        category: String,
        manufacturer: ID,
        amountInStock: Int,
    }

    type Query {

        products : [Product]!,
        product(_id: ID!) : Product!
        totalStockValue : TSV! 
        totalStockValueByManufacturer : [TSVBM]! 
        lowStockProducts : [Product]! 
        criticalStockProducts : [CSP]! 
        manufacturers : [Manufacturer]! 


    },

    type Mutation {
        addProduct(input: addProductInput!) : Product! ,
        updateProduct(input: updateProductInput!) : Product!,
        deleteProduct(_id: ID!) : String,
    }


`;



export default typeDefs;