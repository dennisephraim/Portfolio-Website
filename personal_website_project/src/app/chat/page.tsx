import ChatRoom from "../../components/chatRoom"

export default function Chat() {
    return (
        <div className="h-80vh">
            <div className="mb-2">
                <h1><span className="text-blue-400 text-2xl">Chat</span> with <span className="text-blue-400 text-2xl">Me!</span></h1>
            </div>
            <div>
                <ChatRoom />
            </div>
        </div>
    )
}