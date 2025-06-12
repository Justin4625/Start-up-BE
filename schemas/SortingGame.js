import mongoose from 'mongoose'

const sortingGameSchema = new mongoose.Schema({
    paper: {type: Number, default: 0, required: true},
    food: {type: Number, default: 0, required: true},
    plastic: {type: Number, default: 0, required: true},
    rest: {type: Number, default: 0, required: true},
    user_id: { type: String, ref: 'User', required: true },
    high_score: {type: Number, default: 0, required: true},
    created_at: {type: Date, default: Date.now},
})

const SortingGame = mongoose.model('SortingGame', sortingGameSchema)

export default SortingGame