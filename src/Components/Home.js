import React from 'react';
import Topmenu from './Topmenu'
import ExpertsSection from './ExpertsSection';
import MyGamesSection from './MyGamesSection';
import './Home.css';

export default function Home() {

    // const example = [
    //     {label: 'My Games', dropItems: [{text: 'Current', link: '/current'}, {text: 'Past', link: '/past'}]},
    //     {label: 'Experts', dropItems: [{text: 'My Experts', link: '/myexperts'}, {text: 'Find Experts', link: '/findexperts'}]},
    //     {label: 'Current Games', dropItems: [{text: 'NFL', link: '/games/nfl'},
    //                                          {text: 'NBA', link: '/games/mlb'},
    //                                          {text: 'NHL', link: '/games/nhl'},
    //                                          {text: 'MLB', link: '/games/mlb'},
    //                                          {text: 'NCAAF', link: '/games/ncaaf'},
    //                                          {text: 'NCAAB', link: '/games/ncaab'}                               
    //                                         ]},
    //     {label: 'Community', dropItems: [{text: 'Top Picks', link: '/toppicks'},
    //                                      {text: 'Leaderboard', link: '/leaderboard'}
    //                                     ]}
    // ]

    const exampleGames = [
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

    return (
        <div className="App">
            <div className="MidContent">
                <div className="ExpertsSection">
                    <ExpertsSection/>
                </div>
                <div className="MyGamesSection">
                    <MyGamesSection games={exampleGames} />
                </div>
            </div>
        </div>
      );
}