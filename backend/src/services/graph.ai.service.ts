import { StateSchema, MessagesValue, ReducedValue, StateGraph, type GraphNode, START, END, } from "@langchain/langgraph";
// import { typeGraphNode } from "@langchain/langgraph/prebuilt";
// import type {GraphNode} from "@langchain/langgraph"
import { z } from "zod"
import { googlemodel } from "./models.service.js"
import { mistralmodel } from "./models.service.js"
import { cohereModel } from "./models.service.js"
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { createAgent, HumanMessage, providerStrategy, toolStrategy } from 'langchain'
import { InternetSearch } from "./Internet.service.js"
import { tool } from "@langchain/core/tools"

// if gemini ke alawa koi model use kroge tou toolStrategy provider ki jagah use hogi

const internetTool = tool(InternetSearch, {
  name: "internet_search",
  schema: z.object({
    query: z.string().describe("The search query to look up on the internet"),
  }),
  description: "Search the internet for real-time information, news, prices, and facts. Returns a clear text summary with a 'Direct Answer' and 'Top Search Results'.",
})



// first we set the state!!

const state = new StateSchema({

  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  AI_judgement: z.object({
    solution_1_score: z.number(),
    solution_2_score: z.number(),
    solution_1_reason: z.string(),
    solution_2_reason: z.string()
  }).default({
    solution_1_score: 0,
    solution_2_score: 0,
    solution_1_reason: "",
    solution_2_reason: "",
  })



})
const solutionNode: GraphNode<typeof state> = async (state) => {
  const { problem } = state;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const mistral_agent = createAgent({
    model: mistralmodel,
    tools: [internetTool],
    systemPrompt: `
    You are an expert AI solver.
    Current Date: ${currentDate}

    IMPORTANT:
    - If question is about current events, prices, or recent facts → MUST use internet_search tool.
    - When you receive search results, prioritize the 'Direct Answer' but also verify with 'Top Search Results'.
    - If the tool returns no information, explain that clearly to the user.
    `
  });

  const cohere_agent = createAgent({
    model: mistralmodel,
    tools: [internetTool],
    systemPrompt: `
    You are an expert AI solver.
    Current Date: ${currentDate}

    IMPORTANT:
    - If question is about current events, prices, or recent facts → MUST use internet_search tool.
    - When you receive search results, prioritize the 'Direct Answer' but also verify with 'Top Search Results'.
    - If the tool returns no information, explain that clearly to the user.
    `
  });

  const [mistral_solution, cohere_solution] = await Promise.all([
    mistral_agent.invoke({
      messages: [new HumanMessage(problem)]
    }),
    cohere_agent.invoke({
      messages: [new HumanMessage(problem)]
    })
  ]);

  const getFinalContent = (res: any) =>
    res.messages[res.messages.length - 1].content;

  return {
    solution_1: getFinalContent(mistral_solution),
    solution_2: getFinalContent(cohere_solution),
  };
};
const judgementNode: GraphNode<typeof state> = async (state) => {
  const { problem, solution_1, solution_2, AI_judgement } = state;

  const judgeagent = createAgent({
    model: mistralmodel,
    responseFormat: toolStrategy(z.object({
      solution_1_score: z.number().min(0).max(10),
      solution_2_score: z.number().min(0).max(10),
      solution_1_reason: z.string(),
      solution_2_reason: z.string(),
    })),
    systemPrompt: `you are an expert judge who will evaluate the solutions of two AI models.
        Assign scores (0-10) and provide a detailed reasoning based on accuracy, completeness, and clarity.`
  })


  const res = await judgeagent.invoke({
    messages: [
      new HumanMessage(`
            Problem: ${problem}
            Solution 1: ${solution_1}
            Solution 2: ${solution_2}
            
            Please provide the scores and reason for each solution.
            `)
    ]
  })

  return {
    AI_judgement: res.structuredResponse,
  }

}

const graphflow = new StateGraph(state)
  .addNode("solution", solutionNode)
  .addNode("judgement", judgementNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judgement")
  .addEdge("judgement", END)
  .compile()





export default async function (input: string | any[]) {
  let problemStr = "";
  let originalProblem = "";

  if (Array.isArray(input)) {
    // The last item in the array is the current problem
    originalProblem = input[input.length - 1].problem;

    problemStr = input.map((m, i) => {
      if (i === input.length - 1) {
        return `Current Problem: ${m.problem}`;
      }
      return `Past Problem: ${m.problem}\nSolution 1: ${m.solution_1}\nSolution 2: ${m.solution_2}`;
    }).join("\n\n---\n\n");
  } else {
    problemStr = input;
    originalProblem = input;
  }

  const res = await graphflow.invoke({ problem: problemStr });

  // Return the result but restore the original problem so the database saves only the user's message
  return {
    ...res,
    problem: originalProblem
  };
}

