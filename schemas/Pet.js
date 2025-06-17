import mongoose from 'mongoose'

const petSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    image_urls: [{ type: String, required: true }],
    required_paper: {type: Number, default: 0, required: true},
    required_food: {type: Number, default: 0, required: true},
    required_plastic: {type: Number, default: 0, required: true},
    required_rest: {type: Number, default: 0, required: true},
    created_at: {type: Date, default: Date.now},
})

const Pet = mongoose.model('Pet', petSchema)

export default Pet