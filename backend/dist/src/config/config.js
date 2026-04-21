import { config } from "dotenv";
config();
export const configuration = {
    google_api_key: process.env.GOOGLE_API_KEY || "",
    mistral_api_key: process.env.MISTRAL_API_KEY || "",
    cohere_api_key: process.env.COHERE_API_KEY || "",
    jwt_secret: process.env.JWT_SECRET || "",
    mongo_uri: process.env.MONGO_URI || "",
    tavily_api_key: process.env.TAVILY_API_KEY || "",
};
//# sourceMappingURL=config.js.map