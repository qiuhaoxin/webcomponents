import React,{Component} from 'react';
import {DefaultPlayer as Video} from 'react-html5video';
import './video.less';

export default class App extends Component{

  render(){
    return (
       <Video
          autoPlay muted 
          controls={['PlayPause','Seek','Time','Volume','Fullscreen']}
          onCanPlayThrough={
            ()=>{

            }
          }

       >
         <source src="http://k3mobile.kingdee.com:8800/wise/DowloadServer/video/01K3WISE.mp4" type="video/webm" />
       </Video>
    )
  }
}


/*
*             <Carouset dataSource={this.state.imgArr}></Carouset>
              <Tab tabArr={this.state.tabArr}/>

              pages help
             <div className='help-title-one'>
                 <div>手册资料</div>
              </div>
                <ImgText dataSource={this.state.imgTabArr} layout={'row'} mouseover={this.handleMouseOver} mouseout={this.handleMouseout} imgTextClick={this.handleImgTextClick}/>
                <ImgText dataSource={this.state.imgTabArr2} layout={'row'} mouseover={this.handleMouseOver} mouseout={this.handleMouseout} imgTextClick={this.handleImgTextClick}/>
              <div className='help-title-one'>
                 <div>常见问题</div>
          </div>
                <ImgText dataSource={this.state.imgTabArr3} layout={'row'} mouseover={this.handleMouseOver} mouseout={this.handleMouseout} imgTextClick={this.handleImgTextClick}/>
                <div className='help-title-one'>
                 <div>视频资料</div>
          </div>
          <ImgText dataSource={this.state.imgTabArr4} layout={'column'} className={'help-imgtext-vedio'} maskerRender={this.handleMaskerRender}/>
          <ImgText dataSource={this.state.imgTabArr5} layout={'column'} className={'help-imgtext-vedio'} maskerRender={this.handleMaskerRender}/>


          pages download 


                           <ImgText dataSource={this.state.imgTabArr6} layout="column" className='download-imgtext' mouseover={this.handleMouseOver2} mouseout={this.handleMouseout2}/>
                 <div>
                    <span>其他相关下载</span>
                    <ImgText dataSource={this.state.imgTabArr7} layout="row" className='dll-imgtext'/>
                 </div>
                 <div>
                    <span>视频资料下载</span>
                    <ImgText dataSource={this.state.imgTabArr8} layout="row" className='video-imgtext'/>
                    <ImgText dataSource={this.state.imgTabArr9} layout="row" className='video-imgtext'/>
                    <ImgText dataSource={this.state.imgTabArr10} layout="row" className='video-imgtext'/>
                    <ImgText dataSource={this.state.imgTabArr11} layout="row" className='video-imgtext'/>
                 </div>
















                              <Masker visible={false}/>

             <button onClick={this.handleBtnClick} style={{marginTop:'100px',marginLeft:'100px'}}>Click</button>
             <Modal 
                title="Test"
                onOk={this.handleBtnOk}
                visible={modalVisible}
                onCancel={this.handleCancel}
             >
                <div>
                   <div className="modal-row">
                     <div className="modal-row-item"><label>用户类型:</label><Select value="" defaultValue="客户" dataSource={['客户','伙伴代理','分公司机构']}></Select>  </div>           
                     <div className="modal-row-item"><label>机构名称:</label><input placeholder="请输入机构名称" value={goverment} onChange={(e)=>this.handleInput(e,"goverment")}/></div>
                   </div>
                   <div className="modal-row">
                     <div className="modal-row-item"><label>省    份:</label>
                     <Select value={provinceVal} onChange={(value)=>this.handleSelect(value)} defaultValue={provinceVal} 
                     dataSource={this.provinceData}></Select></div>           
                     <div className="modal-row-item"><label>市:</label><Select value="" defaultValue="北京" dataSource={this.provinceData}></Select></div>
                   </div>
                   <div className="modal-row">
                     <div className="modal-row-item"><label>联系人:</label>
                     <input placeholder="请填写联系人姓名" value={concat} onChange={(e)=>this.handleInput(e,"concat")}/></div>           
                     <div className="modal-row-item"><label>电话:</label><input placeholder="请输入电话号码" value={tel} onChange={(e)=>this.handleInput(e,"tel")}/></div>
                   </div>
                </div>
             </Modal>


*/







/*
import React,{Component} from 'react';
import Carouset from '../../src/components/carouset';
import './index.less'

import image1 from './images/mobile_n.jpg';
import image2 from './images/mobile_m.jpg';
const images=[image1,image2];
export default class App extends Component{
 
     constructor(props){
        super(props);
        this.imgArr=[
              {imgPath:require('./images/mobile_m.jpg'),id:0,imgName:'test'},
              {imgPath:require('./images/mobile_n.jpg'),id:1,imgName:'test'}
        ];
       this.state={
      // imgArr:[
      //         {imgPath:require('./images/mobileImg.jpg'),imgName:'test'},
      //         {imgPath:require('./images/mobileImg3.jpg'),imgName:'test'}
      //   ],

        imgArr:[
           {src:image1,imgName:'test',index:0},
           {src:image2,imgName:'test',index:1}
        ],
        index:0,
    }
     }
     // state={
     //    curIndex:(0),

     // }
       movePre=()=>{
    this.setState(preState=>({
      index:((preState.index + images.length - 1) % images.length)
    }))
  }
  moveNext=()=>{
    this.setState(preState=>({
      index:((preState.index - 1 + images.length) % images.length)
    }))
  }
     render(){
        const {imgArr,index}=this.state;
        return (
           <div>
              <Carouset
               mainSrc={images[index]}
               nextSrc={images[(index + 1 +images.length) % images.length]}
               preSrc={images[(index - 1 + images.length) % images.length]}
               onMovePreRequest={this.movePre}
               onMoveNextRequest={this.moveNext}
               onImageLoadError={App.onImageLoadError}
               animationDisabled={false}
             ></Carouset>
           </div>
        )
     }
}
*/