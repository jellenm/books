import React, { Component } from 'react';
import {Link} from "react-router-dom";

let routerLists = [
    <Link to="/clock" key='1'>官网clock实例</Link>,
    <Link to="/temperature" key='3'>官网temperature实例</Link>,
    <Link to="/jsArr" key='2'>jsArr</Link>,
];
class Home extends Component {
  render() {
    return (
      <div className="App">
        {
            routerLists
        }
      </div>
    );
  }
}

export default Home;