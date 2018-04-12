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

import imageN from './images/mobileImg.jpg';
export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      // imgArr:[
      //         {imgPath:require('./images/mobileImg.jpg'),imgName:'test'},
      //         {imgPath:require('./images/mobileImg3.jpg'),imgName:'test'}
      //   ],

        imgArr:[
           {src:'./images/mobileImg.jpg',imgName:'test',index:0},
           {src:'./images/mobileImg3.jpg',imgName:'test',index:1}
        ]
    }

  }
  render(){
     const {modalVisible,dropDownVisible,maskerVisible,provinceVal,cityVal,tel,concat,goverment}=this.state;
     console.log("app provinceVal is "+provinceVal)
    return (
          <div>
             <Carouset dataSource={this.state.imgArr} currentImg={0} imageName={imageN}></Carouset>
          </div>
    )
  }
}