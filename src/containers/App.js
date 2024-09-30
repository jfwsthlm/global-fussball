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
        season.games.sort((a, b) => sortGames(a, b));
        this.state = {
            round: 0,
            tableMap: gameMap,
            games: season.games
        }
    }

    componentDidMount() {
        this.updateTable(this.state.games, false);
        this.getGamesFromApiAsync();
    }

    getGamesFromApiAsync = async () => {
        /*await fetch("http://localhost:4000/season/allsvenskan/2024")*/
        await fetch("https://global-fussball-api-0fec6a7cac42.herokuapp.com/season/allsvenskan/2024")
        .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            //this.setState((prevState, props) => ({
            //    games: data.games
            //}));
            this.updateTable(data.games, true);
            /*this.state = {
                round: 1,
                tableMap: gameMap,
                games: data.games
            }*/
        });
        //response.json().then((res) => console.log(res));
    }

    render() {
        const { round } = this.state;
        //const { tableMap } = this.state;
        const { games } = this.state;
        const filteredGames = games.filter(game => {
                return parseInt(game.round) === this.state.round;
        })
        return (
                <div className='tc'>
                    <h1 class="center info">Allsvenskan 2024</h1>
                    <SeasonTable tableMap={this.state.tableMap}/>
                    <RoundSelector round={round} decreaseRound={this.decreaseRound} increaseRound={this.increaseRound} />
                    <GameList games={filteredGames} resultChanged={this.resultChanged} isPlayedChanged={this.isPlayedChanged}/>
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
        const { games } = this.state;
        let updatedGames = games;
        if (homeGoals < 0) {
            homeGoals = 0;
        }
        if (awayGoals < 0) {
            awayGoals = 0;
        }
        if (homeGoals > 9) {
            homeGoals = 9;
        }
        if (awayGoals > 9) {
            awayGoals = 9;
        }
        updatedGames[gameIndex].homeGoals = homeGoals;
        updatedGames[gameIndex].awayGoals = awayGoals;
        updatedGames[gameIndex].isPlayed = "yes";
        this.setState((prevState, props) => ({
            games: updatedGames
        }));
        this.updateTable(updatedGames, false);
    }

    isPlayedChanged = (event, gameIndex, isPlayed) => {
        const { games } = this.state;
        let updatedGames = games;
        if (isPlayed ===  'yes' )
            updatedGames[gameIndex].isPlayed = "no";
        else
            updatedGames[gameIndex].isPlayed = "yes";
        this.setState((prevState, props) => ({
            games: updatedGames
        }));
        this.updateTable(updatedGames, false);
    }

    updateTable = (fetchedGames, setRound) => {
        const { round } = this.state;
        const gameMap = new Map();
        //const { games } = this.state;
        var roundMap = new Map();
        fetchedGames.forEach((game, index) => {
            //console.log("index: " + index);
            if (game.isPlayed === "yes")
            {
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
            } else {
                var gamesNotPlayedInRound = roundMap.get(game.round);
                if (!gamesNotPlayedInRound) {
                    gamesNotPlayedInRound = 1;
                } else {
                    gamesNotPlayedInRound = gamesNotPlayedInRound + 1;
                }
                roundMap.set(game.round, gamesNotPlayedInRound);
            }
        })
        
        var roundToView = round;
        console.log("roundToView: " + roundToView);
        if (setRound === true) {
            roundToView = getRoundWithMostUnplayedGames(roundMap);
            //roundToView = 7;
        }
        console.log("Looking at round: " + roundToView);
        fetchedGames.sort((a, b) => sortGames(a, b))
        this.setState((prevState, props) => ({
            round: roundToView,
            tableMap: gameMap,
            games: fetchedGames
        }));
        console.log(fetchedGames);
    }
}

function sortGames(a, b) {
    return a.index > b.index ? 1 : -1;
}

function getRoundWithMostUnplayedGames(roundMap) {
    var roundToReturn = 30;
    var noOfUnplayedGamesInRoundToReturn = 0;
    for (let [key, value] of roundMap) {
        console.log("Round: " + key + ", noOfUnplayedGames: " + value)
        if (value >= noOfUnplayedGamesInRoundToReturn && roundToReturn > key) {
            noOfUnplayedGamesInRoundToReturn = value;
            roundToReturn = key;
        }
    }
    return parseInt(roundToReturn);
}

export default App;
