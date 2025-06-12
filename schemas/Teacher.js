import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: {type: Date, default: Date.now},
});

const teacher = mongoose.model('Teacher', teacherSchema);

export default teacher;