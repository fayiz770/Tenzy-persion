import React from 'react';
import './App.css';
import Die from './Components/Die';
import { nanoid } from 'nanoid';
import * as sweetalert from 'sweetalert'
import Confetti from 'react-confetti';
function App() {
  function generateNewDie(){
    return {
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      }
  }
  function allNewDice(){
    const newDice = []
    for(let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }
  function roll(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
  }else{
    setTenzies(false)
    setDice(allNewDice())
  }
  }
  function holdDice(diceId){
    setDice(oldDice => oldDice.map(die => {
      return die.id === diceId ? {...die, isHeld: !die.isHeld}: die
    }))
  }
  const [dice, setDice] = React.useState(allNewDice)
  const allDice = dice.map(die => <Die key={die.id} value={die.value}  isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)
  const [tenzies, setTenzies] = React.useState(false)
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstDieValue = dice[0].value
    const allTheSame = dice.every(die => die.value === firstDieValue)
    if(allHeld && allTheSame){
      setTenzies(true)
      sweetalert({
        title: 'شما برنده شدید',
        icon: 'success',
      })
    }
    console.log("Dice Changed")
  }, [dice])
  return (
    <div className='container'> 
      <main>
        {tenzies && <Confetti />}
        <h1>Tenzies </h1>
        <p dir='rtl'>
          <h1>تا وقتیکه همه ای مربع ها مشابه شود بچرخانید, و هر بار عدد دلخواه تانرا انتخاب کنید</h1>
        </p>
        <div className='dice'>
          {allDice}
        </div>
        <button onClick={roll} className='die--button'>{tenzies ? 'بازی جدید' : 'جرخاندن'}</button>
    </main>
    </div>
  );
}
export default App;
