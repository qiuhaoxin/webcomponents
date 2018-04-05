import React,{Component} from 'react';
import Carouset from '../../src/components/carouset';

export default class App extends Component{
	constructor(props){
		super(props);
		this.state={
			imgArr:[
			        {imgPath:require('./images/mobileImg.jpg'),imgName:'test'},
			        {imgPath:require('./images/mobileImg3.jpg'),imgName:'test'}
				   ]
		}
	}
	render(){
		return (
	        <div>
	            <Carouset dataSource={this.state.imgArr}></Carouset>
	        </div>
		)
	}
}