import React,{Component} from 'react';
import Carouset from '../../src/components/carouset';
import Tab from '../../src/components/tab';
import ImgText from '../../src/components/imgText';

export default class App extends Component{

     constructor(props){
        super(props);
       this.state={
        tabImgArr:[
          {id:0,imgPath:require('./images/u217.png'),title:'经营快报',description:`\r\n \r\n \r\n \r\n \r\n \r\n \r\n为销售管理人员提供日常销售数据统计，包括销售
          趋势，销售增长率，以及按照业务员，产品，客户，部门进行销售排名`,depend:'\r\n \r\n \r\n \r\n \r\n \r\n \r\n 销售管理，应收款管理',func:`\r\n \r\n \r\n \r\n \r\n \r\n \r\n 支持销售订单，销售出库单，支持
          按日月年统计销售额度，支持图表展示趋势及排名。`,showMasker:false},
          {id:1,imgPath:require('./images/u209.png'),title:'移动审批',description:`\r\n \r\n \r\n \r\n \r\n \r\n \r\n 移动审批实现了企业管理人员即时收到流程通知通过手机终端对众多企业业务流程随时进行审批。移动审批实现了
          随时随地审批，让审批更加方便，轻松。`,depend:`\r\n \r\n \r\n \r\n \r\n \r\n \r\n 不依赖模块，K3使用了那些模块，就支持哪些模块单据的审批。单据要启用审批流，不支持
          普通审核和多级审核。新单，老单均可支持`,func:`\r\n \r\n \r\n \r\n \r\n \r\n \r\n 支持一用户对多个账套的业务进行审批，支持EBOS
          单据包括：费用（借款）申请单。费用报销单，出差（借款）申请单，差旅费报销单；支持老单包括：销售订单，采购
          订单，付款单`,showMasker:false},
          {id:2,imgPath:require('./images/u213.png'),title:'移动下单',description:`\r\n \r\n \r\n \r\n \r\n \r\n \r\n 移动下单帮助企业销售人员快速录入销售订单，并且可以支持库存查看，携带销售价格政策，追踪销售订单
          审批状态，对销售订单进行催办协作。`,depend:'\r\n \r\n \r\n \r\n \r\n \r\n \r\n 销售管理',func:`\r\n \r\n \r\n \r\n \r\n \r\n \r\n 销售订单录入。库存查询，销售价格携带
          ，商品收藏，催办协作，订单打印`,showMasker:false},
        ]};
            //供应链产品
        this.supplychain=[
            {imgPath:require('./images/alarm.png'),title:'订单预警'},
            {imgPath:require('./images/ordertracking.png'),title:'订单跟踪'},
            {imgPath:require('./images/mobileorder.png'),title:'移动下单'},
            {imgPath:require('./images/mobiledealer.png'),title:'移动经销商'},
            {imgPath:require('./images/busreport.png'),title:'经营快报'},
            {imgPath:require('./images/ordertracking.png'),title:'销售价格查询'},
        ];
            //财务管理产品
        this.caiwu=[
            {imgPath:require('./images/reimburse.png'),title:'移动报销'},
            {imgPath:require('./images/receive.png'),title:'应收款管理'},
            {imgPath:require('./images/mobiledealer.png'),title:'现金流管理'},
            {imgPath:require('./images/receive.png'),title:'费用分析'},
            {imgPath:require('./images/busreport.png'),title:'固定资产服务'},
            {imgPath:require('./images/financialinsight.png'),title:'资金洞察'},
        ];
        //企业经营管理
        this.qiye=[
            {imgPath:require('./images/mofan.png'),title:'运营魔方'},
            {imgPath:require('./images/amiba.png'),title:'阿米巴经营'},
            {imgPath:require('./images/approval.png'),title:'移动审批'},
            {imgPath:require('./images/dingzhihua.png'),title:'定制化应用'},
            {imgPath:'',title:''},
            {imgPath:'',title:''},
        ];
        //生成制造管理
        this.make=[
            {imgPath:require('./images/smartfactory.png'),title:'智慧工厂'},
            {imgPath:require('./images/code.png'),title:'K/3 二维码'},
            {imgPath:require('./images/stock.png'),title:'库存查询'},
            {imgPath:'',title:''},
            {imgPath:'',title:''},
            {imgPath:'',title:''},
        ];
        //客户关系管理
        this.relation=[
            {imgPath:require('./images/smartfactory.png'),title:'CRM微服务'},
            {imgPath:require('./images/code.png'),title:'移动CRM'},
            {imgPath:'',title:''},
            {imgPath:'',title:''},
            {imgPath:'',title:''},
            {imgPath:'',title:''},
        ]
     }
     maskerRender=(record)=>{
        return (
          <div className="product-imgtext-masker">
             <div style={{padding:'40px 30px'}}>
                <div className="product-imgtext-masker-title">{record.title}</div>
                <div className="product-imgtext-masker-desc">
                    {record.description}
                </div>
                <div>
                  <div>主要功能:</div><div>{record.func}</div>
                </div>
                <div>
                  <div>依赖模块:</div><div>{record.depend}</div>
                </div>
             </div>
          </div>
        )
     }
     handleMouseEnter=(target,item)=>{
        console.log("item is "+JSON.stringify(item));
        let {tabImgArr}=this.state;
        tabImgArr.forEach(dataItem=>{
          if(dataItem.id==item.id){
              dataItem['showMasker']=true;
          }
        })
        console.log("tabImgArr is "+JSON.stringify(tabImgArr));
        tabImgArr=tabImgArr.filter(dataItem=>dataItem.id!=-1);
        this.setState({
          tabImgArr
        })
     }
     handleMouseout=(target,item)=>{
        console.log("item is "+JSON.stringify(item));
        let {tabImgArr}=this.state;
        tabImgArr.forEach(dataItem=>{
          if(dataItem.id==item.id){
              dataItem['showMasker']=false;
          }
        });
        tabImgArr=tabImgArr.filter(dataItem=>dataItem.id!=-1);
        this.setState({
          tabImgArr
        })
     }
     render(){
      return (
         <div>
             <ImgText dataSource={this.state.tabImgArr} className="product-imgtext" maskerRender={this.maskerRender} mouseout={this.handleMouseout} mouseover={this.handleMouseEnter}/>
          </div>
      )
     }

}

/*
*              <div className="apply-pro">
                   <div className="apply-pro-title">
                       汇集在K/3 移动工作台的轻应用产品
                   </div>
                   <div className="apply-pro-title1">
                       除移动BOS定制化轻应用产品外，汇集包含财务、供应链、制造及客户关系管理领域的10+个轻应用产品
                   </div>
                   <div className="apply-pro-wrapper">
                       <div className="apply-pro-module">供应链管理</div>
                       <ImgText dataSource={this.supplychain} className="apply-imgtext"/>
                   </div>
                   <div className="apply-pro-wrapper">
                       <div className="apply-pro-module">财务管理</div>
                       <ImgText dataSource={this.caiwu} className="apply-imgtext"/>
                   </div>
                   <div className="apply-pro-wrapper">
                       <div className="apply-pro-module">企业经营管理</div>
                       <ImgText dataSource={this.qiye} className="apply-imgtext"/>
                   </div>
                  <div className="apply-pro-wrapper">
                       <div className="apply-pro-module">生产制造管理</div>
                       <ImgText dataSource={this.make} className="apply-imgtext"/>
                   </div>
                   <div className="apply-pro-wrapper">
                       <div className="apply-pro-module">客户关系管理</div>
                       <ImgText dataSource={this.relation} className="apply-imgtext"/>
                   </div>
              </div>
*/