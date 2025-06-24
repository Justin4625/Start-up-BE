import mongoose from "mongoose";

const keySchema = new mongoose.Schema({
    key: { type: String, required: true },
});

const ApiKey = mongoose.model('ApiKey', keySchema);

export default ApiKey;