import React from 'react';
import Board from './Board.react';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';


class GamePage extends React.Component {
  state = {
    chatMessage: '',
  };

  componentDidMount() {
    GameStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.forceUpdate();
  }

  sendChat = (e) => {
    e.preventDefault();
    GameActions.sendMessage(this.state.chatMessage);
    this.setState({ chatMessage: '' });
  }

  render() {
    const gameState = GameStore.getGameState();
    let banner = gameState.phase;
    if (gameState.phase === 'setup') {
        banner = 'Place your Ships on the Board size of 3';
    }
    if (gameState.phase === 'play') {
      let turn = 'Your Turn';
      if (!gameState.myTurn) {
        turn = 'Other Player Turn';
      }
      banner = turn;
    } else if (gameState.phase === 'finished') {
      if (gameState.winner) {
        banner = 'You won!';
      } else {
        banner = 'You lost!';
      }
    }
    return (
      <div className="container-fluid">
          <h1>Battleship - {banner}</h1>
          <div className="row">
            <div className="col-md-6">
              <h3>You</h3>
              <Board phase={gameState.phase} me />
            </div>
            <div className="col-md-6">
              <h3>Other Player</h3>
              <Board />
            </div>
          </div>
          <form onSubmit={e => e.preventDefault}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Start Chating :P</span>
              </div>
              <input type="text" className="form-control" value={this.state.chatMessage} onChange={e => this.setState({ chatMessage: e.target.value })} />
              <button onClick={this.sendChat} type="submit" type="button" className="btn btn-secondary">hit</button>
          </div>
          </form>
      </div>
    );
  }
}

export default GamePage;
