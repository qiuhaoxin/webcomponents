import React,{Component} from 'react';
import classNames from 'classnames';
import './index.less';
import PropTypes from 'prop-types';


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