import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function GamesScoreCard(props){

    const exampleGameData = require('../../examplenhl2.json');
    const game = exampleGameData.results[0];

    const date = new Date(game.schedule.date)

    let hr = date.getHours();
    let min = date.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    let ampm = "am";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }

    return(
        <Table>
            <TableBody>

            </TableBody>
        </Table>
    )
}