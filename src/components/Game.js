import React from 'react';

const Game = ({ game, resultChanged }) => {
    return (
        <div>
            <div class="center">
                <p>
                    <button onClick={(e) => {resultChanged(e, game.index, game.homeGoals + 1, game.awayGoals);}}>+</button>
                    <button onClick={(e) => {resultChanged(e, game.index, game.homeGoals - 1, game.awayGoals);}}>-</button>
                    &nbsp;{game.homeTeam} {game.homeGoals}-{game.awayGoals} {game.awayTeam}&nbsp;
                    <button onClick={(e) => {resultChanged(e, game.index, game.homeGoals, game.awayGoals + 1);}}>+</button>
                    <button onClick={(e) => {resultChanged(e, game.index, game.homeGoals, game.awayGoals - 1);}}>-</button>
                </p>
            </div>
        </div>
    );
}

export default Game;