import React from "react"

export default function Die(props) {
    const style = {
        backgroundColor: props.die.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die"
            onClick={() => props.holdDie(props.die.id)}
        >
            <p style={style}>{props.die.value}</p>
        </div>
    )
}