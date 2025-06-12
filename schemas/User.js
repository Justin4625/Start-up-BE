import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    classroom_id: { type: String, ref: 'Classroom', required: true },
    created_at: {type: Date, default: Date.now},
});

const User = mongoose.model('User', userSchema);

export default User;




