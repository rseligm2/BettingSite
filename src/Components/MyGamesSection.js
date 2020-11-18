import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ScoreCard from './ScoreCard';

export default function MyGamesSection(props){

    const games = props.games //array of my games

    const exampleData = [
        {"teams": {
            "away": {"mascot": "Patriots",
                    "abbreviation": "NE",
                    "score": 7}
            ,
            "home": {"mascot": "Chiefs",
                    "abbreviation": "KC",
                    "score": 14}
        }},
        {"teams": {
            "away": {"mascot": "Falcons",
                    "abbreviation": "ATL",
                    "score": 0}
            ,
            "home": {"mascot": "Packers",
                    "abbreviation": "GB",
                    "score": 3}
        }}
    ]

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