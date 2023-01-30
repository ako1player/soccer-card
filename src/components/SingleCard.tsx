import './SingleCard.css';

const SingleCard = ({card, handleChoice, flipped, disabled}:any) =>{

  const handleClick = () =>{
    if(!disabled){
      handleChoice(card);
    }
  }

    return(
        <div key={card.id} className="card">
            <div className={flipped ? "flipped" : ""}>
              <img className='front' src={card.src} alt="card front"/>
              <img 
              className='back' 
              src='/img/NicePng_football-png_262876.png' 
              onClick={handleClick} 
              alt="card back" />
            </div>
          </div>
    )
}

export default SingleCard;