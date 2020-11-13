import React from 'react';
import Topmenu from './Topmenu'
import ExpertsSection from './ExpertsSection';

export default function Home() {

    const example = [
        {label: 'My Games', dropItems: [{text: 'Current', link: '/current'}, {text: 'Past', link: '/past'}]},
        {label: 'Experts', dropItems: [{text: 'My Experts', link: '/myexperts'}, {text: 'Find Experts', link: '/findexperts'}]},
        {label: 'Current Games', dropItems: [{text: 'NFL', link: '/games/nfl'},
                                             {text: 'NBA', link: '/games/mlb'},
                                             {text: 'NHL', link: '/games/nhl'},
                                             {text: 'MLB', link: '/games/mlb'},
                                             {text: 'NCAAF', link: '/games/ncaaf'},
                                             {text: 'NCAAB', link: '/games/ncaab'}                               
                                            ]},
        {label: 'Community', dropItems: [{text: 'Top Picks', link: '/toppicks'},
                                         {text: 'Leaderboard', link: '/leaderboard'}
                                        ]}
    ]

    return (
        <div className="App">
            <Topmenu menuItems={example}/>
            <div>
                <ExpertsSection/>
            </div>
        </div>
      );
}