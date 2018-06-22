import React,{Component} from "react";
import TemperatureInput from "./temperatureInput";



class Temperature extends Component{
    constructor(props){
        super(props);
        this.state = {
            scale:'c',
            temperature:37
        };
        this.scale={
            c:'Centigrade',
            f:'Fahrenheit'
        };
        this.changeHandle = this.changeHandle.bind(this);
    }

    changeHandle(e,type){
        this.setState({
            scale:type,
            temperature:e.target.value
        });
    }

    convert(){
        let type = this.state.type,
            temperature = this.state.temperature;
        if(!temperature){}
        if(type === 'c'){
            return (temperature*9/5+32).toFixed(2);
        }else{
            return ((temperature-32)*5/9).toFixed(2);
        }
    }

    render(){

        let type = this.state.scale;
        let cTemperature = (type === 'c')?this.state.temperature:this.convert(),
            fTemperature = (type === 'f')?this.state.temperature:this.convert();

        return (
            <div className="App">
                <TemperatureInput scale='c' temperature = {cTemperature} changeHandle={this.changeHandle}  />
                <TemperatureInput scale='f' temperature = {fTemperature} changeHandle={this.changeHandle}  />
                {cTemperature >= 100?'Water will boil':'Water does not boil'}
            </div>
        )
    }
}

export default Temperature;

