import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const RoundSelector = ({ round, decreaseRound, increaseRound }) => {
    console.log("Round: " + round);
    return (
        <div class="center roundSelector">
            <button class="arrow goalButton" onClick={decreaseRound}><FaArrowLeft size={20}/></button>
            &nbsp;&nbsp;Omgång {round}&nbsp;&nbsp;
            <button class="arrow goalButton" onClick={increaseRound}><FaArrowRight size={20}/></button>
        </div>
    );
}

export default RoundSelector;