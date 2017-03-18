/**
 * Created by douxiaobin on 2016/10/27.
 */
import React from 'react';
import { render } from 'react-dom';

import PageNavigator from '../modules/PageNavigator.jsx';

var ProxyQ = require('../../../components/proxy/ProxyQ');
var Page = require('../modules/Page');
var SyncStore = require('../../../components/flux/stores/SyncStore')

var CarOrder=React.createClass({
    paginationData:function (data,pageIndex) {
        var capacity=data.length;
        var slices=null;
        Page.getInitialDataIndex(10,capacity,pageIndex,function(ob){ //10表示每页显示10条数据
            slices=data.slice(ob.begin,ob.end);
        });
        return slices;
    },

    previousCb:function (index,isChange) { //向前跳页,isChange为true(比如5,6,7,8变为1,2,3,4)
        this.setState({pageIndex:index,isChange:isChange});
    },

    pageCb:function(index,isChange) { //进入指定页的列表，isChange为false
        this.setState({pageIndex:index,isChange:isChange});
    },
    nextCb:function(index,isChange){ //向后跳页,isChange为true (比如1,2,3,4变为5,6,7,8)
        this.setState({pageIndex:index,isChange:isChange});
    },

    detailClick:function(i){
        var data=this.state.data; //所有订单数据
        var pageIndex=this.state.pageIndex; //页面索引
        var orderDetail;
        orderDetail=data[pageIndex*10+i]; //得到点击的订单条目信息
        this.setState({orderDetail:orderDetail, currentContent:'carOrderDetail'});
    },

    return:function(tab){
        this.setState({currentContent:tab});
    },

    checkBoxChange:function(){
        var a=null;
        $("#isAgree input:checkbox:checked").each(function (index, domEle) {
            a= $(domEle).val();
        });
        if(a!==undefined&&a!==null){
           this.setState({checkBox:true});
            $("#ackQuotation").attr("style","");

        }else {
            this.setState({checkBox:false});
            $("#ackQuotation").attr("style","background:darkgrey");
        }
    },

    ack:function() {
        var orderId=this.state.orderDetail.orderId;
        var url="/insurance/insuranceReactPageDataRequest";
        var params={
           reactPageName:'insurancePersonalCenterCarOrderPage',
           reactActionName:'ackInsuranceCarOrderState',
           orderId:orderId
        };

        ProxyQ.queryHandle(
           'post',
           url,
           params,
           null,
           function(ob){

           }.bind(this),
           function(xhr, status, err) {
               console.error(this.props.url,status,err.toString());
           }.bind(this)
        );
    },

    initialData:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterCarOrderPage',
            reactActionName:'getInsuranceCarOrder'
        };

        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function(ob) {
                var re = ob.re;
                if(re!==undefined && re!==null && (re ==2 || re =="2")) { //登录信息为空
                    return;
                }
                var data=ob.data;
                this.setState({data:data});
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState:function(){ //currentContent 用于右侧面板的显示
        return ({currentContent:'carOrder', data:null,checkBox:false,
            pageIndex:0, orderDetail:null, isChange:false});
    },

    render:function(){

        var mainContent=null;
        var orders=[];
        var trs=[];
        var detail_trs=[]; //订单信息
        var insurer_trs=[]; //投保人信息（车险、寿险）
        var insuranceder_trs=[]; //被保险人信息（车险、寿险）
        var carInfo_trs=[]; //汽车详细（车险的）
        var product_trs=[]; //产品信息（车险的、寿险）
        var carOrderList=null; //车险订单列表
        var data;
        var ack=null;

        var slideDetail=this.detailClick;
        var ins=this;  //用在map()函数里面，外面的this不能在里面用
        if(this.state.data!==undefined&&this.state.data!==null) {
            carOrderList = this.state.data;
            data = this.paginationData(this.state.data, this.state.pageIndex);
            data.map(function (order, i) {
                orders.push({orderNum: order.orderNum});
                trs.push(
                    <tr key={i}>
                        <td>
                            <a href="javascript:void(0)" onClick={slideDetail.bind(ins,i)}>{order.orderNum}</a>
                        </td>
                        <td>
                            {order.insuranceNum}
                        </td>
                        <td>
                            {order.productName}
                        </td>
                        <td>
                            {order.orderDate}
                        </td>
                        <td>
                            {order.orderStateStr}
                        </td>
                        <td>
                            {order.companyName}
                        </td>
                        <td>
                            {order.insuranceFeeTotal}
                        </td>
                    </tr>
                );
            });

            if (this.state.orderDetail !== undefined && this.state.orderDetail !== null) {
                var orderDetail = this.state.orderDetail;
                var product = orderDetail.product;
                var insurer = orderDetail.insurer;
                var insuranceder = orderDetail.insuranceder;
                var carInfo = orderDetail.carInfo;
                var orderState = orderDetail.orderState;

                if (orderState == 3 || orderState == "3") { //表示已报价,需要用户进行确认
                    ack = true;
                }

                detail_trs.push( //订单信息
                    <tr key={0}>
                        <td>订单号：{orderDetail.orderNum}</td>
                        <td>保单号：{orderDetail.insuranceNum}</td>
                        <td>订单状态：{orderDetail.orderStateStr}</td>
                        <td>申请时间：{orderDetail.applyTime}</td>
                        <td>缴费时间：{orderDetail.feeDate}</td>
                    </tr>
                );
                detail_trs.push(
                    <tr key={1}>
                        <td>订单时间：{orderDetail.orderDate}</td>
                        <td>保险公司：{orderDetail.companyName}</td>
                        <td>投保人perId：{orderDetail.insurerId}</td>
                        <td>被保险人perId：{orderDetail.insurancederId}</td>
                        <td>受益人perId：{orderDetail.benefiterId}</td>
                    </tr>
                );
                detail_trs.push(
                    <tr key={2}>
                        <td>客户：{orderDetail.customerName}</td>
                        <td>商业基准保费：{orderDetail.insuranceBusinessFee}</td>
                        <td>商业险折扣：{orderDetail.businessDiscount}</td>
                        <td>交强险基准保费：{orderDetail.insuranceCompulsoryFee}</td>
                        <td>交强险折扣：{orderDetail.compulsoryDiscount}</td>
                    </tr>
                );
                detail_trs.push(
                    <tr key={3}>
                        <td>车船税：{orderDetail.carTax}</td>
                        <td>签单保费：{orderDetail.contractFee}</td>
                        <td>佣金：{orderDetail.commission}</td>
                        <td>积分：{orderDetail.score}</td>
                        <td>邮寄地址：{orderDetail.customerMailAddress}</td>
                    </tr>
                );
                detail_trs.push(
                    <tr key={4}>
                        <td>邮编：{orderDetail.customerMailPostcode}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                );

                if (product !== undefined && product !== null) {
                    product.map(function (item, i) {
                        product_trs.push( //产品信息
                            <tr key={i}>
                                <td>产品编号：{item.productNum}</td>
                                <td>产品名称：{item.productName}</td>
                                <td>保额：{item.insuranceType}</td>
                                <td>保费：{item.insuranceFeeTotal}</td>
                                <td>车船税：{item.carTax}</td>
                            </tr>
                        );
                    });
                }
                if (insurer !== undefined && insurer !== null) {
                    insurer_trs.push( //投保人信息
                        <tr key={0}>
                            <td>编号：{insurer.perNum}</td>
                            <td>姓名：{insurer.perName}</td>
                            <td>身份证号：{insurer.perIdCard}</td>
                            <td>地址：{insurer.perAddress}</td>
                            <td></td>
                        </tr>
                    );
                }
                if (insuranceder !== undefined && insuranceder !== null) {
                    insuranceder_trs.push( //被保险人信息
                        <tr key={0}>
                            <td>编号：{insuranceder.perNum}</td>
                            <td>姓名：{insuranceder.perName}</td>
                            <td>身份证号：{insuranceder.perIdCard}</td>
                            <td>地址：{insuranceder.perAddress}</td>
                            <td></td>
                        </tr>
                    );
                }
                if (carInfo !== undefined && carInfo !== null) {
                    carInfo_trs.push( //行驶证信息
                        <tr key={0}>
                            <td>车牌号：{carInfo.carNum}</td>
                            <td>车辆类型：{carInfo.carType}</td>
                            <td>使用性质：{carInfo.useType}</td>
                            <td>车辆状态：{carInfo.carState}</td>
                            <td>车主姓名：{carInfo.ownerName}</td>
                        </tr>
                    );
                    carInfo_trs.push(
                        <tr key={1}>
                            <td>车主身份证号：{carInfo.ownerIdCard}</td>
                            <td>车主地址：{carInfo.ownerAddress}</td>
                            <td>品牌型号：{carInfo.factoryNum}</td>
                            <td>车辆识别代码：{carInfo.frameNum}</td>
                            <td>发动机号码：{carInfo.engineNum}</td>
                        </tr>
                    );
                    carInfo_trs.push(
                        <tr key={2}>
                            <td>注册日期：{carInfo.firstRegisterDate}</td>
                            <td>发证日期：{carInfo.issueDate}</td>
                            <td>校验日期：{carInfo.validityDate}</td>
                            <td>保险起期：{carInfo.startInsuranceDate}</td>
                            <td></td>
                        </tr>
                    );
                }
            }

            switch (this.state.currentContent) {
                case 'carOrder':
                    mainContent = (
                        <div className='carOrder'>
                            <div className="slider" ref="slider" style={{width:'100%',position:'relative'}}>
                                <div className="widget-container fluid-height">
                                    <div className="widget-content padded clearfix">
                                        <table className="table table-striped invoice-table">
                                            <thead className="table-head">
                                            <tr>
                                                <th width="300">订单编号</th>
                                                <th width="300">保单号</th>
                                                <th width="300">产品名称</th>
                                                <th width="300">订单时间</th>
                                                <th width="300">订单状态</th>
                                                <th width="300">保险公司</th>
                                                <th width="300">保费</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {trs}
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colSpan={7}>
                                                    <PageNavigator
                                                        capacity={carOrderList.length}
                                                        pageIndex={this.state.pageIndex}
                                                        pageBegin={1}
                                                        previousCb={this.previousCb}
                                                        pageCb={this.pageCb}
                                                        nextCb={this.nextCb}
                                                        isChange={this.state.isChange}
                                                        paginate={Page}
                                                        />
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>);
                    break;

                case 'carOrderDetail':
                    mainContent = (
                        <div id="order_detail">
                            <div className="widget-container fluid-height">
                                <div className="widget-content padded clearfix">
                                    <table className="table table-striped invoice-table">
                                        <thead className="table-head">
                                        <tr>
                                            <th width="300"></th>
                                            <th width="300"></th>
                                            <th width="300"></th>
                                            <th width="300"></th>
                                            <th width="300"></th>
                                        </tr>
                                        </thead>

                                        <h4 style={{marginTop:'15px'}}><strong>订单信息:</strong></h4>
                                        <tbody>
                                        {detail_trs}
                                        </tbody>

                                        <h4 style={{marginTop:'15px'}}><strong>行驶证信息:</strong></h4>
                                        <tbody>
                                        {carInfo_trs}
                                        </tbody>

                                        <h4 style={{marginTop:'15px'}}><strong>产品信息:</strong></h4>
                                        <tbody>
                                        {product_trs}
                                        </tbody>

                                        <h4 style={{marginTop:'15px'}}><strong>投保人信息:</strong></h4>
                                        <tbody>
                                        {insurer_trs}
                                        </tbody>

                                        <h4 style={{marginTop:'15px'}}><strong>被保险人信息:</strong></h4>
                                        <tbody>
                                        {insuranceder_trs}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {ack?
                                <div className="nav-return" ref="ack">
                                    <hr style={{height:'2px',border:'none',borderTop:'2px dotted #185598'}}/>

                                    <div className="clear">
                                    </div>
                                    <div className="return-and-ack">
                                        <div className="btn-return">
                                            <span>
                                                <input className="ret" type="button" value="返  回" onClick={this.return.bind(this,"carOrder")} />
                                            </span>
                                        </div>
                                        <div className="btn-ack" id="isAgree">
                                            <span>
                                                <input type="checkbox"  onChange={this.checkBoxChange} />
                                            </span>
                                            <span style={{margin:'0 50px 0 10px'}}>我同意xxxxxxxxxxxxx条款</span>
                                            <span>
                                                <input className="ack" id="ackQuotation" type="button" value="确认报价"  disabled={this.state.checkBox==true?false:true} style={{background: 'darkgrey'}}  onClick={this.ack} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="nav-return">
                                    <hr style={{height:'2px',border:'none',borderTop:'2px dotted #185598'}}/>
                                    <div className="btn-return">
                                            <span>
                                                <input className="ret" type="button" value="返  回" onClick={this.return.bind(this,"carOrder")} />
                                            </span>
                                    </div>
                                </div>
                            }

                        </div>);
                    break;
            }
        } else{
            //初始化内容详情
            this.initialData();
        }

        return(
            <div>
                {mainContent}
            </div>
        )
    }
});
module.exports=CarOrder;



