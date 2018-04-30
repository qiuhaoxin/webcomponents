

/*
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import classNames from 'classnames';
import leftArrow from '../../images/left_arrow.png';
import rightArrow from '../../images/right_arrow.png';
import {getWindowWidth,getWindowHeight,translate,getIEVersion} from '../../utils/util';
console.log("styles is "+JSON.stringify(styles));
const ieVersion=getIEVersion();
class Carouset extends Component{
  static getTransform({x=0,y=0,width,targetWidth}){
    let nextX=x;
    const windowWidth=getWindowWidth();
   // console.log("windowWidth is "+windowWidth);
    if(width > windowWidth){
      nextX += (windowWidth - width) / 2;
    }
   // console.log("targetWidth is "+targetWidth+" and width is "+width);

    const scaleFactor=1 * (targetWidth / width);
    //console.log("scaleFactor is "+scaleFactor);
    return {
      transform:`translate3d(${nextX}px,${y}px,0) scale3d(${scaleFactor},${scaleFactor},1)`
    }

  }
  constructor(props){
    super(props);
    this.prefixCls="qhx-carouset";
    this.classNameStr="";
    this.state={
       imageLoaded:false,
       offsetX:0,
       offsetY:0,
       loadErrorStatus:{},
       shouldAnimate:false,
       transformX:0
    }
  }
  componentWillMount(){
       this.classNameStr=classNames([
          `${this.prefixCls}-wrapper`
        ],'qhx-carouset')
       this.imageCache={};
       this.keyCounter=0;
       this.moveRequested=false;
       this.timeouts=[];
  }
  componentWillReceiveProps(nextProps){
    let sourcesChange=false;
    const prevSrcDist={};
    const nextSrcDict={};
    this.getSrcType().forEach(srcType=>{
        if(this.props[srcType.name]!==nextProps[srcType.name]){
            sourcesChange=true;
            prevSrcDist[this.props[srcType.name]]=true;
            nextSrcDict[this.props[srcType.name]]=true;
        };
    });
    if(sourcesChange || this.moveRequested){
      Object.keys(prevSrcDist).forEach(prevSrc=>{
          if(!(prevSrc in nextSrcDict) && prevSrc in this.imageCache){
            this.imageCache[prevSrc].loaded=false;
          }
      });
      this.moveRequested=false;
      this.loadAllImages(nextProps);
    }
  }
  shouldComponentUpdate(nextProps,nextState){
    return true;
  }

  componentDidMount(){
       const {dataSource,classNameStr,currentImg}=this.props;
      // this.preloadImage(currentImg,this.handleImageLoaded);
      this.loadAllImages();
  }
  handleArrowClick=(event,dir)=>{
     console.log("dir is "+dir);
     if(dir==0){
        this.requestMove('pre',event)
     }else if(dir==1){
        this.requestMove('next',event);
     }
  }
  requestMove=(direction,event)=>{ 
      const _this=this;
      const nextState={
        offsetX:0,
        offsetY:0,
      };
      if(!this.props.animationDisabled){
        nextState.shouldAnimate=true;
        this.setTimeout(()=>this.setState({shouldAnimate:false}),
        this.props.animationDuration);
      }

      this.setTimeout(()=>{
        _this.moveRequested=true;
        if(direction=='pre'){
          _this.keyCounter-=1;
          _this.setState(nextState);
          _this.props.onMovePreRequest(event);
        }else{
          _this.keyCounter+=1;
          _this.setState(nextState);
          _this.props.onMoveNextRequest(event);
        }
      },300);

  }

  handleImageLoaded=()=>{
    this.setState({
      imageLoaded:true
    })
  }
  //预加载图片
  preloadImage=(index,onload)=>{
      const {dataSource}=this.props;
      const imgData=dataSource[index];

      let img=new Image();
      img.onerror=onload;
      img.onload=onload;
      img.src=imgData.src;

      return img;

  }
  getSrcType(){
    return [
       {
          name:'mainSrc',
          keyEnding:`i${this.keyCounter}`,
       },
       {
          name:'nextSrc',
          keyEnding:`$i{this.keyCounter + 1}`
       },
       {
          name:'preSrc',
          keyEnding:`${this.keyCounter - 1}`
       }
    ]
  }
  loadAllImages=(props=this.props)=>{
     const generateLoadDoneCallback=(srcType,imageSrc)=>err=>{
        if(err){
          return ;
        }
        if(this.props[srcType]!==imageSrc){
          return;
        }
        this.forceUpdate();
     };
     this.getSrcType().forEach(srcType=>{
        const type=srcType.name;
        if(props[type] && this.state.loadErrorStatus[type]){
          this.setState(preState=>({
              loadErrorStatus:{...preState.loadErrorStatus,[type]:false},
          }));
        }
        if(props[type] && !this.isImageLoaded(props[type])){
            this.loadImage(type,props[type],generateLoadDoneCallback(type,props[type]));
        }
     })

  }
  loadImage=(srcType,imageSrc,done)=>{
    const _this=this;
     if(this.isImageLoaded(imageSrc)){
        this.setTimeout(()=>{
           done();
        },1);
        return;
     }
     const inMemoryImage=new Image();

     inMemoryImage.onerror=errorEvent=>{

     }
     inMemoryImage.onload=()=>{
        _this.props.onImageLoad(imageSrc,srcType,inMemoryImage);
        _this.imageCache[imageSrc]={
           loaded:true,
           width:inMemoryImage.width,
           height:inMemoryImage.height,
        };
        done();
     }
     inMemoryImage.src=imageSrc;
  }
  isImageLoaded=(imageSrc)=>{
     return (
        imageSrc && imageSrc in this.imageCache && this.imageCache[imageSrc].loaded
     )
    
  }
  getBestImageForType=(srcType)=>{
     let imageSrc=this.props[srcType];
     let fitSize={};
     const result=this.isImageLoaded(imageSrc);
     if(result){
        fitSize=this.getFitSize(
          this.imageCache[imageSrc].width,
          this.imageCache[imageSrc].height,
          true
        );
     }else{

      return null;
     }
     return {
        src:imageSrc,
        height:this.imageCache[imageSrc].height,
        width:this.imageCache[imageSrc].width,
        targetHeight:fitSize.height,
        targetWidth:fitSize.width,
     }

  }
  getFitSize=(width,height,stretch)=>{
     // console.log("getFitSize widt is "+width+" and height is "+height);
      const boxSize=this.getCarousetRect();
     // console.log("getFitSize boxSize is "+JSON.stringify(boxSize));
      let maxHeight=boxSize.height - this.props.imagePadding * 2;
      let maxWidth=boxSize.width - this.props.imagePadding * 2;
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
  goToNext=()=>{
    
  }
  goToPre=()=>{

  }
  //渲染左右滑动的箭头
  renderDefaultArrow=(dir)=>{
     // const className="carouset-arrow "+(dir==0?'carouset-arrow-left':'carouset-arrow-right');
      const arrowClass=(dir==0?styles['carouset-arrow-left']:styles['carouset-arrow-right']);
      const className=`${styles['carouset-arrow']} ${arrowClass}`
      return (
        <div className={className}  onClick={(e)=>this.handleArrowClick(e,dir)}>
           <img src={dir==0?leftArrow:rightArrow} className={dir==0?styles['carouset-arrow-left']:styles['carouset-arrow-right']}/>
        </div>
      )
  }
  setTimeout(func,time){
    const id=setTimeout(()=>{
       func();
    },time);
    this.timeouts.push(id);
    return id;
  }
  isAnimating=()=>{
    return this.state.shouldAnimate;
  }
  renderIndirators=()=>{
    const {dataSource,currentImg}=this.props;
    return (
       <div className="qhx-carouset-indicator">
          {
            dataSource.map((item,index)=><span className='qhx-carouset-indicator-dot' key={`indicator-${index}`}></span>)
          }
       </div>
    )
  }
  render(){
    const {dataSource,animationDisabled,animationDuration}=this.props;
    const {slideDom,offsetX,offsetY,loadErrorStatus}=this.state;
    const images=[];

    const boxSize=this.getCarousetRect();
    let transitionStyle={};

    //if(!animationDisabled && this.isAnimating()){
      transitionStyle={
        ...transitionStyle,
        transition:`transform ${animationDuration}ms`,
      }
    //}
    let keyEndings={};
    this.getSrcType().forEach(({name,keyEnding})=>{
       keyEndings[name]=keyEnding;
    })
    const addImage=(srcType,imageClass,transform)=>{
     // console.log("srcType is "+srcType+" and imageSrc is "+this.props[srcType]);
       if(!this.props[srcType]){
        return;
       }
       const bestImageInfo=this.getBestImageForType(srcType);
     //  console.log("scrT is "+srcType+"bestImageInfo is "+JSON.stringify(bestImageInfo));
       const imageStyle={
          ...transitionStyle,
          ...Carouset.getTransform({
            ...transform,
            ...bestImageInfo,
          }),
       };
       const hasTrueValue=(object) =>{
          return Object.keys(object).some(key => object[key]);
       } 

       if(bestImageInfo===null && hasTrueValue(loadErrorStatus)){
          images.push(
             <div style={imageSrc} className={`${imageClass} ril-errored`} key={this.props[srcType]+keyEndings[srcType]}>
                <div>
                  {this.props.imageLoadErrorMessages}
                </div>
             </div>
          )
          return;
       }else if(bestImageInfo===null){
          const loadingIcon=
          ieVersion < 10 ? (
              <div className={styles.loadingContainer__icon}>
                  {translate('Loading...')}
              </div>
          ) : (
             <div
               className={`ril-loading-circle ${styles.loadingCircle} ${styles.loadingContainer__icon}`}
             >
               {
                [...new Array(12)].map((_,index)=>(
                   <div key={index} className={`ril-loading-circle-point ${styles.loadingCirclePoint}`}>

                   </div>
                ))
               }
             </div>
          );
          images.push(
           <div
              className={`${imageClass} ${styles.image} ril-not-loaded`}
              style={imageStyle}
              key={this.props[srcType] + keyEndings[srcType]}
            >
              <div className={styles.loadingContainer}>{loadingIcon}</div>
          </div>
          )
          return;
       }
       const imageSrc=bestImageInfo.src;
       images.push(
            <img 
               className={`${imageClass} ${styles.image}`}
               src={imageSrc}
               key={imageSrc + keyEndings[srcType]}
               style={imageStyle}
               alt={
                  typeof imageTitle==='string' ? imageTitle : translate('Image')

               }
               draggable={false}
            />

       )
    }
    addImage('nextSrc','ril-image-next ril-image',{
      x:boxSize.width,
    })
    addImage('mainSrc','ril-image-current ril-image',{
      x:-1 * offsetX,
      y:-1 * offsetY,
    });
    addImage('preSrc','ril-image-prev ril-image',{
      x:-1 * boxSize.width
    })
    //console.log("image is "+JSON.stringify(images));
    return (
          <div  className={styles['qhx-carouset']} ref={el=>{this.outerEl=el}}>
              {
                slideDom ? '' : this.renderDefaultArrow('0')
              }
              <div className={`ril-inner ${styles.inner}`}>
                 {images}
              </div>
              {
                slideDom ? '' : this.renderDefaultArrow('1')
              }
          </div>
    )
  }
}
Carouset.propsType={
  imageLoadErrorMessages:PropTypes.node,
}
Carouset.defaultProps={
  onImageLoad:()=>{},
  imagePadding:0,
  animationDisabled: false,
  animationDuration: 300,
  imageLoadErrorMessages:"this image failed to load",
}
export default Carouset;
*/