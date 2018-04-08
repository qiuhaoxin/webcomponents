import React,{Component} from 'react';
import classNames from 'classnames';
import './index.less';


class Masker extends Component{
    constructor(props){
    	super(props);
    	this.prefixCls="qhx-masker";
    }
    state={
    	classname:''
    }
    componentDidMount(){

	}
	componentWillMount(){
       const {classNameStr,visible}=this.props;
       const visibleStr=visible ? 'show' : 'hide';
       const classname=classNames([
           [`${this.prefixCls}-${visibleStr}`]:visibleStr,
           [`${classNameStr}`]:classNameStr
       	],this.prefixCls)
       this.setState({
       	  classname
       })
	}

	componentWillReceiveProps(nextProps){
		console.log("new "+nextProps.visible+" and old is "+this.props.visible);
        if(nextProps.visible!=this.props.visible){
           const visibleStr=nextProps.visible ? 'show' : 'hide';
	       const classname=classNames([
	           [`${this.prefixCls}-${visibleStr}`]:visibleStr,
	          [`${nextProps.classNameStr}`]:nextProps.classNameStr
	       ],this.prefixCls)
	       this.setState({
	       	  classname
	       })
        }
	}
    render(){
    	const {classname}=this.state;
    	return (
           <div className={classname}>

           </div>
    	)
    }
}

export default Masker;