import React, { useState } from 'react'

const useCheckOutDialog=()=>{
    const [isShowingCheckOut,setIsShowingCheckOut]=useState(false)

    function toggleCheckOut(){
        setIsShowingCheckOut(!isShowingCheckOut)
    }
    return {
        isShowingCheckOut,
        toggleCheckOut
    }
}

export default useCheckOutDialog
