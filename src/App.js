import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import gameService from './services/games'
import Game from './components/Game'

class App extends Component {
constructor(props) {
  super(props)
    this.state = {
      games: [],
      date: ''
    }
  }
async componentDidMount () { 
  //get yesterdays date to get the right content from api
  const yesterday = new Date()
  yesterday.setDate(yesterday.getUTCDate()-1)
  const date = yesterday.getFullYear()+ '-' + (yesterday.getMonth()+1) + '-' + yesterday.getDate()
  
  //console.log(date)

  //get the right dateform to be shown
  const showDate = yesterday.getDate() + '/' + (yesterday.getMonth()+1) + '/' + yesterday.getFullYear()
  this.setState({date: showDate})

  //get schedule/games from api
  const games = await gameService.getGames(date)
  if (games.data.dates[0]) {
   this.setState({games: games.data.dates[0].games})
  }
  //console.log(this.state.games, 'games')
}

render() {
  //link the right games' boxscore from nhl.com
  const gameUrl = (id) => `https://www.nhl.com/gamecenter/${id}/recap/box-score`

    return (
      <div className="App">
      <hr />
        <header className="App-header">
        <p>NHL HIGHLIGHTS</p>
          <img src={require(`./logos/NHL.png`)} className="App-logo" alt="logo" />
        </header>
        <hr />
          <div className="container">
            <div className="row">
            <div className="date">{this.state.date}</div>
            <hr />
              {this.state.games.map(game => 
                  <Game 
                    game={game}
                    key={game.gamePk}
                    expand={this.expand}
                    gameUrl={gameUrl}
                  />
                  )}
                  <hr />
            </div>
            <p className="copyright">NHL and the NHL Shield are registered trademarks of the National Hockey League. NHL and NHL team marks are the property of the NHL and its teams. © NHL 2018. All Rights Reserved.</p>
          </div>
      </div>
    );
  }
}
 
export default App;
