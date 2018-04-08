import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import classNames from 'classnames';


class DropDown extends Component{
	constructor(props){
		super(props);
    this.prefixCls="qhx-dropdown";
    this.handleDocumentClick=this.handleDocumentClick.bind(this);
    this.refCallBack=this.refCallBack.bind(this);
    this.mounted=true;
  
    this.count=0;
    this.state={
          classname:'',
    }
    this.instance=null;
	}

	componentDidMount(){
        const {dataSource}=this.props;
       document.addEventListener('click',this.handleDocumentClick,false);

	}
	componentWillMount(){
       const {classNameStr,visible}=this.props;
      const classname=this.buildClassName(classNameStr,visible);
       this.setState({
       	  classname
       })

	}
  componentWillUpdate(){

  }
  buildClassName=(classNameStr,visible)=>{
       const visibleStr=visible ? 'show' : 'hide';
       const classname=classNames([
           [`${this.prefixCls}-${visibleStr}`]:visibleStr,
           [`${classNameStr}`]:classNameStr
        ],this.prefixCls)
       return classname;
  }
  handleDocumentClick=(event)=>{
    const {visible,classNameStr}=this.props;
    if(this.mounted){
      if(!ReactDOM.findDOMNode(this.instance).contains(event.target)){
        this.count++;

         if(visible && this.count >= 2){
             const classname=this.buildClassName(classNameStr,!visible);
             this.instance.style['height']="0px";
             //this.instance.style['border']="none";
             this.count=0;
         }else if(visible && this.count==1){
           console.log("handleDocumentClick false");
           //this.instance.style['border']="1px solid #eee";
         }
      }
    }
  }
  componentWillUnmount(){
    this.mounted=false;
    documnet.addEventListener('click',this.handleDocumentClick,false);
  }
  refCallBack(instance){
    this.instance=instance;
  }

	componentWillReceiveProps(nextProps){
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
  handleDropDownClick=()=>{
       this.setState({
          dropDownVisible:true,
       })
  }
	render(){
    console.log("hsdfsd");
		const {dataSource,visible}=this.props
		const {classname}=this.state;
		return (
            <div className={classname} ref={this.refCallBack}>
                <ul>
                    {
                    	dataSource.map((item,index)=>{
                        if(index==dataSource.length - 1 && visible){
                          if(this.instance){
                            if(dataSource.length <= 10){
                              this.instance.style['height']=(dataSource.length * 30 +1)+"px";
                            }else{
                              this.instance.style['height']=(10 * 30 +1)+"px";
                            }

                          }
                        }
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