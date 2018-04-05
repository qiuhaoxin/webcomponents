import React,{Component} from 'react';
import './index.less';
import Line from '../line';
import ClassNames from 'classnames';

class Tab extends Component{
	constructor(props){
	   super(props)
	   this.state={
          linetransformOffset:0,
          tabArr:[]
	   }
	}
	componentDidMount(){
	//根据路由初始化indicator
       const {tabArr}=this.props;
       //let pathname=urlLocation.pathname;
       // let routerItem= tabArr.filter(item=>item.url==pathname);
       // if(routerItem){
       //    routerItem=routerItem[0];
       // }
       // tabArr.forEach(itemData=>{
       //      if(routerItem.index==itemData.index){
       //         itemData['activeElement']=true;
       //      }else{
       //         itemData['activeElement']=false;
       //      }
       //  })
       //if(routerItem){
	       this.setState({
	          //linetransformOffset:routerItem['index'] * 100,
	          tabArr
	       })
       //}
	}
	componentWillReceiveProps(nextProps){
        console.log("nextProps is "+JSON.stringify(nextProps));
    }
	handleClick=(e,item)=>{
        const {clickEvent}=this.props;
        const {tabArr}=this.state;
        if(clickEvent)clickEvent(item);
        tabArr.forEach(itemData=>{
            if(item.index==itemData.index){
               itemData['activeElement']=true;
            }else{
               itemData['activeElement']=false;
            }
        })
        this.setState({
           linetransformOffset:item.index * 100
        })
	}
	render(){
	   const {clickEvent}=this.props;
	   const {tabArr}=this.state;
       return (
		   <div className='tab-wrapper'>
	           <ul>
	               {
	                  tabArr.map((item,index)=>{
	                     return (
	                        <li key={'tab-list'+index} className={item.activeElement?'active':'noactive'} onClick={(e)=>this.handleClick(e,item)}>
	                            <div>{item.text}</div>
	                        </li>
	                     )
	                  })
	               }
	           </ul>
             <Line height="3px" width="100px" lineColor="#2d8cf0" marginStyle="0" translateOffset={this.state.linetransformOffset}/>
		   </div>
       )
	}
}
export default Tab;