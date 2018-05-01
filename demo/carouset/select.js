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
    this.testData=[];
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
      this.setState({
        modalVisible:true,
        maskerVisible:true,
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
  handleDownloadClick=(data)=>{
    console.log("data is "+data);
  }

  
  render(){
     const {modalVisible,dropDownVisible,maskerVisible,provinceVal,cityVal,tel,concat,goverment,type}=this.state;
    return (
          <div>
             <Masker visible={maskerVisible}/>
             <div style={{marginTop:'50px',marginLeft:'20px'}}>
               <Select  value={provinceVal} onChange={(value)=>this.handleSelect(value,"provinceVal")} defaultValue={provinceVal} dataSource={this.provinceData}></Select>
             </div>


             <div style={{marginTop:'50px',marginLeft:'20px'}}>
               <Select  value={provinceVal} onChange={(value)=>this.handleSelect(value,"provinceVal")} defaultValue={provinceVal} dataSource={this.provinceData}></Select>
             </div>


             <div style={{marginTop:'50px',marginLeft:'20px'}}>
               <Select  value={provinceVal} onChange={(value)=>this.handleSelect(value,"provinceVal")} defaultValue={provinceVal} dataSource={this.provinceData}></Select>
             </div>
          </div>
    )
  }
}
