import mongoose from "mongoose";
import { configuration } from "./config.js";
const connectDB = async () => {
    try {
        await mongoose.connect(configuration.mongo_uri);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=datbase.js.map