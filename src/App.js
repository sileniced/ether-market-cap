import React, { Component } from 'react';
import Page from './components/Page';
import NavBar from './components/NavBar';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Route exact path={'/'} component={Page} />
                    <Route exact path={'/:address'} component={Page} />
                </div>
            </Router>
        );
    }
}

export default App;
