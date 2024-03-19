import React from 'react';
                //games played, games won, games drawn, games lost, goals done, goals conceeded, points

const TableRow = ({ theteam/*, points*/ }) => {
    return (
        <div class="center">
                <p>{theteam[0]} {theteam[1][0]} {theteam[1][1]} {theteam[1][2]} {theteam[1][3]} {theteam[1][4]}-{theteam[1][5]} {theteam[1][6]}</p>
        </div>
    );
}

export default TableRow;