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

import Exchange from '../../src/components/exchange';

export default class App extends Component{
	constructor(props){
		super(props);
		this.state={
          modalVisible:false,
          dropDownVisible:false,
          maskerVisible:false,
          provinceVal:'广东省',
          cityVal:'广州市',
          type:'客户',
          tel:'',
          concat:'',
          goverment:''
		}
    this.provinceData=getProvince();
    this.govermentData=['客户','伙伴代理','分公司机构'];
    this.cityData=getCity('广东');
    this.exchangeData=[
          ['13.1','14.0'],
          ['14.2','14.3']
    ]
    console.log("cityData is "+JSON.stringify(this.cityData));
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
    console.log("key is "+key);
    if(key=='provinceVal'){
        this.cityData=getCity(value);
    }
     this.setState((preState)=>{
        if(key=='provinceVal'){
          return ({
            [key]:value,
            cityVal:this.cityData[0]
          })
        }else{
          return ({
            [key]:value
          })
        }
     })
  }
  handleInput=(e,key)=>{
    this.setState({
       [key]:e.target.value
    })
  }

  
	render(){
     const {modalVisible,dropDownVisible,maskerVisible,provinceVal,cityVal,tel,concat,goverment,type}=this.state;
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
                     <div className="modal-row-item"><label>用户类型:</label>
                     <Select value={type} defaultValue={type} dataSource={this.govermentData} onChange={(value)=>this.handleSelect(value,"type")}></Select>  
                     </div>           
                     <div className="modal-row-item"><label>机构名称:</label><input placeholder="请输入机构名称" value={goverment} onChange={(e)=>this.handleInput(e,"goverment")}/></div>
                   </div>
                   <div className="modal-row">
                     <div className="modal-row-item"><label>省    份:</label>
                     <Select value={provinceVal} onChange={(value)=>this.handleSelect(value,"provinceVal")} defaultValue={provinceVal} 
                     dataSource={this.provinceData}></Select></div>           
                     <div className="modal-row-item"><label>市:</label>
                     <Select value={cityVal} defaultValue={cityVal} dataSource={this.cityData} onChange={(value)=>this.handleSelect(value,"cityVal")}></Select>
                     </div>
                   </div>
                   <div className="modal-row">
                     <div className="modal-row-item"><label>联系人:</label>
                     <input placeholder="请填写联系人姓名" value={concat} onChange={(e)=>this.handleInput(e,"concat")}/></div>           
                     <div className="modal-row-item"><label>电话:</label><input placeholder="请输入电话号码" value={tel} onChange={(e)=>this.handleInput(e,"tel")}/></div>
                   </div>
                </div>
             </Modal>
             <Exchange dataSource={this.exchangeData}/>

           
	        </div>
		)
	}
}