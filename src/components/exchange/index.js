import React,{Component} from 'react';
import {is,fromJS} from 'immutable';
import './index.less';
import classNames from 'classnames';
import download from '../../images/download.png';
class Exchange extends Component{
	constructor(props){
		super(props);
		this.state={
			showExchange:false
		}
	}
	handleClick=(e)=>{
      this.setState((preState)=>{
      	return ({
      		showExchange:!preState.showExchange
      	})
      })
	}
	handleLayouOneMouseIn=(e)=>{
       //e.target.style['background']="rgb(51,102,204)";
	}
	handleLayouOneMouseOut=(e)=>{
       this.setState((preState)=>{
       	return ({
       		showExchange:!preState.showExchange
       	})
       })
	}
	render(){
		const {showExchange}=this.state;
        const {dataSource}=this.props;
		return (
          <div className="qhx-exchange">
              <div className="qhx-exchange-layerone " onClick={this.handleClick} 
              style={{display:showExchange?'none':'inline-flex'}}>
                  <img src={download}/><span>立即下载</span>
              </div>
              <div className="qhx-exchange-layertwo" style={{display:showExchange?'block':'none'}}>
                  <ul onMouseEnter={this.handleLayouOneMouseIn} onMouseLeave={this.handleLayouOneMouseOut}>
                    {
	                  dataSource.map((item,index)=>{
	                  	 return (
		                  	 <li key={`exchange-row-${index}`}>
                                {
                                	item.map((itemData,idx)=>{
                                	return (
                                       <div key={`row-item-${idx}`}>
                                            <span className='dl-content'>{itemData}</span>
                                            <span className='dl-text'>下载</span>
                                       </div>
                                	   )
                                    })
                                }
		                  	 </li>)
	                  })
	                }  
                  </ul>
              </div>
          </div>
		)
	}
}
export default Exchange;