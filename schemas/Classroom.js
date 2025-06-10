import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    classroom_code: { type: String, required: true },
    name: { type: String, required: true },
    created_at: {type: Date, default: Date.now},
    teacher_id: { type: String, required: true },
});

const Classroom = mongoose.model('Classroom', classroomSchema);

export default Classroom;
