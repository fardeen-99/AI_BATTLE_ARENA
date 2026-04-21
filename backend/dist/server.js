import app from "./src/app.js";
import { config } from "dotenv";
import connectDB from "./src/config/datbase.js";
config();
connectDB();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=server.js.map