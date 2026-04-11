import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"

const Chat = () => {
    const { messages, loading } = useSelector((state: RootState) => state.chats)

    return (
        <div className="min-h-full w-full bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <div className="space-y-4">
                {messages?.map((message, index) => (
                    <div key={message._id || index} className="p-4 bg-gray-700 rounded-lg shadow">
                        <div className="mb-2">
                            <span className="text-blue-400 font-semibold">Problem: </span>
                            <span>{message.problem}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-2 bg-gray-600 rounded">
                                <h2 className="font-bold">Solution 1</h2>
                                <p>{message.solution_1}</p>
                                {message.AI_judgement && (
                                    <div className="mt-2 text-sm">
                                        <p className="text-yellow-400">Score: {message.AI_judgement.solution_1_score}</p>
                                        <p className="italic">{message.AI_judgement.solution_1_reason}</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-2 bg-gray-600 rounded">
                                <h2 className="font-bold">Solution 2</h2>
                                <p>{message.solution_2}</p>
                                {message.AI_judgement && (
                                    <div className="mt-2 text-sm">
                                        <p className="text-yellow-400">Score: {message.AI_judgement.solution_2_score}</p>
                                        <p className="italic">{message.AI_judgement.solution_2_reason}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <div className="mt-4 text-center">AI is thinking...</div>}
        </div>
    )
}

export default Chat