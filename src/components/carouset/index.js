import React,{Component} from 'react';
import PropTypes from 'prop-types';
import './index.less';
import classNames from 'classnames';
import leftArrow from '../../images/left_arrow.png';
import rightArrow from '../../images/right_arrow.png';
import {getWindowWidth,getWidowHeight} from '../utils/util';

class Carouset extends Component{
  static getTransform({x=0,y=0,width,targetWidth}){
    let nextX=x;
    const windowWidth=getWindowWidth();
    if(width > windowWidth){
      nextX += (windowWidth - width) / 2;
    }
    return {
      transform:`translate3d(${nextX}px,${y}px,0)`
    }

  }
	constructor(props){
		super(props);
		this.prefixCls="qhx-carouset";
		this.classNameStr="";
    this.state={
       imageLoaded:false
    }
	}
  componentWillMount(){
       this.classNameStr=classNames([
          `${this.prefixCls}-wrapper`
        ],'qhx-carouset')

       this.imageCache={};
  }
  componentWillReceiveProps(nextProps){

  }
  shouldComponentUpdate(nextProps,nextState){
    return true;
  }

	componentDidMount(){
       const {dataSource,classNameStr,currentImg}=this.props;

       console.log("classNameStr is "+this.classNameStr)
       this.preloadImage(currentImg,this.handleImageLoaded);
	}
  handleArrowClick=(dir)=>{
     
  }

  handleImageLoaded=()=>{
    this.setState({
      imageLoaded:true
    })
  }
  //预加载图片
  preloadImage=(index,onload)=>{
      const {dataSource}=this.props;
      console.log("dataSource is "+JSON.stringify(dataSource));
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
       },
       {
          name:'nextSrc',
       },
       {
          name:'preSrc'
       }
    ]
  }
  isImageLoaded=(imageSrc)=>{
     return {
        imageSrc && imageSrc in this.imageCache && this.imageCache[imageSrc].loaded
     }
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
        this.props.onImageLoad(imageSrc,srcType,inMemoryImage);
        this.imageCache[imageSrc]={
           loaded:true,
           width:inMemoryImage.width,
           height:inMemoryImage.height,
        };
        done();
     }
     inMemoryImage.src=imageSrc;
  }
  getBestImageForType=(srcType)=>{
     let imageSrc=this.props[srcType];
     let fitSize={};
     if(this.isImageLoaded[imageSrc]){
        fitSize=this.
     }
  }
  getFitSize=(width,height,stretch)=>{

  }
  goToNext=()=>{
    
  }
  goToPre=()=>{

  }
  //渲染左右滑动的箭头
  renderDefaultArrow=(dir)=>{
      const className="carouset-arrow "+(dir==0?'carouset-arrow-left':'carouset-arrow-right')
      return (
        <div className={className}  onClick={()=>this.handleArrowClick(dir)}>
           <img src={dir==0?leftArrow:rightArrow} className={dir==0?'carouset-arrow-left':'carouset-arrow-right'}/>
        </div>
      )
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
		const {slideDom}=this.state;
    let images=[];
    let transitionStyle={};

    if(!animationDisabled){
      transitionStyle={
        ...transitionStyle,
        transition:`transform ${}ms`,
      }
    }
    const addImage(srcType,imageClass,transform)=>{
       if(!this.props[srcType]){
        return;
       }
       const imageStyle={
          ...transitionStyle,
          ...Carouset.getTransform({
            ...transform,

          })
       }
    }
		return (
          <div className={this.classNameStr}>

          </div>
		)
	}
}
export default Carouset;

/*
*              {
                slideDom ? '' : this.renderDefaultArrow('0')
              }
              <ul>
                 {
                    dataSource.map((item,index)=><li key={`carouset-${index}`}><img src={item.src}/></li>)
                  }
              </ul>
              {
                slideDom ? '' : this.renderDefaultArrow('1')
              }
              {
                this.renderIndirators()
              }
*/