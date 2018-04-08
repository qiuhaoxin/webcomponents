import React,{Component} from 'react';
import classNames from 'classnames';
import './index.less';
import DropDown from '../dropDown';


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
      console.log("value is ");
      this.setState({
        value,defaultValue
      })
   }
   componentDidMount(){

   }
   componentWillReceiveProps(nextProps){

   }
   handleClick=(e)=>{
      console.log("dropDownVisible is "+this.state.dropDownVisible);
      this.setState({
         dropDownVisible:true
      })
   }
   handleSelectItem=(itemValue)=>{
       this.setState({
          value:itemValue
       })
   }
   render(){
     const {dataSource}=this.props;
     const {dropDownVisible,value,defaultValue}=this.state;
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