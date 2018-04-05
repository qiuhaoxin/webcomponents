import React,{PureComponent} from 'react';
import ClassName from 'classnames';
import './index.less';

export default class MyComponent extends PureComponent{
	constructor(props){
	  super(props);
	}
	componentWillReceiveProps(nextProps){

	}
	componentDidMount(){

	}
	render(){
	    const {height,width,type,lineColor,marginStyle,translateOffset}=this.props;
	    console.log("translateOffset is "+translateOffset);
	    const classNameStr=ClassName("wise-line",`wise-line-${type}`);

	    return <div className={classNameStr} style={{width:width,height:height,background:lineColor,margin:marginStyle,transform:`translate(${translateOffset}px,0)`}}>
 
	    </div>
	}
}

