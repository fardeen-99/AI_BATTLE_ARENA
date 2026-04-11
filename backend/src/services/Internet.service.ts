import {configuration} from "../config/config.js"

import {tavily as Tavily} from "@tavily/core"

const tavily=Tavily({apiKey:configuration.tavily_api_key})

export const InternetSearch = async ({query}: any) => {
    try {
        // Handle both { input: "query" } and "query" directly
        const input = typeof query === 'string' ? query : query.input;
        
        if (!input) {
            console.log("⚠️ [InternetSearch] No input query provided.");
            return "No search query provided.";
        }

        console.log(`🌐 [InternetSearch] Query: "${input}"`);
        const date=Date.now()
        const year=new Date(date).getFullYear()

        const enhanceQuery=`${input} ${year}`

        const result=await tavily.search(enhanceQuery,{
            max_results:5,
            searchDepth: "advanced",
            include_answer: true
        })

        if (!result || (!result.answer && (!result.results || result.results.length === 0))) {
            console.log("⚠️ [InternetSearch] No results found.");
            return "No relevant information found on the internet for this query.";
        }

        return result

    } catch (error) {
        console.error("❌ [InternetSearch] Error:", error);
        return "An error occurred while searching the internet.";
    }
}