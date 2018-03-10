import React from 'react';
import { Redirect } from 'react-router-dom';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
import QRCode from 'qrcode-react';

class WelcomePage extends React.Component {
  componentDidMount() {
    GameStore.addChangeListener(this.onChange);
    GameActions.createGame();
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.forceUpdate();
  }

  startGame = (url) => {
       window.open(url, '_blank');
   };

  render() {
    if (GameStore.isConnected()) {
      return <Redirect to="/game" />;
    }
    const peerId = GameStore.getPeerId();
    if (!peerId) {
      return (
        <div className="container welcome">
          <div className="jumbotron">
            <h1 className="display-3">Battleship Board Game</h1>
              <p className="card-text"> Creating game...</p>
          </div>
        </div>
      );
    }
    const url = `http://localhost:3000/join/${GameStore.getPeerId()}`;
    return (
      <div className="container welcome">
        <div className="jumbotron">
          <h1 className="display-3">Battleship Board Game</h1>
            <p className="card-text">Waiting for a player... Scan the QR code to start the game</p>
            <QRCode value={url}/>
            <p>
              <a href={url} target="_blank" class="btn btn-success btn-lg active" role="button" aria-pressed="true">Let's Play</a>
            </p>
        </div>
      </div>
    );
  }
}

export default WelcomePage;
