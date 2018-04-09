import React,{Component} from 'react';
import classNames from 'classnames';
import './index.less';
import DropDown from '../dropDown';
import {is,fromJS} from 'immutable';


class Select extends Component{
   constructor(props){
   	  super(props);
   }
   state={
   	  classNameStr:'',
      dropDownVisible:false,
      value:'',
      defaultValue:''
   }
   componentWillMount(){
      const {value,defaultValue}=this.props;
      console.log("value is "+value+" and defaultValue is "
        +defaultValue);
      this.setState({
        value,defaultValue
      })
   }
   componentDidMount(){

   }
   componentWillReceiveProps(nextProps){

   }
   shouldComponentUpdate(nextProps,nextState){
      return !is(fromJS(nextProps),fromJS(this.props)) || !is(fromJS(nextState),fromJS(this.state));
   }
   handleClick=(e)=>{
      console.log("dropDownVisible is "+this.state.dropDownVisible);
      this.setState({
         dropDownVisible:true
      })
   }
   handleSelectItem=(itemValue)=>{
       const {onChange}=this.props;
       if(onChange)onChange(itemValue);
       this.setState({
          dropDownVisible:false
       })
   }
   render(){
     const {dataSource,value,defaultValue}=this.props;
     console.log("render value is "+value+" and defaultValue is "+defaultValue)
     const {dropDownVisible}=this.state;
   	 return (
        <div className="qhx-select">
           <div className="qhx-select-input" onClick={this.handleClick}>
               <div className="qhx-select-content">{value || defaultValue}</div><div className="qhx-select-icon"></div>
           </div>
           <DropDown dataSource={dataSource} visible={dropDownVisible} itemClick={this.handleSelectItem}></DropDown>
        </div>
   	 )
   }
}
export default Select;