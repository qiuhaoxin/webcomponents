import React,{Component} from 'react';
import Carouset from '../../src/components/carouset';
import './index.less'

import image1 from './images/mobile_n.jpg';
import image2 from './images/mobile_m.jpg';
const images=[image1,image2];
export default class App extends Component{
 
     constructor(props){
        super(props);
        this.imgArr=[
              {imgPath:require('./images/mobile_m.jpg'),id:0,imgName:'test'},
              {imgPath:require('./images/mobile_n.jpg'),id:1,imgName:'test'}
        ];
       this.state={
        curIndex:0,
    }
     }
     // state={
     //    curIndex:(0),

     // }
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
  requestNext=()=>{
      const {curIndex}=this.state;
      const len=this.imgArr.length;
      this.setState(preState=>({
        curIndex:(preState.curIndex + 1 + len) % len,
      }))
  }
  requestPre=()=>{
      const {curIndex}=this.state;
      const len=this.imgArr.length;
      this.setState(preState=>({
        curIndex:(preState.curIndex - 1 + len) % len,
      }))
  }
  handleImageLoaded=(height,width)=>{
       console.log("height is "+height+" and widt is "+width);
       if(this.outerEl){
          this.outerEl.style.height=height+"px";
          this.outerEl.style.width=width+"px";
          this.outerEl.style.position="relative";
       }
  }
  render(){
    const {imgArr,index}=this.state;
        return (
           <div ref={(el)=>this.outerEl=el}>
              <Carouset
                dataSource={this.imgArr}
                mainIndex={this.state.curIndex}
                requestNext={this.requestNext}
                requestPre={this.requestPre}
                imgLoadSuccess={this.handleImageLoaded}
             ></Carouset>
           </div>
        )
    }
}