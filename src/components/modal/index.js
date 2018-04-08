import React,{Component} from 'react';
import classNames from 'classnames';
import './index.less';
import PropTypes from 'prop-types';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

let mousePosition={x:0,y:0};
class Modal extends Component{
	constructor(props){
		super(props);
		this.prefixcls="qhx-modal";
		this.renderFooter=this.renderFooter.bind(this)
	}
	state={
		classNameStr:''
	}
	componentDidMount(){
       const {visible}=this.props;
       const showOrhide=visible ? 'show' : 'hide';
       let classNameStr=classNames([
           [`${this.prefixcls}-${showOrhide}`]:visible
       	],this.prefixcls)
           // 只有点击事件支持从鼠标位置动画展开
    addEventListener(document.documentElement, 'click', (e: MouseEvent) => {
      mousePosition = {
        x: e.pageX,
        y: e.pageY,
      };
      // 100ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => mousePosition = null, 100);
    });
       this.setState({
       	  classNameStr:classNameStr
       })
	}
	componentWillReceiveProps(nextProps){
	   const {visible}=nextProps;
       const showOrhide=visible ? 'show' : 'hide';
       let classNameStr=classNames([
           [`${this.prefixcls}-${showOrhide}`]:visible
       	],this.prefixcls)
       this.setState({
       	  classNameStr:classNameStr
       })
       
	}
	componentWillMount(){

	}
	renderFooter=()=>{
	   const {onOk,onCancel}=this.props;
       return (
          <div>
             <span className="qhx-modal-cancel" onClick={onCancel}>取消</span>
             <span className="qhx-modal-ok" onClick={onOk}>确定</span>
          </div>
       )
	}

	render(){
		const {title,visible,onOk}=this.props;
		const {classNameStr}=this.state;
		return (
           <div className={classNameStr} >
               <div className="qhx-modal-title">
                     <span>{title}</span>
               </div>
               <div className="qhx-modal-body">
                   {
                   	  React.Children.map(this.props.children,function(child){
                         return <div>{child}</div>
                   	  })
                   }
               </div>
               <div className="qhx-modal-footer">
                    {this.renderFooter()}
               </div>
           </div>
		)
	}
}
Modal.propTypes={
	title:PropTypes.string
}

export default Modal;