import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import { configuration } from "../config/config.js";
import { HumanMessage } from "@langchain/core/messages";
export const googlemodel = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: configuration.google_api_key,
});
export const mistralmodel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: configuration.mistral_api_key,
});
export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: configuration.cohere_api_key,
});
export const generateTitle = async (message) => {
    const prompt = `
Generate a title for the following message: ${message}
Only 2-3 words, plain text, no quotes, no formatting.
`;
    const response = await mistralmodel.invoke([
        new HumanMessage(prompt)
    ]);
    return response.text;
};
//# sourceMappingURL=models.service.js.map