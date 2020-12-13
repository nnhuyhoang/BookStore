import React,{useState} from 'react'
import * as BookActions from "./../../actions/books"
export default function Test() {
    const [Text, setText] = useState("")
    const [Image,setImage]=useState()

    const handleClick=async()=>{
        await BookActions.sendImage(Text,Image)
    }
    return (
        <div>
            <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])}/>
            <input type="text" onChange={(e)=>setText(e.target.value)}/>
            <button onClick={handleClick}>Click</button>
        </div>
    )
}
