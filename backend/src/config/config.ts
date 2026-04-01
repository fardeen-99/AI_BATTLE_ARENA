import { config } from "dotenv";

config();

type CONFIGTYPE={
   readonly google_api_key:string,
   readonly mistral_api_key:string,
   readonly cohere_api_key:string,
}


export const configuration:CONFIGTYPE={
    google_api_key:process.env.GOOGLE_API_KEY || "",
    mistral_api_key:process.env.MISTRAL_API_KEY || "",
    cohere_api_key:process.env.COHERE_API_KEY || "",
    
}

