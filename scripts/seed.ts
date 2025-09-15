import { faker } from "@faker-js/faker";
import Contact from "../src/models/Contact";
import Manufacturer from "../src/models/Manufacturer";
import Product from "../src/models/Product";
import mongoose, { connect } from "mongoose";
import connectDB from "../src/db";

const createRandomContact = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  };
};

const createRandomManufacturer = (contactId: mongoose.Types.ObjectId) => {
    return {
        name: faker.company.name(),
        country: faker.location.country(),
        website: faker.internet.url(),
        description: faker.company.catchPhrase(),
        address: faker.location.streetAddress(),
        contact: contactId
    }
}

const createRandomProduct = (manufacturerId: mongoose.Types.ObjectId) => {
    return {
        name: faker.commerce.productName(),
        category: faker.commerce.department(),
        price: parseFloat(faker.commerce.price()),
        manufacturer: manufacturerId,
        sku: faker.string.alphanumeric(8),
        amountInStock: Math.floor(Math.random() * 100) + 1,
        description: faker.commerce.productDescription(),
    }
}

const generateData = async () => {
  for(let i = 1; i <= 10; i++) {
    const contact = await Contact.create(createRandomContact());

    console.log("Created contact:", contact)
    const manufacturer = await Manufacturer.create(createRandomManufacturer(contact._id))
    console.log("Created manufacturer:", manufacturer)
    const products = [];
    for(let j = 0; j <= Math.round(Math.random()*5)+1; j++)
    {
        products.push(createRandomProduct(manufacturer._id))
    }
    console.log("Created products:", products)
    const productResponse = await Product.insertMany(products);
    console.log(productResponse)
  }
}
connectDB("mongodb+srv://nevarix:Marsgrand9@questionscluster.h5tskl2.mongodb.net/?retryWrites=true&w=majority").then(() => {
generateData()
})
