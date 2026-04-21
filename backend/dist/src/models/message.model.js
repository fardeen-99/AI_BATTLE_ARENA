import mongoose, { Document } from 'mongoose';
const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat",
        required: true,
    },
    problem: {
        type: String,
        required: true,
    },
    solution_1: {
        type: String,
        required: true,
    },
    solution_2: {
        type: String,
        required: true,
    },
    AI_judgement: {
        solution_1_score: {
            type: Number,
            required: true,
        },
        solution_2_score: {
            type: Number,
            required: true,
        },
        solution_1_reason: {
            type: String,
            required: true,
        },
        solution_2_reason: {
            type: String,
            required: true,
        },
    }
}, { timestamps: true });
const messageModel = mongoose.model("message", messageSchema);
export default messageModel;
//# sourceMappingURL=message.model.js.map