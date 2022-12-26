import React from'react';


class Player extends React.Component {
    render(){
        let po=this.props.player.prevScores.join(',')
      return (<div className="player" style={this.props.player.myTurn ? {backgroundColor:"green"}:{backgroundColor:"red"}}>
        <h3>{this.props.player.name}</h3>
        <button id="start" value="start" onClick={this.props.mathFunc}>start</button>
        <p>Current Number: {this.props.player.currentNum}</p>
        <p>steps: {this.props.player.steps}</p>
        <div id='mathDiv'><button value="/2" onClick={this.props.mathFunc}>/2</button>
        <button value="*2" onClick={this.props.mathFunc}>*2</button>
        <button value="-1" onClick={this.props.mathFunc}>-1</button>
        <button  value="+1" onClick={this.props.mathFunc}>+1</button></div>  
        <p>all scores: {po}</p>
        <button id="quit" value="quit" onClick={this.props.deletePlayer}>quit</button>
      </div>)
    }
}

export default Player;