import React from 'react';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

const Game = ({ game, resultChanged, isPlayedChanged, saveResult }) => {
    var checked = "";
    var gameClassName = "gamenotplayed";
    if (game.isPlayed === 'yes') {
        checked = "checked";
        gameClassName = "game";
    }
    return (
        <div className='gamebackground' onClick={(e) => {saveResult(e, game.index, game.homeGoals, game.awayGoals, game.isPlayed);}}>
            <div className={gameClassName}>
                <div className='checkbox'>
                    spelad
                    <input type="checkbox" checked={checked} onClick={(e) => {isPlayedChanged(e, game.index, game.isPlayed);}} className="check"/>
                </div>
                <div className='leftside'>
                    {game.homeTeam}&nbsp;
                    <button class="goalButton" onClick={(e) => {resultChanged(e, game.index, game.homeGoals + 1, game.awayGoals);}}><FaChevronUp /></button>
                    <button class="goalButton" onClick={(e) => {resultChanged(e, game.index, game.homeGoals - 1, game.awayGoals);}}><FaChevronDown /></button>
                    &nbsp;{game.homeGoals}
                </div>
                <div className='middle'>-</div>
                <div className='rightside'>
                    {game.awayGoals}&nbsp;
                    <button class="goalButton" onClick={(e) => {resultChanged(e, game.index, game.homeGoals, game.awayGoals + 1);}}><FaChevronUp /></button>
                    <button class="goalButton" onClick={(e) => {resultChanged(e, game.index, game.homeGoals, game.awayGoals - 1);}}><FaChevronDown /></button>
                    &nbsp;{game.awayTeam}
                </div>
            </div>
        </div>
    );
}

export default Game;