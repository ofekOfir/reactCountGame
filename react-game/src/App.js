import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React from 'react';
import './App.css';
import Player from './player';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [] }
  }
  createPlayer() {
    let players = this.state.players;
    let count = 0;
    for (let i in players) {
      if (players[i].gameOn) {
        count++;
      }
    }
    if (count == 0) {
      let name = prompt("insert name");
      players.push({ name: name, gameOn: false, steps: 0, currentNum: 0, prevScores: [], myTurn: false });
      this.setState({ players });
    }
  }

  deletePlayer(index) {
    let players = this.state.players;
    if (!players[index].gameOn) {
      players.splice(index, 1);
      this.setState({ players });
    }
  }

  mathAct(event, index) {
    let players = this.state.players;
    if (!players[index].gameOn && event.target.value === "start") {
      players[index].gameOn = true;
      players[index].currentNum = Math.floor(Math.random() * 101);
      players[index].myTurn=this.checkTurn();
      console.log(players[index].myTurn)
    }
    else if (players[index].gameOn && event.target.value !== "start" && players[index].myTurn) {
      this.changeTurn(index);
      if (event.target.value == "/2") {
        players[index].currentNum /= 2;
      }
      else if (event.target.value == "+1") {
        players[index].currentNum += 1;
      }
      else if (event.target.value == "-1") {
        players[index].currentNum -= 1;
      }
      else if (event.target.value == "*2") {
        players[index].currentNum *= 2;
      }
      players[index].steps++;
      if (players[index].currentNum == 100) {
        players[index].gameOn = false;
        players[index].myTurn = false;
        players[index].prevScores.push(players[index].steps);
        players[index].steps = 0;
      }
    }
    this.setState({ players })
  }
  checkTurn(){
    let players = this.state.players;
    for (let i in players) {
      if (players[i].myTurn) {
        return false;
      }
    }
    return true;
  }
  changeTurn(index) {

      for (let i = index; i < this.state.players.length; i++) {
        if (this.state.players[i].gameOn &&this.state.players[index].myTurn) {
          this.state.players[index].myTurn = false;
          this.state.players[i].myTurn = true;
        }
      }
        for (let i = 0; i < index; i++) {
          if (this.state.players[i].gameOn && this.state.players[index].myTurn) {
          this.state.players[index].myTurn = false;
          this.state.players[i].myTurn = true;
          }
        }
      
    
  }
  render() {
    let content = this.state.players.map((player, index) => { return <Player key={this.state.players[index]} deletePlayer={() => this.deletePlayer(index)} mathFunc={(event) => this.mathAct(event, index)} player={player} /> })
    return (<div>
      <button id="addPlayer" onClick={() => this.createPlayer()}>add player</button>
      {content}
    </div>)
  }
}

export default App;
