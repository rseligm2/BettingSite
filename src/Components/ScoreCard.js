import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


export default function ScoreCard(props){

    const game = props.game //game info

    //need to add team logo and time into game
    return(
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>{game.teams.away.abbreviation} {game.teams.away.mascot}</TableCell>
                    <TableCell>{game.teams.away.score}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{game.teams.home.abbreviation} {game.teams.home.mascot}</TableCell>
                    <TableCell>{game.teams.home.score}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )

}