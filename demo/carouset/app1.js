import React,{Component} from 'react';
import Carouset from '../../src/components/carouset';
import Tab from '../../src/components/tab';
import ImgText from '../../src/components/imgText';
import Line from '../../src/components/line';
import download from '../imgText/images/download.png';
import Modal from '../../src/components/modal';
import DropDown from '../../src/components/dropDown';

import Masker from '../../src/components/masker';
import Select from '../../src/components/select';
import {getProvince,getCity} from './data/province';

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
	        ],
	        imgTabArr:[
		       {imgPath:require('../imgText/images/book.png'),title:'移动云管理平台介绍及部署',desc:'系统了解系统框架，快速部署安装',clickMethod:this.handleClick},
               {imgPath:require('../imgText/images/robot.png'),title:'K/3移动应用介绍',desc:'超20+移动应用资料，详尽掌握',clickMethod:this.handleClick},
               {imgPath:require('../imgText/images/sock.png'),title:'轻应用依赖模块说明',desc:'各轻应用对应K/3应用模块及版本说明',clickMethod:this.handleClick},
	        ],
	        imgTabArr2:[
               {imgPath:require('../imgText/images/fang.png'),title:'定制化应用开发手册',desc:'满足企业个性化应用需求，随心所欲',clickMethod:this.handleClick},
               {imgPath:require('../imgText/images/lock.png'),title:'轻应用权限说明',desc:'灵活的应用权限控制，聚焦角色场景',clickMethod:this.handleClick},
               {imgPath:require('../imgText/images/home.png'),title:'报表核算项目数据授权说明',desc:'直接SQL报表中进行核算项目数据授权控制',clickMethod:this.handleClick}
	        ],
	        imgTabArr3:[
               {imgPath:require('../imgText/images/wenhao.png'),title:'云管理平台部署及使用常见问题',desc:'IIS配置、网络端口异常、ASP.NET异常等'},
               {imgPath:require('../imgText/images/wenhao.png'),title:'云平台第一步连接数据库问题',desc:'账套管理、数据库相关配置等'},
               {imgPath:require('../imgText/images/wenhao.png'),title:'云平台第二步内网连接不通问题',desc:'站点配置、权限设置、网络选择等'},
	        ],
	        imgTabArr4:[
               {imgPath:require('../imgText/images/help1.png'),title:'云管理平台配置讲解视频教程',desc:'',
               render:()=><div className='help-vidiu'><span><img src={require('../imgText/images/clock.png')}/>2016-08-05</span><span><img src={require('../imgText/images/eye.png')}/>168</span></div>},
               {imgPath:require('../imgText/images/help2.png'),title:'轻应用待办消息配置视频教程',desc:'',
               render:()=><div className='help-vidiu'><span><img src={require('../imgText/images/clock.png')}/>2016-08-05</span><span><img src={require('../imgText/images/eye.png')}/>168</span></div>
               },
               {imgPath:require('../imgText/images/help3.png'),title:'轻应用移动审批配置视频教程',desc:'', 
               render:()=><div className='help-vidiu'><span><img src={require('../imgText/images/clock.png')}/>2016-08-05</span><span><img src={require('../imgText/images/eye.png')}/>168</span></div>},
               {imgPath:require('../imgText/images/help4.png'),title:'轻应用移动报销配置视频教程',desc:'',
               render:()=><div className='help-vidiu'><span><img src={require('../imgText/images/clock.png')}/>2016-08-05</span><span><img src={require('../imgText/images/eye.png')}/>168</span></div>},
	        ],
	        imgTabArr5:[
               {imgPath:require('../imgText/images/help5.png'),title:'轻应用移动下单配置视频教程',desc:'',
               render:()=><div className='help-vidiu'><span><img src={require('../imgText/images/clock.png')}/>2016-08-05</span><span><img src={require('../imgText/images/eye.png')}/>168</span></div>},
               {imgPath:require('../imgText/images/help6.png'),title:'轻应用订单跟踪配置视频教程',desc:'',
               render:()=><div className='help-vidiu'><span><img src={require('../imgText/images/clock.png')}/>2016-08-05</span><span><img src={require('../imgText/images/eye.png')}/>168</span></div>},
               {imgPath:require('../imgText/images/help3.png'),title:'轻应用应收款管理配置视频教程',desc:'',
               render:()=><div className='help-vidiu'><span><img src={require('../imgText/images/clock.png')}/>2016-08-05</span><span><img src={require('../imgText/images/eye.png')}/>168</span></div>},
               {imgPath:'',title:'',desc:''},
	        ],
	        imgTabArr6:[
               {imgPath:require('../imgText/images/package.png'),title:'云之家',desc:'最新版本:V9',
               render:()=><div className='download-dl'><span onMouseEnter={this.handleDownloadMouseOver} onMouseLeave={this.handleDownloadMouseout}><img src={download}/>立即下载</span></div>},
               {imgPath:require('../imgText/images/package.png'),title:'移动云管理平台',desc:'最新版本：V14.3.11.0',
               render:()=><div className='download-dl'><span><img src={download}/>立即下载</span></div>},
               {imgPath:require('../imgText/images/package.png'),title:'K/3WISE补丁',desc:'持续更新',
               render:()=><div className='download-dl'><span><img src={download}/>立即下载</span></div>},
	        ],
	        imgTabArr7:[
               {imgPath:require('../imgText/images/dl_print.png'),title:'移动报销打印服务助手（免安装）',desc:'云之家移动报销中打印单据需要使用打印助手',
               innerRender:()=><div className='download-time'><span>更新日期</span><span>2018-05-12</span><span>下载次数</span><span>271</span></div>,
               render:()=><div className='download-dl'><span>下载</span></div>},
               {imgPath:require('../imgText/images/dl_package.png'),title:'移动审核组件调用异常解决方案',desc:'解决移动审批组件调用异常的问题',
               innerRender:()=><div className='download-time'><span>更新日期</span><span>2018-05-12</span><span>下载次数</span><span>271</span></div>,
               render:()=><div className='download-dl'><span>下载</span></div>},
	        ],
	        imgTabArr8:[
               {imgPath:require('../imgText/images/dl_play.png'),title:'K3WISE云管理平台配置讲解视频教程.mp4',desc:'',
               innerRender:()=><div className='download-time'><span>更新日期</span><span>2018-05-12</span><span>下载次数</span><span>271</span></div>,
               render:()=><div className='download-dl'><span>下载</span></div>},
               {imgPath:require('../imgText/images/dl_play.png'),title:'K3WISE轻应用待办消息配置视频教程.mp4',desc:'',
               innerRender:()=><div className='download-time'><span>更新日期</span><span>2018-05-12</span><span>下载次数</span><span>271</span></div>,
               render:()=><div className='download-dl'><span>下载</span></div>},
	        ],
	        imgTabArr9:[
               {imgPath:require('../imgText/images/dl_play.png'),title:'K3WISE轻应用移动审批配置视频教程.mp4',desc:'',
               innerRender:()=><div className='download-time'><span>更新日期</span><span>2018-05-12</span><span>下载次数</span><span>271</span></div>,
               render:()=><div className='download-dl'><span>下载</span></div>},
               {imgPath:require('../imgText/images/dl_play.png'),title:'K3WISE轻应用移动报销配置视频教程.mp4',desc:'',
               innerRender:()=><div className='download-time'><span>更新日期</span><span>2018-05-12</span><span>下载次数</span><span>271</span></div>,
               render:()=><div className='download-dl'><span>下载</span></div>},
	        ],
	        imgTabArr10:[
               {imgPath:require('../imgText/images/dl_play.png'),title:'K3WISE轻应用移动下单配置视频教程.mp4',desc:'',
               innerRender:()=><div className='download-time'><span>更新日期</span><span>2018-05-12</span><span>下载次数</span><span>271</span></div>,
               render:()=><div className='download-dl'><span>下载</span></div>},
               {imgPath:require('../imgText/images/dl_play.png'),title:'K3WISE轻应用订单跟踪配置视频教程.mp4',desc:'',
               innerRender:()=><div className='download-time'><span>更新日期</span><span>2018-05-12</span><span>下载次数</span><span>271</span></div>,
               render:()=><div className='download-dl'><span>下载</span></div>},
	        ],
	        imgTabArr11:[
               {imgPath:require('../imgText/images/dl_play.png'),title:'K3WISE轻应用应收款管理配置视频教程.mp4',desc:'',
               innerRender:()=><div className='download-time'><span>更新日期</span><span>2018-05-12</span><span>下载次数</span><span>271</span></div>,
               render:()=><div className='download-dl'><span>下载</span></div>},
	        ],
          modalVisible:false,
          dropDownVisible:false,
          maskerVisible:false,
          provinceVal:'广东省',
          cityVal:'广州市',
          tel:'',
          concat:'',
          goverment:''
		}
    this.provinceData=getProvince();

	}
	handleMouseOver=(target)=>{
        target.style['background']="rgba(51,153,204,.5)";
        target.style['color']="#fff";
	}
	handleMouseout=(target)=>{
		target.style['background']="#fff";
        target.style['color']="#000";
	}
	handleMaskerRender=()=>{
		return (
           <div className='qhx-imgtext-masker'>
               <img src={require('../imgText/images/play.png')}/>
           </div>
		)
	}

  handleMouseOver2=(target)=>{
    target.style['box-shadow']="3px 3px 3px 0px rgba(0,0,0,.4)";
  }
  handleMouseout2=(target)=>{
    target.style['box-shadow']="";
  }

  handleDownloadMouseOver=(e)=>{
     e.target.style['background']="red";
  }
  handleDownloadMouseout=(e)=>{
     e.target.style['background']="rgb(0,153,255)";
  }

  handleBtnOk=()=>{
    console.log("ok");
      this.setState({
        modalVisible:false
      })
  }
  handleCancel=()=>{
    console.log("cancel");
      this.setState({
        modalVisible:false
      })
  }
  handleBtnClick=()=>{
    console.log("click")
      this.setState({
        modalVisible:true
      })
  }
  handleDropDownClick=()=>{
    console.log("handleDropDownClick");
       this.setState({
          dropDownVisible:true,
          maskerVisible:true
       })
  }

  handleSelect=(value,key)=>{
     this.setState({
       [key]:value
     })
  }
  handleInput=(e,key)=>{
    this.setState({
       [key]:e.target.value
    })
  }

  
	render(){
     const {modalVisible,dropDownVisible,maskerVisible,provinceVal,cityVal,tel,concat,goverment}=this.state;
     console.log("app provinceVal is "+provinceVal)
		return (
	        <div>
             <Masker visible={false}/>

             <button onClick={this.handleBtnClick} style={{marginTop:'100px',marginLeft:'100px'}}>Click</button>
             <Modal 
                title="Test"
                onOk={this.handleBtnOk}
                visible={modalVisible}
                onCancel={this.handleCancel}
             >
                <div>
                   <div className="modal-row">
                     <div className="modal-row-item"><label>用户类型:</label><Select value="" defaultValue="客户" dataSource={['客户','伙伴代理','分公司机构']}></Select>  </div>           
                     <div className="modal-row-item"><label>机构名称:</label><input placeholder="请输入机构名称" value={goverment} onChange={(e)=>this.handleInput(e,"goverment")}/></div>
                   </div>
                   <div className="modal-row">
                     <div className="modal-row-item"><label>省    份:</label>
                     <Select value={provinceVal} onChange={(value)=>this.handleSelect(value)} defaultValue={provinceVal} 
                     dataSource={this.provinceData}></Select></div>           
                     <div className="modal-row-item"><label>市:</label><Select value="" defaultValue="北京" dataSource={this.provinceData}></Select></div>
                   </div>
                   <div className="modal-row">
                     <div className="modal-row-item"><label>联系人:</label>
                     <input placeholder="请填写联系人姓名" value={concat} onChange={(e)=>this.handleInput(e,"concat")}/></div>           
                     <div className="modal-row-item"><label>电话:</label><input placeholder="请输入电话号码" value={tel} onChange={(e)=>this.handleInput(e,"tel")}/></div>
                   </div>
                </div>
             </Modal>


           
	        </div>
		)
	}
}
/*
*	            <Carouset dataSource={this.state.imgArr}></Carouset>
	            <Tab tabArr={this.state.tabArr}/>

              pages help
	            <div className='help-title-one'>
	               <div>手册资料</div>
			        </div>
                <ImgText dataSource={this.state.imgTabArr} layout={'row'} mouseover={this.handleMouseOver} mouseout={this.handleMouseout}/>
                <ImgText dataSource={this.state.imgTabArr2} layout={'row'}/>
	          	<div className='help-title-one'>
	               <div>常见问题</div>
			    </div>
                <ImgText dataSource={this.state.imgTabArr3} layout={'row'}/>
                <div className='help-title-one'>
	               <div>视频资料</div>
			    </div>
			    <ImgText dataSource={this.state.imgTabArr4} layout={'column'} className={'help-imgtext-vedio'} maskerRender={this.handleMaskerRender}/>
			    <ImgText dataSource={this.state.imgTabArr5} layout={'column'} className={'help-imgtext-vedio'} maskerRender={this.handleMaskerRender}/>


          pages download 


                           <ImgText dataSource={this.state.imgTabArr6} layout="column" className='download-imgtext' mouseover={this.handleMouseOver2} mouseout={this.handleMouseout2}/>
                 <div>
                    <span>其他相关下载</span>
                    <ImgText dataSource={this.state.imgTabArr7} layout="row" className='dll-imgtext'/>
                 </div>
                 <div>
                    <span>视频资料下载</span>
                    <ImgText dataSource={this.state.imgTabArr8} layout="row" className='video-imgtext'/>
                    <ImgText dataSource={this.state.imgTabArr9} layout="row" className='video-imgtext'/>
                    <ImgText dataSource={this.state.imgTabArr10} layout="row" className='video-imgtext'/>
                    <ImgText dataSource={this.state.imgTabArr11} layout="row" className='video-imgtext'/>
                 </div>
*/