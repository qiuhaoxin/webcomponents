import React,{Component} from 'react';
import Tab from '../../src/components/tab';

export default class App extends Component{
	constructor(props){
		super(props);
		this.state={
			imgArr:[
			        {imgPath:require('./images/mobileImg.jpg'),imgName:'test'},
			        {imgPath:require('./images/mobileImg3.jpg'),imgName:'test'}
		    ],
		    tabArr:[{text:'首页',key:'mainpage',url:'/mainpage',index:0,activeElement:true},
	        {text:'部署',key:'deployment',url:'/deployment',index:1,activeElement:false},
	        {text:'应用',key:'apply',url:'/apply',index:2},
	        {text:'相关下载',key:'download',url:'/download',index:3,activeElement:false},
	        {text:'帮助',key:'help',url:'/help',index:4,activeElement:false}
	        ]
		}
	}
	render(){
		return (
	        <div>
	            <Tab tabArr={this.state.tabArr}></Tab>
	        </div>
		)
	}
}