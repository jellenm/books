import React , { Component } from "react";

class TemperatureInput extends Component{

    constructor(props){
        super(props);

        this.scale={
            c:'Centigrade',
            f:'Fahrenheit'
        }
    }

    render(){
        let scaleType = this.props.scale,
            temperature = this.props.temperature;

        return(
            <div className="temperatureInput">
                <label > { this.scale[scaleType] } </label>
                <input type="number" placeholder='输入温度' value={temperature}  onChange={(e)=>{ this.props['changeHandle'](e,scaleType) }} />
            </div>
        )
    }
}

export default TemperatureInput;