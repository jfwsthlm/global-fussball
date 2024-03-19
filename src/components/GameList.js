import React from 'react';
import Game from './Game';

const GameList = ({ games, resultChanged }) => {
    return (
        <div>
            {
                games.map((game) => {
                    return (
                        <Game game={game} resultChanged={resultChanged}/>
                    );
                })
            }
        </div>
    );
}

export default GameList;