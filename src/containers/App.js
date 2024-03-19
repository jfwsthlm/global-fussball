import React, { Component } from 'react';
import './App.css';
import GameList from '../components/GameList';
import RoundSelector from '../components/RoundSelector';
import SeasonTable from '../components/SeasonTable';
import season from './matcher.json';

class App extends Component {
    constructor() {
        super()
        const gameMap = new Map();
        season.games.forEach((game, index) =>
            {
                if(!gameMap.has(game.homeTeam)) {
                    //games played, games won, games drawn, games lost, goals done, goals conceeded, points
                    gameMap.set(game.homeTeam, [0, 0, 0, 0, 0, 0, 0])
                }
                season.games[index].index = index;
            })
        this.state = {
            round: 1,
            tableMap: gameMap,
            games: season.games
        }
    }

    componentDidMount() {
        this.updateTable();
    }

    render() {
        const { round } = this.state;
        const { tableMap } = this.state;
        const { games } = this.state;
        const filteredGames = games.filter(game => {
                return parseInt(game.round) === this.state.round;
        })
        return (
                <div className='tc'>
                    <h1 class="center">global fussball</h1>
                    <SeasonTable tableMap={tableMap}/>
                    <RoundSelector round={round} decreaseRound={this.decreaseRound} increaseRound={this.increaseRound} />
                    <GameList games={filteredGames} resultChanged={this.resultChanged} />
                </div>
            );
    }

    decreaseRound = () => {
        const { round } = this.state;
        if (round !== 1) {
            this.setState((prevState, props) => ({
                round: prevState.round - 1
            }));
        }
    }

    increaseRound = () => {
        const { round } = this.state;
        if (round !== 30) {
            this.setState((prevState, props) => ({
                round: prevState.round + 1
            }));
        }
    }

    resultChanged = (event, gameIndex, homeGoals, awayGoals) => {
        season.games[gameIndex].homeGoals = homeGoals;
        season.games[gameIndex].awayGoals = awayGoals;
        this.setState((prevState, props) => ({
            games: season.games
        }));
        this.updateTable();
    }

    updateTable = () => {
        const gameMap = new Map();
        const { games } = this.state;
        games.forEach((game, index) => {
            console.log("index: " + index);
            let homeTeamList = [0, 0, 0, 0, 0, 0, 0];
            let awayTeamList = [0, 0, 0, 0, 0, 0, 0];
            if(gameMap.has(game.homeTeam)) {
                homeTeamList = gameMap.get(game.homeTeam)
            }
            if(gameMap.has(game.awayTeam)) {
                awayTeamList = gameMap.get(game.awayTeam)
            }
            //games played, games won, games drawn, games lost, goals done, goals conceeded, points
            homeTeamList[0] ++;
            awayTeamList[0] ++;
            
            homeTeamList[4] += game.homeGoals;
            awayTeamList[5] += game.homeGoals;

            awayTeamList[4] += game.awayGoals;
            homeTeamList[5] += game.awayGoals;

            if(game.homeGoals > game.awayGoals) {
                homeTeamList[6] += 3;
                homeTeamList[1] ++;
                awayTeamList[3] ++;
            } else if(game.awayGoals > game.homeGoals) {
                awayTeamList[6] += 3;
                awayTeamList[1] ++;
                homeTeamList[3] ++;
            } else {
                homeTeamList[6] += 1;
                awayTeamList[6] += 1;
                awayTeamList[2] ++;
                homeTeamList[2] ++;
            }

            gameMap.set(game.homeTeam, homeTeamList)
            gameMap.set(game.awayTeam, awayTeamList)
            this.setState((prevState, props) => ({
                tableMap: gameMap
            }));

        })
    }

}


export default App;
