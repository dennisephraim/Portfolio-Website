import ChatProfile from "./ChatProfile"
import ChatArea from "./ChatArea"

export default function ChatRoom() {
    return (
        <div className="bg-custom_blue_shade bg-opacity-80 rounded-lg grid grid-cols-[auto_1fr]">
            <div className="border-r-4 p-4 border-r-custom_slate flex flex-col gap-y-2">
                <ChatProfile />
            </div>            
            <div className="pb-4 pt-4">
                <ChatArea />
            </div>            
        </div>
    )
}