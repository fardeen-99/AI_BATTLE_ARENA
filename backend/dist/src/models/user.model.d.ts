import { Document } from "mongoose";
import mongoose from 'mongoose';
interface userType extends Document {
    username: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
}
declare const usermodel: mongoose.Model<userType, {}, {}, {}, Document<unknown, {}, userType, {}, mongoose.DefaultSchemaOptions> & userType & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, userType>;
export default usermodel;
//# sourceMappingURL=user.model.d.ts.map