import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, unique: true, required: true},
        phone: { type: String, unique: true, required: true}
    }
)

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;