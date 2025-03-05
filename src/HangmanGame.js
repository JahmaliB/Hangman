import './App.css';
import React from 'react';
import LetterBox from './LetterBox';
import SingleLetterSearchbar from './SingleLetterSearchBar';

const pics = ['noose.png', 'upperBody.png', 'upperandlowerbody.png', '1arm.png', 'botharms.png', '1leg.png', 'Dead.png'];
const words = ["Morehouse", "Spelman", "Basketball", "Table", "Museum", "Excellent", "Fun", "React"];

class HangmanGame extends React.Component {
  state = {
    wordList: words,
    curWord:  Math.floor(Math.random() * words.length),
    lifeLeft: 0,
    usedLetters: [],
    gameOver: false,
  }

  handleGuess = (letter) => {
    const { wordList, curWord, usedLetters } = this.state;
    const word = wordList[curWord].toLowerCase();
  
    if (usedLetters.includes(letter)) {
      alert('You already guessed that letter!');
      return;
    }
  
    this.setState((prevState) => ({
        usedLetters: [...prevState.usedLetters, letter],
      }), 
      
      () => {
        if (!word.includes(letter.toLowerCase())) {
          this.setState((prevState) => ({
              lifeLeft: prevState.lifeLeft + 1,
            }),
            () => {
              this.checkGameOver();
            }
          );
        } else {
          this.checkGameOver();
        }
      }
    );
  };

  checkGameOver = () => {
    const {wordList, curWord, usedLetters, lifeLeft} = this.state;
    const word = wordList[curWord].toLowerCase();

    const isWinner = word.split('').every((letter) => usedLetters.includes(letter));

    const isLoser = lifeLeft === pics.length - 1;

    if (isWinner || isLoser) {
      this.setState({gameOver: true});
    }
  };

  componentDidMount() {
    console.log(words);
    this.setState({
      wordList: words
    });
  }

  startNewGame = () => {
    this.setState({
      curWord: Math.floor(Math.random() * this.state.wordList.length),
      lifeLeft: 0,
      usedLetters: [],
      gameOver: false,
    });
  };

  render(){
    const {usedLetters, lifeLeft, gameOver} = this.state;
    const word = this.state.wordList[this.state.curWord];
    const displayWord = word
      .split('')
      .map((letter) => (usedLetters.includes(letter.toLowerCase()) ? letter : '_'))
      .join(' ');

    return(
      <div>
        <img src={pics[this.state.lifeLeft]} alt=''/>
        <button onClick={this.startNewGame}>New Game</button>
        <p>{displayWord}</p>
        <p>Lives Left: {pics.length - 1 - lifeLeft} </p>
        {!gameOver ? (
          <SingleLetterSearchbar onSearch={this.handleGuess} />
        ) : (
          <div>
            {lifeLeft === pics.length - 1 ? (
              <p>You lost! The word was: {word}</p>
            ) : (
              <p>You won!</p>
            )}
            <button onClick={this.startNewGame}>Play Again</button>
          </div>
        )}

        <div className="letter-boxes">
          <p>Used Letters:</p>
          {usedLetters.map((letter, index) => (
            <LetterBox
              key={index}
              letter={letter}
              isVisible={true}
              boxStyle={{ backgroundColor: 'lightblue' }}
              letterStyle={{ color: 'white', fontSize: '30px' }}
            />
          ))}
        </div>
      </div>
    )
  }

}



export default HangmanGame;