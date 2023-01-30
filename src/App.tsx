import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/clipart980536.png", matched: false },
  {"src": "/img/NicePng_bayern-munich-logo-png_2744661.png", matched: false },
  {"src": "/img/Manchester_United_logo_PNG17.png", matched: false },
  {"src": "/img/PSG_logo_PNG10.png", matched: false },
  {"src": "/img/580b57fcd9996e24bc43c4e1.png", matched: false },
  {"src": "/img/Real_Madrid_logo_PNG7.png", matched: false },
]

function App() {

  const [cards, setCards] = useState<Array<any>>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<any | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<any | null>(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(()=> Math.random() - 0.5)
    .map((card)=>({...card, id: Math.random()}));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  //handle a choice
  const handleChoice = (card:any) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //compare 2 selected cards
  useEffect(() =>{
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards =>{
          return prevCards.map(card =>{
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            } else{
              return card;
            }
          });
        });
        resetTurn();
      } else{
        setTimeout(()=> resetTurn(), 1000);
      }
    }
  },[choiceOne, choiceTwo])

  //reset choices and increase turn
  const resetTurn = () =>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  //start a new game automatically
  useEffect(()=>{
    shuffleCards();
  },[])
 
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) =>(
          <SingleCard 
          card={card} 
          key={card.id}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  )
}

export default App