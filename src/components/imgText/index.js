import React,{Component} from 'react';
import classNames from 'classnames';
import './index.less'

class ImgText extends Component{
	constructor(props){
		super(props);
		this.classNameStr="";
		this.prefixcls="qhx-imgtext";
		this.state={
        dataArr:[],
        showMask:false,
		};
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
  handleMouseover=(e,item)=>{
    e.preventDefault();
    const {mouseover,haveMasker}=this.props;
    let target=e.target;
    if(target.tagName!='LI'){
       target=target.parentNode;
       if(target.tagName!='LI'){
        target=target.parentNode;
       }
    }
    if(mouseover)mouseover(target,item);

  }
  hanleMouseout=(e,item)=>{
    e.preventDefault();
    const {mouseout,haveMasker}=this.props;
    let target=e.target;
    if(target.tagName!='LI'){
       target=target.parentNode;
       if(target.tagName!='LI'){
        target=target.parentNode;
       }
    }
    if(mouseout)mouseout(target,item);
  }
	handleClick=(e,item)=>{
     e.preventDefault();
     const {imgTextClick}=this.props;
     if(imgTextClick)imgTextClick(e,item);
  }
	render(){
    //onClick={this.handleClick}
		const {dataArr}=this.state;
    const {layout,haveMasker,maskerRender}=this.props
		return (
           <div className={this.classNameStr}>
             <ul>
               {
               	   dataArr.map((item,index)=>{
                      return (
                         <li key={`qhx-imgtext-${index}`} className={`${this.prefixcls}-${layout}`}  onClick={(e)=>this.handleClick(e,item)}
                         onMouseEnter={(e)=>this.handleMouseover(e,item)} onMouseLeave={(e)=>this.hanleMouseout(e,item)} style={{visibility:item.title==''?'hidden':'visible'}}>
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
                                 (maskerRender && item['showMasker'])?maskerRender(item):null
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