import mongoose from 'mongoose'

const craftingGameSchema = new mongoose.Schema({
    user_id: { type: String, ref: 'User', required: true },
    pet_id: { type: String, ref: 'Avatar', required: true},
    created_at: {type: Date, default: Date.now},
})

const CraftingGame = mongoose.model('CraftingGame', craftingGameSchema)

export default CraftingGame