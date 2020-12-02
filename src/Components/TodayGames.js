import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export default function TodayGames(props){
    const games = props.games //array of my games, example in Home.js

    return(
        <div>
            <header>
                <h4>Today's Games</h4>
            </header>
            <List>
                {games.map((item, i) =>(
                    <ListItem key = {i}>
                        <ScoreCard game={item} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}