import React from 'react';
import Game from './Game';

const GameList = ({ games, resultChanged, isPlayedChanged, saveResult }) => {
    return (
        <div class="gamebackbackground">
            {
                games.map((game) => {
                    return (
                        <Game game={game} resultChanged={resultChanged} isPlayedChanged={isPlayedChanged} saveResult={saveResult}/>
                    );
                })
            }
        </div>
    );
}

export default GameList;