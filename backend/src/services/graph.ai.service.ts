import { StateSchema, MessagesValue, ReducedValue,StateGraph,type GraphNode, START, END, } from "@langchain/langgraph";
// import { typeGraphNode } from "@langchain/langgraph/prebuilt";
// import type {GraphNode} from "@langchain/langgraph"
import {z} from "zod"
import {googlemodel} from "./models.service.js"
import {mistralmodel} from "./models.service.js"
import {cohereModel} from "./models.service.js"
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import {createAgent,HumanMessage,providerStrategy} from 'langchain'

// if gemini ke alawa koi model use kroge tou toolStrategy provider ki jagah use hogi


const state=new StateSchema({

problem:z.string().default(""),
solution_1:z.string().default(""),
solution_2:z.string().default(""),
AI_judgement:z.object({
    solution_1_score:z.number(),
    solution_2_score:z.number(),
    solution_1_reason:z.string(),
    solution_2_reason:z.string()
}).default({
    solution_1_score:0,
    solution_2_score:0,
    solution_1_reason:"",
    solution_2_reason:"",
})



})
const solutionNode: GraphNode<typeof state> =async(state)=>{
const {problem,solution_1,solution_2}=state;

const [mistral_solution,cohere_solution]=await Promise.all([

    mistralmodel.invoke(problem),
    cohereModel.invoke(problem),
])

    return {
        solution_1:mistral_solution.text,
        solution_2:cohere_solution.text,
    }
}

const judgementNode:GraphNode<typeof state>=async(state)=>{
    const {problem,solution_1,solution_2,AI_judgement}=state;

//     const output=StructuredOutputParser.fromZodSchema(z.object({
//         solution_1_score:z.number().min(0).max(10),
//         solution_2_score:z.number().min(0).max(10),
//         solution_1_reason:z.string(),
//         solution_2_reason:z.string(),
//     }))

//     const prompt=`
//         You are a judge who will judge the solutions of two AI models.
//         Problem: ${problem}
//         Solution 1: ${solution_1}
//         Solution 2: ${solution_2}
//         solve the problem and provide json output:
//         ${output.getFormatInstructions()}
        
//         Please provide the valid reason and scores for each solution.
     
     
//         `

//         const res=await googlemodel.invoke(prompt)
//         const parsed=await output.parse(res.text)

const judgeagent=createAgent({
    model:googlemodel,
    responseFormat:providerStrategy(z.object({
        solution_1_score:z.number().min(0).max(10),
        solution_2_score:z.number().min(0).max(10),
        solution_1_reason:z.string(),
        solution_2_reason:z.string(),
    })),
    systemPrompt:`you are a judge who will judge the solutions of two AI models.
    and you have to provide the scores and reason for each solution.
    `
    
})


const res=await judgeagent.invoke({
    messages:[
        new HumanMessage(`
        Problem: ${problem}
        Solution 1: ${solution_1}
        Solution 2: ${solution_2}
        please provide the scores and reason for each solution.
        `)
    ]
})

        return{
            AI_judgement:res.structuredResponse,
        }

    }

    const graph=new StateGraph(state)
   .addNode("solution",solutionNode)
   .addNode("judgement",judgementNode)
   .addEdge(START,"solution")
   .addEdge("solution","judgement")
   .addEdge("judgement",END)
   .compile()
    

   
   
   
   export default async function(){
   
      const res= graph.invoke({
           problem:"factorial of two numbers",
       })
   
       return res;
    }


