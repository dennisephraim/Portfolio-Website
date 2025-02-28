export default function Blogrow({header, content, date, time}: {header: string, content: string, date: string, time: string}) {
    return (
        <div className="flex flex-col bg-blue-950 rounded-lg p-3">
            <div className="flex flex-row justify-between">
                <h1>{header}</h1>
                <h2>{date} | {time}</h2>
            </div>
            <div>
                <p>{content}</p>
            </div>
        </div>
    )
}