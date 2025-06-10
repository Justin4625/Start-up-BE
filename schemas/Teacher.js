import mongoose from 'mongoose';

const teacherScema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: {type: Date, default: Date.now},
});

const teacher = mongoose.model('teacher', teacherScema);

export default teacher;