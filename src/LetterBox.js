import React from 'react';

class LetterBox extends React.Component {
  render() {
    const { letter, isVisible, boxStyle, letterStyle } = this.props;

    const defaultBoxStyle = {
      display: 'inline-block',
      border: '1px solid black',
      width: '50px',
      height: '50px',
      textAlign: 'center',
      lineHeight: '50px', 
      fontSize: '24px',
      fontWeight: 'bold',
    };
    
    const defaultLetterStyle = {
      visibility: isVisible ? 'visible' : 'hidden',
    };

    const combinedBoxStyle = { ...defaultBoxStyle, ...boxStyle };
    const combinedLetterStyle = { ...defaultLetterStyle, ...letterStyle };

    return (
      <div style={combinedBoxStyle}>
        <span style={combinedLetterStyle}>{letter}</span>
      </div>
    );
  }
}

export default LetterBox;