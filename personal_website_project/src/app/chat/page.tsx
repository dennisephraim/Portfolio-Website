import ChatRoom from "../../components/chatRoom"
import PageTransition from '@/components/PageTransition';

export default function Chat() {
    return (
        <PageTransition>
            <div>
                <div className="mb-2">
                    <h1><span className="text-blue-400 text-2xl">Chat</span> with <span className="text-blue-400 text-2xl">Me!</span></h1>
                </div>
                <div>
                    <ChatRoom />
                </div>
            </div>
        </PageTransition>
    )
}