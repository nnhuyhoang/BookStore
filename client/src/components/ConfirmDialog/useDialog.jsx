import React,{useState} from 'react'

const useDialog=()=> {
    const [isShowing,setIsShowing]=useState(false)

    function toggle(){
        setIsShowing(!isShowing)
    }
    return {
        isShowing,
        toggle
    }
}

export default useDialog
