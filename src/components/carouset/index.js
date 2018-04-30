import React,{Component} from 'react';
import PropTypes from 'prop-types';
import './index.less';
import classNames from 'classnames';
import leftArrow from '../../images/left_arrow.png';
import rightArrow from '../../images/right_arrow.png';
import {getWindowWidth,getWindowHeight} from '../../utils/util';

export default class Carouset extends Component{
     constructor(props){
        super(props);
        this.imgCache={};

     }
     state={
       slideDom:false
     }
     static getTransform(x=0,y=0,width,targetWidth,){
        let nextX=x;
        const windowWidth=getWindowWidth();
        console.log("windowWidth is "+windowWidth);
        if(width > windowWidth){
          nextX += (windowWidth - width) / 2;
        }
        const scaleFactor=1 * (targetWidth / width);
        return {
          transform:`translate3d(${nextX}px,${y}px,0) scale3d(${scaleFactor},${scaleFactor},1)`
        }
     }
     static getTranslateStyle(dir){
         const windowWidth=getWindowWidth();
         const offsetX=dir * windowWidth;
         return {
            transform:`translate3d(${offsetX}px,0,0)`,
            transition:`transform .3s`,
         }

     }
     shouldComponentUpdate(nextProps,nextState){
          return true;
     }
     componentWillMount(){
        const {dataSource}=this.props;
       // this.loadAllImages();
     }
     componentDidMount(){
        this.loadAllImages();
     }
       
     //渲染左右滑动的箭头  1:左滑（右侧按钮） 0：右滑（左侧按钮）
    renderDefaultArrow=(dir)=>{
          const className="carouset-arrow "+(dir==0?'carouset-arrow-left':'carouset-arrow-right')
          return (
            <div className={className}  onClick={(e)=>this.handleArrowClick(e,dir)}>

               <img src={dir==0?leftArrow:rightArrow} className={dir==0?'carouset-arrow-left':'carouset-arrow-right'}/>
            </div>
          )
    }
    handleArrowClick=(e,dir)=>{
        const {mainIndex,dataSource,requestNext}=this.props;
        switch(dir){
          case "0":
             if(mainIndex==0){
              return;
             }
             this.requestLeft();
          break;
          case "1":
             if(mainIndex==dataSource.length - 1){
              return;
             }
             this.requestRight();
          break;
        }
    }
    requestRight=()=>{
        const {mainIndex,dataSource,requestNext}=this.props;
        if(requestNext)requestNext();
    }
    requestLeft=()=>{
        const {requestPre,mainIndex,dataSource}=this.props;
        if(requestPre)requestPre();
    }

    loadAllImages=(props=this.props)=>{
        const _this=this;
        const {dataSource}=props;
        const generateLoadDoneCallback=(imageSrc)=>err=>{
          if(err){
            return ;
          }
          this.forceUpdate();
        };
        dataSource.forEach(item=>{
           _this.loadImage(item.imgPath,generateLoadDoneCallback(item.imgPath));
        })
     }
     loadImage=(imgSrc,done)=>{
         const _this=this;
         const inmemory=new Image();
         inmemory.onerror=event=>{

         }
         inmemory.onload=(e)=>{
             _this.imgCache[imgSrc]={
                loaded:true,
                width:inmemory.width,
                height:inmemory.height,
             };
              const info=_this.getBestImageForType(imgSrc);
            console.log("info is "+info.targetHeight);
            if(info.targetHeight>0){
                 _this.props.imgLoadSuccess(Math.round(info.targetHeight))
            }
           // 
            if(done){
               done();
             }
         }
         inmemory.src=imgSrc;
     }
     isImageLoaded=(imgSrc)=>{
        return imgSrc && this.imgCache[imgSrc] && this.imgCache[imgSrc].loaded;
     }
    getBestImageForType=(imgSrc)=>{
      console.log("imgSrc is "+imgSrc);
       let fitSize={};
       const result=this.isImageLoaded(imgSrc);
       let width,height;
       if(result){
         width=this.imgCache[imgSrc].width;
         height=this.imgCache[imgSrc].height;
         fitSize=this.getFitSize(
            width,height,
            true
          );
       }else{

        return null;
       }
       return {
          src:imgSrc,
          height:height,
          width:width,
          targetHeight:fitSize.height,
          targetWidth:fitSize.width,
       }

    }
    getCarousetRect=()=>{
      if(this.outerEl){
         return this.outerEl.getBoundingClientRect();
      }
      return {
        width:getWindowWidth(),
        height:getWindowHeight(),
        top:0,
        left:0,
        right:0,
        bottom:0
      }
    }
    getFitSize=(width,height,stretch)=>{
        const boxSize=this.getCarousetRect();
       // console.log("getFitSize boxSize is "+JSON.stringify(boxSize));
        let maxHeight=boxSize.height - this.props.padding * 2;
        let maxWidth=boxSize.width - this.props.padding * 2;
       // console.log("getFitSize maxHeight is "+maxHeight+" and maxWidth is "+maxWidth);
        if(!stretch){
          maxHeight=Math.min(maxHeight,height);
          maxWidth=Math.min(maxWidth,width);
        }
        const maxRatio=maxWidth / maxHeight;
        const srcRatio=width / height;
        if(maxRatio > srcRatio){
            return {
              width:width * maxHeight / height,
              height:maxHeight
            };
        }
        return {
          width:maxWidth,
          height:height * maxWidth / width
        }
    }


     
     render(){
        const {dataSource,mainIndex}=this.props;
        const {slideDom}=this.state;
        console.log("dataSource is "+JSON.stringify(dataSource)+" and mainIndex is "+mainIndex);
        return (
           <div className="qhx-carouset" ref={(el)=>{this.outerEl=el;}}>
              {
                slideDom ? '' : this.renderDefaultArrow('0')
              }
              <ul>
              {
                  dataSource.map(item=>{
                    const imgStyle={};
                    const BestImageInfo=this.getBestImageForType(item.imgPath);
                    if(BestImageInfo){
                      imgStyle['width']=BestImageInfo.targetWidth;
                      imgStyle['height']=Math.round(BestImageInfo.targetHeight);
                    }
                    const offsetX=Carouset.getTranslateStyle(item.id - mainIndex);
                    return <li style={offsetX} key={item.id}><img style={imgStyle}  src={item.imgPath}/></li>
                  })
              }
              </ul>
              {
                slideDom ? '' : this.renderDefaultArrow('1')
              }

           </div>
        )
     }
}
Carouset.defaultProps={
  padding:0,
}
Carouset.propType={

}