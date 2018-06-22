import React,{ Component } from "react";

class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {
            date:new Date()
        }
    }

    componentDidMount(){
        console.log("this.timer",this.timer);
        this.timer = setInterval(()=>{
            console.log('tick');
            this.setState({
                date:new Date()
            })
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render(){
        return (
            <div className="App">
                <h2>时钟</h2>
                { this.state.date.toLocaleString() }
            </div>
        )
    }
}

export default Clock;