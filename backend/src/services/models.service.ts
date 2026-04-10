
import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import { configuration } from "../config/config.js";
import { HumanMessage } from "@langchain/core/messages";

export const googlemodel = new ChatGoogle({
    model:"gemini-2.5-flash",
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


export const generateTitle=async(message:string)=>{

    const prompt=`Generate a title for the following message: ${message}
    make it shorter in 2-3 words
    only return the title
    and generate like a real chatGPT
    `

    const response=await mistralmodel.invoke([
            new HumanMessage(prompt)
        ]
    )

    return response.text

}