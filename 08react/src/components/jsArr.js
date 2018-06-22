import React, { Component } from 'react';

let names = ['jellen1','jellen2','jellen3'];

class Home extends Component {
    render() {
        return (
            <div className="App">
                <h2> use javascript (map) </h2>
                {
                    names.map((item,index)=>{
                        return <div key={index}> hello , {item} </div>
                    })
                }
            </div>
        );
    }
}

export default Home;