import { useContext } from "react"
import {SubjectContext} from "./ContextData"

export default function SubjectComponent(){
    const subject = useContext(SubjectContext)
  return(
    <div style={{backgroundColor:"pink", padding:10}}>
      <h1>Subect is :{subject}</h1>
    </div>
  )
}