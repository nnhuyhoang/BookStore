import React,{useEffect} from 'react'
import "./style.css"
const QuantityControl=(props)=>{
    console.log("render Quantity");
    return (
        <div className="QunantityControl">
            <button onClick={props.decreaseQuantity}>-</button>
                <input 
                    type="text" 
                    onChange={props.changeQuantity} 
                    name={props.name} 
                    value={props.productQuantity}
                />
            <button onClick={props.increaseQuantity}>+</button>
        </div>
    )
}

export default React.memo(QuantityControl)
