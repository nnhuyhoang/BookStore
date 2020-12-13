import React,{useState} from 'react'

const useOrderDialog=()=> {
    const [isShowing,setIsShowing]=useState(false)

    function toggle(){
        setIsShowing(!isShowing)
    }
    return {
        isShowing,
        toggle
    }
}

export default useOrderDialog
