import React,{Component} from 'react';
import Carouset from '../../src/components/carouset';
import ImgText from '../../src/components/imgText';

export default class App extends Component{
	constructor(props){
		super(props);
		this.state={
		    tabArr:[
		       {imgPath:require('./images/book.png'),title:'移动云管理平台介绍及部署',desc:'系统了解系统框架，快速部署安装',clickMethod:this.handleClick},
               {imgPath:require('./images/robot.png'),title:'K/3移动应用介绍',desc:'超20+移动应用资料，详尽掌握',clickMethod:this.handleClick},
               {imgPath:require('./images/sock.png'),title:'轻应用依赖模块说明',desc:'各轻应用对应K/3应用模块及版本说明',clickMethod:this.handleClick},

               {imgPath:require('./images/fang.png'),title:'定制化应用开发手册',desc:'满足企业个性化应用需求，随心所欲',clickMethod:this.handleClick},
               {imgPath:require('./images/lock.png'),title:'轻应用权限说明',desc:'灵活的应用权限控制，聚焦角色场景',clickMethod:this.handleClick},
               {imgPath:require('./images/home.png'),title:'报表核算项目数据授权说明',desc:'直接SQL报表中进行核算项目数据授权控制',clickMethod:this.handleClick}
	        ]
		}
		this.handleClick=this.handleClick.bind(this)
	}
	handleClick=()=>{

	}
	render(){
		return (
	        <div>

	            <ImgText dataSource={this.state.tabArr}/>
	        </div>
		)
	}
}
/*
*	            <Carouset dataSource={this.state.imgArr}></Carouset>
*/