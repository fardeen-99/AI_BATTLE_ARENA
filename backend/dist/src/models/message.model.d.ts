import mongoose, { Document } from 'mongoose';
interface messageType extends Document {
    chatId: mongoose.Schema.Types.ObjectId;
    problem: string;
    solution_1: string;
    solution_2: string;
    AI_judgement: {
        solution_1_score: number;
        solution_2_score: number;
        solution_1_reason: string;
        solution_2_reason: string;
    };
}
declare const messageModel: mongoose.Model<messageType, {}, {}, {}, mongoose.Document<unknown, {}, messageType, {}, mongoose.DefaultSchemaOptions> & messageType & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, messageType>;
export default messageModel;
//# sourceMappingURL=message.model.d.ts.map