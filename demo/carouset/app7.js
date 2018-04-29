
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

import image1 from './images/mobile_n.jpg';
import image2 from './images/mobile_m.jpg';
const images=[image1,image2];
export default class App extends Component{
  static onImageLoadError(imageSrc,_srcType,errorEvent){
     console.error(`Could not load image at ${imageSrc}`,errorEvent);
  }
  constructor(props){
    super(props);
    this.state={
      // imgArr:[
      //         {imgPath:require('./images/mobileImg.jpg'),imgName:'test'},
      //         {imgPath:require('./images/mobileImg3.jpg'),imgName:'test'}
      //   ],

        imgArr:[
           {src:image1,imgName:'test',index:0},
           {src:image2,imgName:'test',index:1}
        ],
        index:0,
    }

  }
  movePre=()=>{
    this.setState(preState=>({
      index:((preState.index + images.length - 1) % images.length)
    }))
  }
  moveNext=()=>{
    this.setState(preState=>({
      index:((preState.index - 1 + images.length) % images.length)
    }))
  }
  render(){
     const {imgArr,index}=this.state;
    return (
          <div>
             <Carouset
               mainSrc={images[index]}
               nextSrc={images[(index + 1 +images.length) % images.length]}
               preSrc={images[(index - 1 + images.length) % images.length]}
               onMovePreRequest={this.movePre}
               onMoveNextRequest={this.moveNext}
               onImageLoadError={App.onImageLoadError}
               animationDisabled={false}
             ></Carouset>
          </div>
    )
  }
}