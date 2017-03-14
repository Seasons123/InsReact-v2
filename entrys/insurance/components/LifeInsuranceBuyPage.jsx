import React from 'react';
import {render} from 'react-dom';
import '../../../css/insurance/components/commonTopSupnuevo.css';
import '../../../css/insurance/components/navcontent.css';
import '../../../css/insurance/components/pagination.css';
import '../../../css/insurance/components/productIntroduction.css';
import '../../../css/insurance/components/buyPage.css';
import Footer from '../modules/Footer';
var SyncStore = require('../../../components/flux/stores/SyncStore');
var ProxyQ = require('../../../components/proxy/ProxyQ');
var LifeInsuranceBuyPage = React.createClass({
    getInsurant:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterScorePage',
            reactActionName:'getInsurant'
        };
        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function(ob) {
                this.setState({data:ob.data});
            }.bind(this),

            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    getSelectedInsurant:function(){
        var selected=$('#Insurant option:selected').val();
        this.state.selectInsurant=selected;
    },
    getSelectInsFeeType:function () {
        var selected=$('#insFeeType option:selected').val();
        this.state.selectInsFeeType=selected;
    },
    computeAttachInsFee:function (i,productId,insuranceQuota) {
        var attachInsFee =$('#baseAttachInsFee'+i).val();
        var a=attachInsFee/insuranceQuota;
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insuranceLifeProductCenterPage',
            reactActionName:'getMeasure',
            productId:productId,
            val:a,
            payYears:this.state.selectInsFeeType,
            personId:this.state.selectInsurant
        };
        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function(ob) {
                $('#attachInsFeeResult'+i).attr("placeholder",ob.data)
                $('#attachInsFeeCompute'+i).attr("value","修改");
                $('#baseAttachInsFee'+i).attr("disabled","disabled");
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    onSaveInput:function(event){

        this.setState({value: event.target.value});

    },
    insFeeCompute:function (productId,a) {
        var n=this.state.attachIns.length;
        if($('#insFeeCompute').val()=="修改"){
            for(var i=0;i<n;i++){
                $(this.refs["attach"+i]).attr("disabled","disabled");//禁止附加险
                $(this.refs["attach"+i]).attr("checked",false);
                $('#addInsModal'+i).attr("hidden",true);
            }
            $('#insFeeCompute').attr("value","计算保费");
            $('#Insurant').removeAttr("disabled");
            $('#insFeeType').removeAttr("disabled");
            $('#insBasicFee').removeAttr("disabled");
            this.setState({"measure":null});
            // $(this.refs[""]).removeAttr("disabled");//保险费
        }else {
            for(var i=0;i<n;i++){
                $(this.refs["attach"+i]).removeAttr("disabled");//开放附加险
            }
            $('#Insurant').attr("disabled","disabled");
            $('#insFeeType').attr("disabled","disabled");
            $('#insBasicFee').attr("disabled","disabled");
            // $(this.refs[""]).attr("","");//保险费
            //查询保费
            var url="/insurance/insuranceReactPageDataRequest.do";
            var params={
                reactPageName:'insuranceLifeProductCenterPage',
                reactActionName:'getMeasure',
                productId:productId,
                val:a,
                payYears:this.state.selectInsFeeType,
                personId:this.state.selectInsurant
            };
            ProxyQ.queryHandle(
                'post',
                url,
                params,
                null,
                function(ob) {
                    this.setState({measure:ob.data});
                    $('#insFeeCompute').attr("value","修改");
                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }

    },
    showInsAddDetail:function (n) {

        if($('#attach'+n).get(0).checked==true){
            $('#addInsModal'+n).removeAttr("hidden");
        }else {
            $('#addInsModal'+n).attr("hidden",true);
        }

    },
    initialData:function(){
        this.getInsurant();
    },
    getInitialState: function() {
        var temporaryStore=SyncStore.getPageData();
        var insInfo=temporaryStore[0];
        var attachIns=temporaryStore[1];
        return {
            selectInsurant:0,
            selectInsFeeType:2,
            insInfo:insInfo,
            attachIns:attachIns,
            measure:null

        }
    },
    render:function () {

        if(this.state.data!==null&&this.state.data!==undefined){
            var productName=this.state.insInfo.insuranceLifeProduct.productName;
            var safeGuardPeriod=this.state.insInfo.safeGuardPeriod;
            var paymentType=this.state.insInfo.paymentType;
            var productId=this.state.insInfo.productId;
            var paymentPeriod=this.state.insInfo.paymentPeriod;
            var insuranceQuota=this.state.insInfo.insuranceLifeProduct.insuranceQuota;
            var attach=this.state.attachIns;
            var attach_item=[];
            var ref=this;
            attach.map(function (item,i) {
                attach_item.push(
                    <div key={i}>
                                <span >
                                    <input type="checkbox" onChange={ref.showInsAddDetail.bind(this,i)} ref={'attach'+i} id={'attach'+i} disabled="disabled"/>
                                    附加：{item.productName}
                                </span>
                        <span style={{color:'blue',paddingLeft:'5px'}}>被保人年龄范围在28 天-55周岁之间方可附加本险种</span>
                        <div id={"addInsModal"+i} hidden="hidden">
                            <table className="planContain insAdd">
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">基本保险金额：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2" >
                                        <input  id={"baseAttachInsFee"+i} type="text" />
                                    </td>
                                    <td className="plan_td_3">&nbsp;
                                        <span >*</span>
                                        <span style={{color: 'red', paddingLeft: '5px'}}></span>
                                        <input id={"attachInsFeeCompute"+i} style={{padding: '2.5px 10px'}} type="button"  value="计算保费" onClick={ref.computeAttachInsFee.bind(this,i,item.productId,item.insuranceQuota)}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">保险费：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2" >
                                        <input style={{borderStyle:'none'}} disabled="disabled"  id={"attachInsFeeResult"+i} type="text"/>
                                    </td>
                                    <td ></td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td colSpan="4" style={{textAlign:'left',color: 'blue'}}>被保人年龄范围在28 天-55周岁之间方可附加本险种！</td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                )
            })
            var data=this.state.data;
            var rrs=[];//相关人员项
            var myRelative=data;
            myRelative.map(function(item,i){
                rrs.push(
                    <option key={i} value={item.personId}>{item.perName}</option>
                )
            });
        }else {
            this.initialData();
        }
        return(
            <div>
                <div className="buyPage margin">
                    <div className="w900 margin">
                    <div className="topLogo">
                        <img src="images/logo_02.png" />
                    </div>
                        <div className="MenuItem_select" >
                            <table className="menuTable" >
                                <tr>
                                    <td style={{width:"45px", height:"32px"}}>&nbsp;</td>
                                    <td className="menuItems item_select">
                                        1&nbsp;<span>选择保险计划</span></td>
                                    <td className="menuImg"> <img src="images/menuRight1.png"   /> </td>
                                    <td className="menuItems">
                                        2&nbsp;<span>填写投保信息</span></td>
                                    <td className="menuImg"><img src="images/menuRight1.png"  /> </td>
                                    <td className="menuItems">
                                        3&nbsp;<span>投保确认</span></td>
                                    <td className="menuImg"><img src="images/menuRight1.png"  /> </td>
                                    <td className="menuItems">
                                        4&nbsp;<span>支付并获得保单</span></td>
                                </tr>
                            </table>
                        </div>
                    <div className="insuranceName" >
                        <span className="nameTitle" style={{paddingLeft: '50px',fontSize: '16px',fontWeight: 'bold',color: 'rgb(44, 126, 235)'}}>
                            {productName}</span>
                    </div>
                        <div className="insurancePlan">
                            <div className="article">
                            <h3 className="font_15 text">填写您的保险计划</h3>
                            </div>
                            <table className="planContain">
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">被保险人：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2">
                                        <select style={{width:'130px'}} onChange={this.getSelectedInsurant} id="Insurant" >
                                            <option value={0}>自己</option>
                                            {rrs}
                                        </select>
                                    </td>
                                    <td className="plan_td_3">&nbsp;
                                        <span >*</span>
                                        <span id="insBirthday_err" style={{color: 'red', paddingLeft: '5px'}}></span></td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">保险期间：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2" >
                                        {safeGuardPeriod}
                                    </td>
                                    <td ></td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">缴费方式：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2" >
                                        {paymentType}
                                    </td>
                                    <td ></td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">缴费期间：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2" >
                                        <select style={{width:'130px'}} onChange={this.getSelectInsFeeType} id="insFeeType"  name="user_feeType">
                                            <option value={2}>5年</option>
                                            <option value={3}>10年</option>
                                            <option value={4}>15年</option>
                                            <option value={5}>20年</option>
                                        </select>

                                    </td>
                                    <td ></td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">基本保险金额：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2" >
                                        <input id="insBasicFee" onChange={this.onSaveInput.bind(this)} type="text" name="user_BasicFee"/>
                                    </td>
                                    <td className="plan_td_3">&nbsp;
                                        <span >*</span>
                                        <span id="insBirthday_err" style={{color: 'red', paddingLeft: '5px'}}></span>
                                        <input id="insFeeCompute" onClick={this.insFeeCompute.bind(this,productId,this.state.value/insuranceQuota,)}  style={{padding: '2.5px 10px'}} type="button" name="user_compute" defaultValue={"计算保费"} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">保险费：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2">
                                        {this.state.measure}
                                    </td>
                                    <td ></td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>

                            </table>
                            <div className="insWarn">
                                本合同最低基本保险金额：0-49周岁（含）为5万元保额，50周岁-55周岁（含） 3万元保额。基本保险金额以万元为递增单位。
                            </div>
                            <div className="article">
                            <h3 className="font_15 text">选择您的附加产品</h3>
                            </div>
                            <div className="addInsPro" id="addInsPro">
                                {attach_item}
                            </div>
                            <div style={{margin: '25px 0px 45px 365px'}} >
                                <input className="nextTo" value="下一步" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>)
    }
});
module.exports=LifeInsuranceBuyPage;