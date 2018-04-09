import React,{Component} from 'react';
import {is,fromJS} from 'immutable';
import './index.less';
import classNames from 'classnames';
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
  handleDownload=(e,data)=>{
      const {downloadEvent}=this.props;
      if(downloadEvent)downloadEvent(data);
  }
	render(){
		const {showExchange}=this.state;
        const {dataSource,imgPath}=this.props;
		return (
          <div className="qhx-exchange">
              <div className="qhx-exchange-layerone " onClick={this.handleClick} 
              style={{display:(showExchange && dataSource.length > 0 )?'none':'inline-flex'}}>
                  <img src={imgPath}/><span>立即下载</span>
              </div>
              <div className="qhx-exchange-layertwo" style={{display:(showExchange && dataSource.length>0)?'block':'none'}}>
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
                                            <span className='dl-text' onClick={(e)=>this.handleDownload(e,itemData)}>下载</span>
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