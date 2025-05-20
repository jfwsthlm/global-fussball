import React, { Component } from 'react';
import './App.css';
import GameList from '../components/GameList';
import RoundSelector from '../components/RoundSelector';
import SeasonTable from '../components/SeasonTable';
import season from './matcher.json';
import SeasonSelector from '../components/SeasonSelector';

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
            games: season.games,
            seasonId: 2
        }
    }

    componentDidMount() {
        this.updateTable(this.state.games, false);
        this.getGamesFromApiAsync(this.state.seasonId);
    }

    getGamesFromApiAsync = async (theSeasonId) => {
        /*await fetch("http://localhost:4000/season/" + theSeasonId)*/
        await fetch("https://global-fussball-api-0fec6a7cac42.herokuapp.com/season/" + theSeasonId)
        .then((res) => {
            return res.json();
          })
          .then((data) => {
            this.updateTable(data.games, true);
        });
    }

    render() {
        const { round } = this.state;
        const { games } = this.state;
        const filteredGames = games.filter(game => {
                return parseInt(game.round) === this.state.round;
        })
        return (
                <div className='tc'>
                    <SeasonSelector seasonId={this.state.seasonId} setSeason={this.setSeason}/>
                    <SeasonTable tableMap={this.state.tableMap}/>
                    <RoundSelector round={round} decreaseRound={this.decreaseRound} increaseRound={this.increaseRound} />
                    <GameList games={filteredGames} resultChanged={this.resultChanged} isPlayedChanged={this.isPlayedChanged} saveResult={this.saveResult} />
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

    setSeason = (newSeasonId) => {
        const { seasonId } = this.state;
        console.log("newSeasonId: " + newSeasonId);
        console.log("oldSeasonId: " + seasonId);
        if (seasonId !== newSeasonId) {
            this.setState((prevState, props) => ({
                seasonId: newSeasonId
            }));
            this.getGamesFromApiAsync(newSeasonId);
        }
    }

    saveResult = (event, gameIndex, homeGoals, awayGoals, isPlayed) => {
        if (event.ctrlKey) {
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
            updatedGames[gameIndex].isPlayed = isPlayed;
            this.setState((prevState, props) => ({
                games: updatedGames
            }));
            this.updateTable(updatedGames, false);
            console.log("Saving game " + gameIndex);
            
            /*fetch('http://localhost:4000/update', {*/
            fetch('https://global-fussball-api-0fec6a7cac42.herokuapp.com/update', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    homeTeam: updatedGames[gameIndex].homeTeam,
                    awayTeam: updatedGames[gameIndex].awayTeam,
                    homeGoals: updatedGames[gameIndex].homeGoals,
                    awayGoals: updatedGames[gameIndex].awayGoals,
                    isPlayed: updatedGames[gameIndex].isPlayed,
                    seasonId: this.state.seasonId
                })
            }).then(response => response.json())
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
        var roundMap = new Map();
        fetchedGames.forEach((game, index) => {
            if(!gameMap.has(game.homeTeam)) {
                //games played, games won, games drawn, games lost, goals done, goals conceeded, points
                gameMap.set(game.homeTeam, [0, 0, 0, 0, 0, 0, 0])
            }
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
        if (setRound === true) {
            roundToView = getRoundWithMostUnplayedGames(roundMap);
        }
        fetchedGames.sort((a, b) => sortGames(a, b))
        this.setState((prevState, props) => ({
            round: roundToView,
            tableMap: gameMap,
            games: fetchedGames
        }));
    }
}

function sortGames(a, b) {
    return a.index > b.index ? 1 : -1;
}

function getRoundWithMostUnplayedGames(roundMap) {
    var roundToReturn = 30;
    var noOfUnplayedGamesInRoundToReturn = 0;
    for (let [key, value] of roundMap) {
        if (value >= noOfUnplayedGamesInRoundToReturn && roundToReturn > key) {
            noOfUnplayedGamesInRoundToReturn = value;
            roundToReturn = key;
        }
    }
    return parseInt(roundToReturn);
}

export default App;
