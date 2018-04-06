import React,{Component} from 'react';
import classNames from 'classnames';
import './index.less'

class ImgText extends Component{
	constructor(props){
		super(props);
		this.classNameStr="";
		this.prefixcls="qhx-imgtext";
		this.state={
           dataArr:[]
		}
	}
	componentDidMount(){
        const {dataSource,className,showMask,layout}=this.props;
        this.classNameStr=classNames([
           `${this.prefixcls}`,
           [`${this.prefixcls}-showMask`]:showMask
        ],className);
        this.setState({
        	dataArr:dataSource
        })

	}
	handleClick=(e)=>{

	}
  handleMouseover=(e)=>{
    console.log("mouseover");
    const {mouseover}=this.props;
    let target=e.target;
    if(target.tagName!='LI'){
       target=target.parentNode;
       if(target.tagName!='LI'){
        target=target.parentNode;
       }
    }
    if(mouseover)mouseover(target);

  }
  hanleMouseout=(e)=>{
    const {mouseout}=this.props;
    console.log("mouseout");
    let target=e.target;
    if(target.tagName!='LI'){
       target=target.parentNode;
       if(target.tagName!='LI'){
        target=target.parentNode;
       }
    }
    if(mouseout)mouseout(target);
  }
	
	render(){
		const {dataArr}=this.state;
    const {layout,haveMasker,maskerRender}=this.props
		return (
           <div className={this.classNameStr} onClick={this.handleClick}>
             <ul>
               {
               	   dataArr.map((item,index)=>{
                      return (
                         <li key={`qhx-imgtext-${index}`} className={`${this.prefixcls}-${layout}`} onMouseEnter={this.handleMouseover} onMouseLeave={this.hanleMouseout}>
                             <div className={`${this.prefixcls}-img`}>
                                 <img src={item.imgPath}/>
                             </div>
                             <div className={`${this.prefixcls}-text`}>
                                <span className={`${this.prefixcls}-text-title`}>{item.title}</span>
                                <span className={`${this.prefixcls}-text-desc`}>{item.desc}</span>
                                {
                                  item.innerRender?item.innerRender():null
                                }
                             </div>
                             {
                                 item.render?item.render():null
                             }
                             {
                                 maskerRender?maskerRender():null
                             }
                         </li>
                      )
               	   })
               }
             </ul>
           </div>
		)
	}
}
export default ImgText;