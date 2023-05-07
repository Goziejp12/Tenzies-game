import React, { useEffect, useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
// import Confetti from 'react-confetti'

export default function App() {
    const [dice, setDice] = useState(createNewDiceArray)
    const [tenzies, setTenzies] = useState(false)

    /* Check if all the dice value properties are the same and all the
        isHeld property is true. If it returns true, the game is won
    */
    useEffect(() => {
        const checkSameDiceValues = dice.every((items, index, diceArray) => {
            return items.value === diceArray[0].value && items.isHeld
        })
        if(checkSameDiceValues) {
            return setTenzies(true)
        }
    }, [dice])

    function createNewDiceArray() {
        const diceArray = []
        for(let i = 0; i < 10; i++) {
            diceArray.push({
                id: nanoid(),
                value: Math.ceil(Math.random() * 6),
                isHeld: false
            })
        }
        return diceArray
    }
    /* Toggling the isHeld property between true and false, and the die 
        background-color between lime green and white. The idea is to 
        hold a die when it is clicked
    */
    function holdDie(dieId) {
        setDice(oldDice => {
            return oldDice.map(die => {
                return die.id === dieId ? 
                    {...die, isHeld: !die.isHeld} : die
            })
        })
    }
    /* If the game is won(all the dice values are the same and tenzies
        is true), create a new dice array. Else continue running the
        game in the normal process as follows; If a die is held(isHeld 
        is true), don't roll it when the roll button is clicked to roll 
        new dice 
    */
    function rollNewDice() {
        if(tenzies) {
            setTenzies(false)
            return setDice(createNewDiceArray)
        }
        else {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : {
                    id: nanoid(),
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false
                }
            }))
        }
    }

    const diceElement = dice.map(die => {
        return <Die 
            key={die.id}
            die={die}
            holdDie={holdDie}
        />
    })
        
    return (
        !tenzies ? 
            <div className='game-layout'>
                <h1>Tenzies</h1>
                <p>
                    Roll until all dice are the same. 
                    Click each die to freeze it at its current value 
                    between rolls.
                </p>
                <div className='dice-box'>
                    {diceElement}
                </div>
                <button 
                    className='roll-btn'
                    onClick={rollNewDice}
                    >
                    {tenzies ? "New Game" : "Roll"}
                </button>
            </div>
            :
            <div className='game-win'>
                {/* {tenzies && <Confetti />} */}
                <h1>You have won!</h1>
                <button 
                    className='roll-btn'
                    onClick={rollNewDice}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
            </div>
    )
}