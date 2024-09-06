import React from 'react';
                //games played, games won, games drawn, games lost, goals done, goals conceeded, points

const TableRow = ({ theteam, index }) => {
    var positionIndex = "position" + index;
    return (
        <tr class={positionIndex}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<td class="position">{index}.</td>&nbsp;&nbsp;<td class="team">{theteam[0]}</td><td class="gameandpoint">{theteam[1][0]}</td><td class="gameandpoint">{theteam[1][1]}</td><td class="gameandpoint">{theteam[1][2]}</td><td class="gameandpoint">{theteam[1][3]}</td><td class="goalsmade">{theteam[1][4]}</td><td class="separator">-</td><td class="goalsconceeded">{theteam[1][5]}</td><td class="gameandpoint">{theteam[1][6]}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </tr>
    );
}

export default TableRow;