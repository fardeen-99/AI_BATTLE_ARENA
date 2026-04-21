import chatModel from '../models/chat.model.js';
import messageModel from '../models/message.model.js';
import { generateTitle } from '../services/models.service.js';
import graph from '../services/graph.ai.service.js';
import {} from "express";
export const chatController = async (req, res) => {
    const { message, chatId } = req.body;
    let title = null;
    let currentchatId = chatId;
    let history = null;
    let inputForGraph;
    if (!chatId) {
        const response = await generateTitle(message);
        title = response;
        const chat = await chatModel.create({
            title,
            userID: req.user?.id,
        });
        currentchatId = chat._id;
        inputForGraph = message;
    }
    else {
        const prevMessage = await messageModel.find({ chatId: currentchatId }).sort({ createdAt: 1 }).lean();
        inputForGraph = [...prevMessage, { problem: message }];
    }
    const response = await graph(inputForGraph);
    const saveairesponse = await messageModel.create({
        chatId: currentchatId,
        problem: response.problem,
        solution_1: response.solution_1,
        solution_2: response.solution_2,
        AI_judgement: {
            solution_1_score: response.AI_judgement.solution_1_score,
            solution_2_score: response.AI_judgement.solution_2_score,
            solution_1_reason: response.AI_judgement.solution_1_reason,
            solution_2_reason: response.AI_judgement.solution_2_reason,
        },
    });
    res.status(200).json({
        message: "Message sent successfully",
        title: title,
        chatId: currentchatId,
        response: saveairesponse,
    });
};
export const getChats = async (req, res) => {
    const chats = await chatModel.find({ userID: req.user?.id }).sort({ createdAt: -1 });
    res.status(200).json({
        message: "your chats fetched succesfully",
        chats,
    });
};
export const getMessages = async (req, res) => {
    const messages = await messageModel.find({ chatId: req.params?.id });
    res.status(200).json({
        message: "your message fetched succesfully",
        messages
    });
};
//# sourceMappingURL=chat.controller.js.map