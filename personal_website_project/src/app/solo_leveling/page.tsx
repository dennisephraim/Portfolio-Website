import Goal from "@/components/goal"
import Status from "@/components/status"
import AddGoal from "@/components/addGoal"
import { signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../../firebase/config"

const temp_task = [
    {name: 'pushups'},
    {name: 'situps'},
    {name: 'leetcode'},
]


const userEmail = "akainetteyephraim1234@gmail.com"
const userPassword = "Adgjmptw!23"


export default async function soloLeveling() {
    const userCred = await signInWithEmailAndPassword(auth, userEmail, userPassword)
    const user = userCred.user
    const idToken = await user.getIdToken()
    
    const response = await fetch("https://helloworld-auu3gfb5pa-uc.a.run.app/", {
        headers: {
          "Authorization": `Bearer ${idToken}`,
        },
    });
    const data = await response.json()
    console.log(data)

    return (
        <div className="grid grid-cols-2">
            <Status />
            <Goal questTitle={"Lock-In"} tasks={temp_task}/>
            <AddGoal/>
        </div>
    )
}