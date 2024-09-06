import React from 'react';
import TableRow from '../components/TableRow';

const SeasonTable = ({ tableMap }) => {
    var tableMapArray = Array.from(tableMap.entries());
    console.log("tableMapArray: " + tableMapArray);
    return (
        <div class="seasontablebackground">
            <div class="seasontable">
                <table class="center seasontable">
                {
                    tableMapArray
                        .sort((a, b) => sortTable(a, b))
                        .map((name, index) => (<TableRow theteam={name} index={index + 1}/>))
                }
                </table>
            </div>
        </div>
    );

}

function sortTable(a, b) {
    if ((a[1][6]) !== (b[1][6])) {
        return a[1][6] < b[1][6] ? 1 : -1;
    }
    return ((a[1][4]) - (a[1][5])) < ((b[1][4]) - (b[1][5])) ? 1 : -1;
}

export default SeasonTable;



