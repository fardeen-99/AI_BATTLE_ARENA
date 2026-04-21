import mongoose, { Document } from 'mongoose';
interface chatType extends Document {
    userID: mongoose.Schema.Types.ObjectId;
    title: string;
}
declare const chatModel: mongoose.Model<chatType, {}, {}, {}, mongoose.Document<unknown, {}, chatType, {}, mongoose.DefaultSchemaOptions> & chatType & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, chatType>;
export default chatModel;
//# sourceMappingURL=chat.model.d.ts.map