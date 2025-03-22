import Link from "next/link"

export default function Home() {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>Updating my website! Check back soon to View the new Features! 
        <br/>I have completed the chat tab<br />
        Check it out <Link href="/chat" className="text-blue-400 p-1 rounded-sm hover:bg-blue-400 hover:text-white transition-all">Here </Link> 
      </p>
      <p>Also Check out my blog tab <Link href="/blog" className="text-blue-400 p-1 rounded-sm hover:bg-blue-400 hover:text-white transition-all">Here </Link>, I post updates regularly</p>
    </div>
  )
}
