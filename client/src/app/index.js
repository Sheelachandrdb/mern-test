import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { UsersList, UsersInsert } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/user/list" exact component={UsersList} />
                <Route path="/user/create" exact component={UsersInsert} />
            </Switch>
        </Router>
    )
}

export default App