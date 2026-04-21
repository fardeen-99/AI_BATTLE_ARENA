import mongoose, { Document } from 'mongoose';
const chatSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
}, { timestamps: true });
const chatModel = mongoose.model("chat", chatSchema);
export default chatModel;
//# sourceMappingURL=chat.model.js.map