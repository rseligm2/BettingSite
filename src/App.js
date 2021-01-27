import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Home from './Components/Home.js';
import GamesMenu from './Components/GamesMenu';
import Topmenu from './Components/Topmenu'


function App() {

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
      <Router>
          <Topmenu menuItems={example}/>
          <Switch>
              <Route path='/games' component={withRouter(GamesMenu)}/>
              <Route exact path='/'>
                <div className="App">
                    <Home/>
                </div>
            </Route>
        </Switch>
      </Router>
  );
}

export default App;
