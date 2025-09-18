import mongoose, {InferSchemaType} from "mongoose";


const ManufacturerSchema = new mongoose.Schema(
    {
    name : {type : String, required: true, unique: true},
    country : {type : String, required: true},
    website : {type : String, required: true},
    description : {type : String, required: true},
    address : {type : String, required: true},
    contact : {type : mongoose.Schema.Types.ObjectId , required: true, ref: 'Contact'},
    }
)


const Manufacturer = mongoose.model('Manufacturer', ManufacturerSchema);
export type ManufacturerType = InferSchemaType<typeof ManufacturerSchema>;

export default Manufacturer;