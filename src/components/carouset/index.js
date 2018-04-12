import React,{Component} from 'react';
import PropTypes from 'prop-types';
import './index.less';
import classNames from 'classnames';
import leftArrow from '../../images/left_arrow.png';
import rightArrow from '../../images/right_arrow.png';

class Carouset extends Component{
	constructor(props){
		super(props);
		this.prefixCls="qhx-carouset";
		this.classNameStr="";
    this.state={
       imageLoaded:false
    }
	}
  componentWillMount(){
       console.log("iamgeN is "+this.props.imageName);
       this.classNameStr=classNames([
          `${this.prefixCls}-wrapper`
        ],'qhx-carouset')
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
    const {dataSource}=this.props;
		const {slideDom}=this.state;
		return (
          <div className={this.classNameStr}>
              {
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
          </div>
		)
	}
}
export default Carouset;