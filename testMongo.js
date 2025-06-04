import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Verbonden met MongoDB!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Fout bij verbinden met MongoDB:', error);
        process.exit(1);
    }
}

testConnection();
