import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
export declare const googlemodel: ChatGoogle;
export declare const mistralmodel: ChatMistralAI<import("@langchain/mistralai").ChatMistralAICallOptions>;
export declare const cohereModel: ChatCohere<import("@langchain/cohere").ChatCohereCallOptions>;
export declare const generateTitle: (message: any) => Promise<string>;
//# sourceMappingURL=models.service.d.ts.map