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
      dropDownVisible:false
   }
   componentWidllMount(){
      
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
   render(){
     const {value,defaultValue,dataSource}=this.props;
     const {dropDownVisible}=this.state;
   	 return (
        <div className="qhx-select">
           <div className="qhx-select-input" onClick={this.handleClick}>
               <div className="qhx-select-content">{value || defaultValue}</div><div className="qhx-select-icon"></div>
           </div>
           <DropDown dataSource={dataSource} visible={dropDownVisible}></DropDown>
        </div>
   	 )
   }
}
export default Select;