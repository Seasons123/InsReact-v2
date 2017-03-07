import React from 'react';
import {render} from 'react-dom';
import '../../../css/insurance/components/commonTopSupnuevo.css';
import '../../../css/insurance/components/navcontent.css';
import '../../../css/insurance/components/pagination.css';
import '../../../css/insurance/components/productIntroduction.css';
import '../../../css/insurance/components/buyPage.css';
import Footer from '../modules/Footer';
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
    onSaveInput:function(event){

        this.setState({value: event.target.value});

    },
    insFeeCompute:function () {
        if($('#insFeeCompute').val()=="修改"){
            $(this.refs["attach"+1]).attr("disabled","disabled");//禁止附加险
            $('#insFeeCompute').attr("value","计算保费");
            $('#Insurant').removeAttr("disabled");
            $('#insFeeType').removeAttr("disabled");
            $('#insBasicFee').removeAttr("disabled");
            // $(this.refs[""]).removeAttr("disabled");//保险费
        }else {
            $(this.refs["attach"+1]).removeAttr("disabled");//开放附加险
            $('#insFeeCompute').attr("value","修改");
            $('#Insurant').attr("disabled","disabled");
            $('#insFeeType').attr("disabled","disabled");
            $('#insBasicFee').attr("disabled","disabled");
            // $(this.refs[""]).attr("","");//保险费
        }

    },
    initialData:function(){
        this.getInsurant();
    },
    getInitialState: function() {
        return {
            selectInsurant:null,
            selectInsFeeType:null
        }
    },
    render:function () {

        if(this.state.data!==null&&this.state.data!==undefined){
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
                            国华康运一生疾病保险</span>
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
                                        终身
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
                                        年交
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
                                            <option>5年</option>
                                            <option>10年</option>
                                            <option>15年</option>
                                            <option>20年</option>
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
                                        <input id="insBasicFee" onChange={this.onSaveInput.bind(this)}type="text" name="user_BasicFee"/>
                                    </td>
                                    <td className="plan_td_3">&nbsp;
                                        <span >*</span>
                                        <span id="insBirthday_err" style={{color: 'red', paddingLeft: '5px'}}></span>
                                        <input id="insFeeCompute" onClick={this.insFeeCompute}  style={{padding: '2.5px 10px'}} type="button" name="user_compute" value="计算保费"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">保险费：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2">
                                        ？？？
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
                            <div className="addInsPro">
                                <input type="checkbox" ref={'attach'+1} disabled="disabled"/>
                                附加：国华附加意外伤害保险
                                <span style={{color:'blue',paddingLeft:'5px'}}>被保人年龄范围在28 天-55周岁之间方可附加本险种</span>
                            </div>
                            <div className="addInsPro">
                                <input type="checkbox" />
                                附加：国华附加意外伤害保险
                                <span style={{color:'blue',paddingLeft:'5px'}}>被保人年龄范围在28 天-55周岁之间方可附加本险种</span>
                            </div>
                            <div className="addInsPro">
                                <input type="checkbox" />
                                附加：国华附加意外伤害保险
                                <span style={{color:'blue',paddingLeft:'5px'}}>被保人年龄范围在28 天-55周岁之间方可附加本险种</span>
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