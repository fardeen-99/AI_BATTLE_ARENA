import express from "express";
import graph from "./services/graph.ai.service.js"
const app = express();
app.use(express.json())
app.get("/", async(req, res) => {
    const result=await graph()
    console.log(result)
});

export default app;