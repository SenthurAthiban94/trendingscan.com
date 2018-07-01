import React,{Component} from 'react';
import './../assets/css/ad.css';

class Ad extends Component{
    render(){
        return(
            <div className={this.props.position}>
                {this.props.content}
            </div>
        )
    }
}

export default Ad;