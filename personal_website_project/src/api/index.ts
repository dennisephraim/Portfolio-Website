import { signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../firebase/config"


const userEmail = "akainetteyephraim1234@gmail.com"
const userPassword = "Adgjmptw!23"

const userCred = await signInWithEmailAndPassword(auth, userEmail, userPassword)
const user = userCred.user
const idToken = await user.getIdToken()

const response = await fetch("https://helloworld-auu3gfb5pa-uc.a.run.app/", {
    headers: {
      "Authorization": `Bearer ${idToken}`,
    },
});