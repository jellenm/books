import React  from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from "./components/home"
import JsArr from "./components/jsArr"
import Clock from "./components/clock"
import Temperature from "./components/temperature/temperature"

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/jsArr' component={JsArr}/>
            <Route path='/clock' component={Clock}/>
            <Route path='/temperature' component={Temperature}/>
        </Switch>
    </main>
)
export default Main;