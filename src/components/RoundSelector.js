import React from 'react';

const RoundSelector = ({ round, decreaseRound, increaseRound }) => {
    console.log("Round: " + round);
    return (
        <div class="center">
            <button onClick={decreaseRound}>&lt;</button>
            {round}
            <button onClick={increaseRound}>&gt;</button>
        </div>
    );
}

export default RoundSelector;