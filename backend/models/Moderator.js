import mongoose from 'mongoose';

const ModeratorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regno: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Moderator = mongoose.model('Moderator', ModeratorSchema);

export default Moderator;
