import React from 'react';
import {render} from 'react-dom';
import '../../../css/insurance/components/commonTopSupnuevo.css';
import '../../../css/insurance/components/navcontent.css';
import '../../../css/insurance/components/pagination.css';
import '../../../css/insurance/components/productIntroduction.css';
import '../../../css/insurance/components/buyPage.css';
import Footer from '../modules/Footer';
var LifeInsuranceBuyPage = React.createClass({


    render:function () {
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
                                    <td className="plan_td_1">被保险人出生日期：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2"><input id="insBirthday" type="date" name="user_birthday"/></td>
                                    <td className="plan_td_3">&nbsp;
                                        <span >*</span>
                                        <span id="insBirthday_err" style={{color: 'red', paddingLeft: '5px'}}></span></td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">被保险人性别：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2" >
                                        <div style={{float:'left'}}>
                                        <input id="insBirthday" type="radio" name="user_sex"/>
                                        <span>男</span>
                                        </div>
                                        <div style={{float:'left',paddingLeft:'20px'}}>
                                        <input id="insSex" type="radio" name="user_sex"/>
                                        <span>女</span>
                                        </div>
                                    </td>
                                    <td ></td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">被保险人职业：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2" >
                                            <input id="insWork" type="text" name="user_work"/>
                                    </td>
                                    <td ></td>
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
                                        <select style={{width:'130px'}} id="insFeeType"  name="user_feeType">
                                            <option>5年</option>
                                            <option>10年</option>
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
                                        <input id="insBasicFee" type="text" name="user_BasicFee"/>
                                    </td>
                                    <td className="plan_td_3">&nbsp;
                                        <span >*</span>
                                        <span id="insBirthday_err" style={{color: 'red', paddingLeft: '5px'}}></span>
                                        <input id="insFeeCompute" style={{padding: '2.5px 10px'}} type="button" name="user_compute" value="计算保费"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="plan_line" colSpan="4"></td>
                                </tr>
                                <tr className="plan_tr">
                                    <td className="plan_td_1">保险费：</td>
                                    <td width="5px"></td>
                                    <td className="plan_td_2" >
                                        1000
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
                                <input type="checkbox" />
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