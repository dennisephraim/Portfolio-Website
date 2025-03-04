export default function Blogrow({header, content, timestamp}: {header: string, content: string, timestamp: string}) {

    const date = new Date(timestamp)
    const time = date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: false, })
    const day = date.toLocaleDateString("en-US")
    
    return (
        <div className="flex flex-col bg-blue-950 border-black first:border-b-2 border-b-2 last:border-b-0 p-3 first:rounded-t-md last:rounded-b-md">
            <div className="flex flex-row justify-between">
                <h1>{header}</h1>
                <h2>{day} | {time}</h2>
            </div>
            <div>
                <p>{content}</p>
            </div>
        </div>
    )
}