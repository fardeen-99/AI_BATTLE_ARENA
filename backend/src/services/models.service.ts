
import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import { configuration } from "../config/config.js";

export const googlemodel = new ChatGoogle({
    model:"gemini-latest-flash",
    apiKey:configuration.google_api_key,
});

export const mistralmodel = new ChatMistralAI({
    model:"mistral-medium-latest",
    apiKey:configuration.mistral_api_key,
});

export const cohereModel = new ChatCohere({
    model:"command-a-03-2025",
    apiKey:configuration.cohere_api_key,
});