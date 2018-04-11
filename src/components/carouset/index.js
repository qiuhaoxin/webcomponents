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
      imgArr:[],
      currentImg:0
    }
	}
  componentWillMount(){

  }
  componentWillReceiveProps(nextProps){

  }
  shouldComponentUpdate(nextProps,nextState){
    return true;
  }

	componentDidMount(){
       const {dataSource,classNameStr}=this.props;
       this.classNameStr=classNames([
          `${this.prefixCls}-wrapper`
       	],'qhx-carouset')
       console.log("dataSource is "+JSON.stringify(dataSource));
       this.setState({
         imgArr:dataSource
       })
	}
  handleArrowClick=(dir)=>{
    
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
    const {imgArr}=this.state;
    return (
       <div className="qhx-carouset-indicator">
          {
            imgArr.map((item,index)=><span className='qhx-carouset-indicator-dot' key={`indicator-${index}`}></span>)
          }
       </div>
    )
  }
	render(){
		const {imgArr,slideDom}=this.state;
		return (
          <div className={this.classNameStr}>
              {
                slideDom ? '' : this.renderDefaultArrow('0')
              }
              <ul>
                 {
                    imgArr.map((item,index)=><li key={`carouset-${index}`}><img src={item.imgPath}/></li>)
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