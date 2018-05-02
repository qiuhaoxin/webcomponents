import React,{Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import './index.less';
import classNames from 'classnames';
import leftArrow from '../../images/left_arrow.png';
import rightArrow from '../../images/right_arrow.png';
import {getWindowWidth,getWindowHeight,deepMerge} from '../../utils/util';
import {fromJS,is} from 'immutable';
import Arrow from '../arrow';
import defaultTheme from '../../theme';

export default class Carouset extends Component{
     constructor(props){
        super(props);
        this.imgCache={};

        this.theme=deepMerge(defaultTheme,props.theme);
     }
     state={
       slideDom:false,
       curIndex:0,
     }
     getChildContext () {
        return {
          theme: this.theme,
        };
      }
     static getTransform(x=0,y=0,width,targetWidth,){
        let nextX=x;
        const windowWidth=getWindowWidth();
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
          return !is(fromJS(nextProps),fromJS(this.props)) || !is(fromJS(nextState),fromJS(this.state));
     }
     componentWillMount(){
        const {dataSource}=this.props;
     }
     componentDidMount(){
        const _this=this;
        const {mainIndex}=this.props;
        this.setState({
          curIndex:mainIndex,
        })
        this.loadAllImages();
        window.addEventListener('resize',this.handleResize,false)
     }
     handleResize=(e)=>{
        console.log("sdfsdfsdf");
        if(this.imgCache){
            const imgSrc=Object.keys(this.imgCache)[0];
            const info=this.getBestImageForType(imgSrc);
            if(info.targetHeight>0){
              this.props.imgLoadSuccess(Math.round(info.targetHeight),Math.round(info.targetWidth))
            }
        }
        this.forceUpdate();
     }

     componentWillReceiveProps(nextProps){
        if(nextProps.mainIndex!=this.props.mainIndex){
          this.setState({
            curIndex:nextProps.mainIndex,
          })
        }
     }

  setArrowRef=(el,dir)=>{
    dir==0?(this.leftArrow=el):(this.rightArrow=el)
  }
  renderArrowPrev () {
    //if (this.props.currentImage === 0) return null;

    return (
      <Arrow
        direction="left"
        icon="arrowLeft"
        onClick={this.handleArrowClick}
        title={"left arrow"}
        type="button"
      />
    );
  }
  renderArrowNext () {
    //if (this.props.currentImage === (this.props.images.length - 1)) return null;

    return (
      <Arrow
        direction="right"
        icon="arrowRight"
        onClick={this.handleArrowClick}
        title={this.props.rightArrowTitle}
        type="button"
      />
    );
  }
     //渲染左右滑动的箭头  1:左滑（右侧按钮） 0：右滑（左侧按钮）
    // renderDefaultArrow=(dir)=>{
    //       const {dataSource}=this.props;
    //       const {curIndex}=this.state;
    //       let className="carouset-arrow "+(dir==0?'carouset-arrow-left':'carouset-arrow-right');
    //       if(dir==0 && curIndex==0){
    //         className+=" arrow-left-disable";
    //       }else if(dir==0){
    //         className+=" arrow-enable";
    //       }
    //       if(dir==1 && curIndex==(dataSource.length - 1)){
    //           className+=" arrow-right-disable";
    //       }else if(dir==1){
    //         className+=" arrow-enable";
    //       }
    //       return (
    //         <div className={className}  onClick={(e)=>this.handleArrowClick(e,dir)} ref={(el)=>this.setArrowRef(el,dir)} >
    //             <img src={dir==0?leftArrow:rightArrow} className={dir==0?'carouset-arrow-left':'carouset-arrow-right'}/>
    //         </div>
    //       )
    // }
    renderDefaultArrow=(dir)=>{
      if(dir==0){
        this.renderArrowPrev()
      }
      if(dir==1){
        this.renderArrowNext()
      }

    }
    handleArrowClick=(e,dir)=>{
        const {dataSource,requestNext}=this.props;
        const {curIndex}=this.state;
        switch(dir){
          case "0":
             if(curIndex==0){
              return;
             }
             this.requestLeft();
          break;
          case "1":
             if(curIndex==dataSource.length - 1){
              return;
             }
             this.requestRight();
          break;
        }
    }
    setArrowDisable=(dir)=>{

        const {dataSource}=this.props;
        const {curIndex}=this.state;
        if(dir==0 && curIndex==0){
          this.leftArrow.classList.remove('arrow-enable');
          this.leftArrow.classList.add('arrow-left-disable');
        }else if(dir==1 && curIndex==(dataSource.length - 1)){
          this.rightArrow.classList.remove('arrow-enable');
          this.rightArrow.classList.add('arrow-right-disable');
        }
    }
    requestRight=()=>{
        const {curIndex}=this.state;
        const {dataSource,requestNext}=this.props;
        if(requestNext)requestNext();
    }
    requestLeft=()=>{
        const {requestPre,dataSource}=this.props;
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
            if(info.targetHeight>0){
                 _this.props.imgLoadSuccess(Math.round(info.targetHeight),Math.round(info.targetWidth))
            }
           
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
        console.log("boxSize is "+JSON.stringify(boxSize));
        let maxHeight=boxSize.height - this.props.padding * 2;
        let maxWidth=boxSize.width - this.props.padding * 2;
        if(maxWidth>1030){
          console.log("maxWidth is "+maxWidth);
        }
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
        const {dataSource}=this.props;
        const {curIndex}=this.state;
        const {slideDom}=this.state;
        return (
           <div className="qhx-carouset" ref={(el)=>{this.outerEl=el;}}>
              {
                slideDom ? '' : this.renderArrowPrev()
                // this.renderDefaultArrow('0')
              }
              <ul>
              {
                  dataSource.map(item=>{
                    const imgStyle={};
                    const BestImageInfo=this.getBestImageForType(item.imgPath);
                    if(BestImageInfo){
                      console.log("targetWidth  is "+BestImageInfo.targetWidth);
                      imgStyle['width']=BestImageInfo.targetWidth;
                      imgStyle['height']=Math.round(BestImageInfo.targetHeight);
                    }
                    const offsetX=Carouset.getTranslateStyle(item.id - curIndex);
                    return <li style={offsetX} key={item.id}><img draggable={false} style={imgStyle}  src={item.imgPath}/></li>
                  })
              }
              </ul>
              {
                slideDom ? '' : this.renderArrowNext()

                //this.renderDefaultArrow('1')
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
Carouset.childContextTypes={
  theme:PropTypes.object.isRequired,
}