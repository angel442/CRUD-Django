import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
    },
    secondName: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
{
    timestamps: true
})

export default mongoose.model('User', userSchema);