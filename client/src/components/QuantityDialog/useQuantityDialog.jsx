import React,{useState} from 'react'

const useQuantityDialog=()=> {
    const [isShowingQuantity,setIsShowingQuantity]=useState(false)

    function toggleQuantity(){
        setIsShowingQuantity(!isShowingQuantity)
    }
    return {
        isShowingQuantity,
        toggleQuantity
    }
}

export default useQuantityDialog
