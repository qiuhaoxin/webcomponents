import React,{Component} from 'react';
import './index.less';
import classNames from 'classnames';


class DropDown extends Component{
	constructor(props){
		super(props);
        this.prefixCls="qhx-dropdown";
	}
	state={
        classname:''
	}
	componentDidMount(){

	}
	componentWillMount(){
       const {classNameStr,visible}=this.props;
       console.log("visible is "+visible);
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
		const {dataSource}=this.props
		const {classname}=this.state;
		return (
            <div className={classname}>
                <ul>

                    {
                    	dataSource.map((item,index)=>{
                    		return (
                               <li key={`dropdown-${index}`} className="dropdown-item">
                                   {item}
                               </li>
                    		)
                    	})
                    }
                </ul>
            </div>
		)
	}
}
export default DropDown;