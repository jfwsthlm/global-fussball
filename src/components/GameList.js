import React from 'react';
import Game from './Game';

const GameList = ({ games, resultChanged, isPlayedChanged }) => {
    return (
        <div class="gamebackbackground">
            {
                games.map((game) => {
                    return (
                        <Game game={game} resultChanged={resultChanged} isPlayedChanged={isPlayedChanged}/>
                    );
                })
            }
        </div>
    );
}

export default GameList;