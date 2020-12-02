import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function TodayGamesCard(props){
    const game = props.game //game info

    const getTime = () =>{
        let timezoneOffset = (new Date()).getTimezoneOffset();
        let gameTime = new Date(game.schedule.date)
        let adjustedGameTime = (gameTime.getHours() - timezoneOffset)
        return  

    }

    const homeOpenSpread = game.odds[0].spread.open.home
    const homeOpenOdds = game.odds[0].spread.open.homeOdds
    const homeMoneylineOdds = game.odds[0].moneyline.open.homeOdds

    const awayOpenSpread = game.odds[0].spread.open.away
    const awayOpenOdds = game.odds[0].spread.open.awayOdds
    const awayMoneylineOdds = game.odds[0].moneyline.open.awayOdds

    const gameOpenTotal = game.odds[0].total.open.total
    const gameOpenOverOdds = game.odds[0].total.open.gameOpenOverOdds
    const gameOpenUnderOdds = game.odds[0].total.open.gameOpenUnderOdds

    if(game.status === "scheduled"){
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
}