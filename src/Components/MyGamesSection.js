import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ScoreCard from './ScoreCard';

export default function MyGamesSection(props){

    const games = props.games //array of my games, example in Home.js


    return(
        <div>
            <header>
                <h4>My Games</h4>
            </header>
            <List>
                {games.map((item, i) =>(
                    <ListItem>
                        <ScoreCard game={item} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}