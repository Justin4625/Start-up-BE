import mongoose from 'mongoose';

const personaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    arcana: { type: String, required: true },
    level: { type: String, required: true },
    price: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret._links = {
                self: {
                    href: `${process.env.BASE_URL}personas/${ret._id}`
                },
                collection: {
                    href: `${process.env.BASE_URL}personas`
                }
            };

            delete ret._id;
        }
    }
});

const Persona = mongoose.model('Persona', personaSchema);

export default Persona;