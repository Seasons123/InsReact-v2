/**
 * Created by douxiaobin on 2017/03/4.
 */
import React from 'react';
import { render } from 'react-dom';

import '../../../css/insurance/components/personInfoBase.css';
import '../../../css/insurance/components/personInfoLayout.css';

import Upload from './Upload.jsx';
import Calendar from '../../../components/basic/Calendar.jsx';
import carData from '../data/carData.json';

var ProxyQ = require('../../../components/proxy/ProxyQ');
var today=new Date().toLocaleDateString().replace("/", "-").replace("/", "-");

var RelatedCarInfo=React.createClass({

    //显示提示框，目前三个参数(txt：要显示的文本；time：自动关闭的时间（不设置的话默认1500毫秒）；status：默认0为错误提示，1为正确提示；)
    showTips:function(txt,time,status) {
        var htmlCon = '';
        if(txt != ''){
            if(status != 0 && status != undefined){
                htmlCon = '<div class="tipsBox" style="width:220px;padding:10px;background-color:#4AAF33;border-radius:4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;color:#fff;box-shadow:0 0 3px #ddd inset;-webkit-box-shadow: 0 0 3px #ddd inset;text-align:center;position:fixed;top:25%;left:50%;z-index:999999;margin-left:-120px;">'+txt+'</div>';
            }else{
                htmlCon = '<div class="tipsBox" style="width:220px;padding:10px;background-color:#D84C31;border-radius:4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;color:#fff;box-shadow:0 0 3px #ddd inset;-webkit-box-shadow: 0 0 3px #ddd inset;text-align:center;position:fixed;top:25%;left:50%;z-index:999999;margin-left:-120px;">'+txt+'</div>';
            }
            $('body').prepend(htmlCon);
            if(time == '' || time == undefined){
                time = 1500;
            }
            setTimeout(function(){ $('.tipsBox').remove(); },time);
        }
    },

    checkBoxChange:function(ob){ //根据是否是车主 和是否是过户二手车显示 车主身份证 和 过户日期
        switch(ob){
            case 'isOwner':
                var carInfo=this.refs.carInfo;
                var value=$(carInfo).find("input[name='isOwner']:checked").val();
                if(value!==undefined && value!==null) {
                    this.setState({isOwner: true})
                } else{
                    this.setState({isOwner: null})
                }
                break;
            case 'isSecondHand':
                var carInfo=this.refs.carInfo;
                var value=$(carInfo).find("input[name='isSecondHand']:checked").val();
                if(value!==undefined && value!==null) {
                    this.setState({isSecond: true})
                } else{
                    this.setState({isSecond: null})
                }
                break;
        }
    },

    selectChanged:function(){
        var carCity=$('#carCity option:selected').val(); //根据用车城市确定车牌前缀
        var carInfo = this.refs.carInfo;
        carData.map(function(item, i){
            if(item.city == carCity){
                $(carInfo).find("input[name='carNum']").val(item.carNum);
            }
        });
    },

    doSaveCarInfo:function(){
        var carInfo = this.refs.carInfo;

        var carCity=$('#carCity option:selected').val()
        var carNum=$(carInfo).find("input[name='carNum']").val();
        var ownerName=$(carInfo).find("input[name='ownerName']").val();
        var isOwner=$(carInfo).find("input[name='isOwner']:checked").val();
        var isSecondHand=$(carInfo).find("input[name='isSecondHand']:checked").val();
        var perIdCard=$(carInfo).find("input[name='perIdCard']").val();
        var transferDate=$(carInfo).find("input[name='transferDate']").val();
        var factoryNum=$(carInfo).find("input[name='factoryNum']").val();
        var engineNum=$(carInfo).find("input[name='engineNum']").val();
        var frameNum=$(carInfo).find("input[name='frameNum']").val();
        var registerDate=$(carInfo).find("input[name='registerDate']").val();
        var issueDate=$(carInfo).find("input[name='issueDate']").val();

        if (carCity == '请选择用车城市') {
            this.showTips('请选择用车城市~');
        } else if (carNum == "") {
            this.showTips('请填写车牌号~');
        } else if (carNum.length<7) {
            this.showTips('请填写正确的车牌号~');
        } else if (ownerName == "") {
            this.showTips('请填写姓名~');
        } else if (isOwner !== undefined && isOwner !== null && perIdCard == "") {
            this.showTips('请填写车主身份证号~');
        } else if (isOwner !== undefined && isOwner !== null && perIdCard.length<18) {
            this.showTips('请填写正确的车主身份证号~');
        } else if (isSecondHand !== undefined && isSecondHand !== null && transferDate == "") {
            this.showTips('请选择过户日期~');
        } else if (factoryNum == "") {
            this.showTips('请填写场牌型号~');
        } else if (engineNum == "") {
            this.showTips('请填写发动机号~');
        } else if (engineNum.length<6) {
            this.showTips('至少输入6位发动机号~');
        }else if (frameNum == "") {
            this.showTips('请填写车架号~');
        } else if (frameNum.length<17) {
            this.showTips('请填写17位车架号~');
        } else if (registerDate == "") {
            this.showTips('请选择注册日期~');
        } else if (issueDate == "") {
            this.showTips('请选择发证日期~');
        } else {
            var url="/insurance/insuranceReactPageDataRequest.do";
            var params={
                reactPageName:'insurancePersonalCenterPersonInfo',
                reactActionName:'addInsuranceRelatedCarInfo',
                customerId:this.state.customerId,
                carCity:carCity,
                carNum:carNum,
                ownerName:ownerName,
                perIdCard:perIdCard,
                transferDate:transferDate,
                factoryNum:factoryNum,
                engineNum:engineNum,
                frameNum:frameNum,
                registerDate:registerDate,
                issueDate:issueDate,
            };

            ProxyQ.queryHandle(
                'post',
                url,
                params,
                null,
                function(ob) {
                    var re = ob.re;
                    if(re!==undefined && re!==null && (re ==2 || re =="2")) { //登录信息为空
                        this.initialData();
                    }
                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },

    initialData:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterPersonInfo',
            reactActionName:'getInsuranceRelatedCarInfo',
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
                var customerId=ob.customerId;
                this.setState({
                    data:data,
                    customerId:customerId
                });
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState:function(){

        return ({data:null, customerId:null,
            driveLicenseImg1:null, driveLicenseImg2:null, driveLicenseImg3:null,
            isOwner:null, isSecond:null
        });
    },

    render:function(){
        var mainContent;
        var data;
        var car_trs=[];
        var carCityList=[];


        if(this.state.data!==undefined && this.state.data!==null) {
            data=this.state.data;
            data.map(function (item, i) {
                car_trs.push(
                    <tr key={i}>
                        <td>
                            {item.carNum}
                        </td>
                        <td>
                            {item.ownerName}
                        </td>
                        <td>
                            {item.firstRegisterDate}
                        </td>
                        <td>
                            {item.factoryNum}
                        </td>
                        <td>
                            {item.engineNum}
                        </td>
                        <td>
                            {item.frameNum}
                        </td>
                    </tr>
                );
            });

            carData.map(function(item, i){
                carCityList.push(<option key={i} value={item.city}>{item.city}</option>);
            });

            mainContent=
                <div ref="carInfo">
                    <div className="self_control_group">
                        <table className="table table-striped invoice-table">
                            <thead>
                            <tr>
                                <th width="300">车牌</th>
                                <th width="300">车主姓名</th>
                                <th width="300">注册日期</th>
                                <th width="300">厂牌型号</th>
                                <th width="300">发动机号</th>
                                <th width="300">车架号</th>
                            </tr>
                            </thead>
                            <tbody>
                            {car_trs}
                            </tbody>
                        </table>
                    </div>

                    <div className="article" style={{padding:'0',borderTop: '1px dashed #CCCCCC'}}>
                        <h3 className="font_15 text">添加车辆信息</h3>
                    </div>
                    <div style={{float:'left',width:'100%'}}>
                        <div className="carInfo">
                            <div style={{float:'left'}}>
                                <label className="car_label">用车城市</label>
                                <select style={{width:'200px',height:'35px'}} id="carCity" onClick={this.selectChanged.bind(this)}>
                                    {carCityList}
                                </select>
                            </div>
                            <div>
                                <label className="car_label">车&nbsp;&nbsp;&nbsp;&nbsp;牌</label>
                                <div className="self_controls">
                                    <input name="carNum" defaultValue="" maxLength='7' className="car_input"/>
                                </div>
                            </div>
                        </div>

                        <div className="carInfo">

                            <div style={{float:'left'}}>
                                <label className="car_label">姓&nbsp;&nbsp;&nbsp;&nbsp;名</label>
                                <div className="self_controls">
                                    <input name="ownerName" className="car_input" />
                                </div>
                            </div>

                            <div>
                                <div style={{float:'left'}}>
                                    <label className="car_label">是否车主</label>
                                    <div className="self_controls">
                                        <input type="checkbox" name="isOwner" className="car_input" onClick={this.checkBoxChange.bind(this,'isOwner')}/>
                                    </div>
                                </div>

                                <div>
                                    <label className="car_label" style={{width:'160px',marginLeft:'30px'}}>是否一年内过户的二手车</label>
                                    <div className="self_controls">
                                        <input type="checkbox" name="isSecondHand" className="car_input" onClick={this.checkBoxChange.bind(this,'isSecondHand')}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="carInfo">
                            {this.state.isOwner ?
                                <div style={{float:'left'}}>
                                    <label className="car_label">车主身份证</label>
                                    <div className="self_controls">
                                        <input name="perIdCard" defaultValue="" maxLength='18' className="car_input"/>
                                    </div>
                                </div> : null}

                            {this.state.isSecond ?
                                <div>
                                    <label className="car_label">过户日期</label>
                                    <div className="self_controls">
                                                <span>
                                                    <Calendar data={today} ctrlName='transferDate'/>
                                                </span>
                                    </div>
                                </div> : null}
                        </div>

                        <div className="carInfo">
                            <div style={{float:'left'}}>
                                <label className="car_label">厂牌型号</label>
                                <div className="self_controls">
                                    <input name="factoryNum" defaultValue="" className="car_input"/>
                                </div>
                            </div>
                            <div>
                                <label className="car_label">发动机号</label>
                                <div className="self_controls">
                                    <input name="engineNum" defaultValue="" className="car_input"/>
                                </div>
                            </div>
                        </div>

                        <div className="carInfo">
                            <div style={{float:'left'}}>
                                <label className="car_label">车架号</label>
                                <div className="self_controls">
                                    <input name="frameNum" defaultValue="" maxLength='17' className="car_input"/>
                                </div>
                            </div>
                            <div>
                                <label className="car_label">注册日期</label>
                                <div className="self_controls">
                                            <span>
                                                <Calendar data={today} ctrlName='registerDate'/>
                                            </span>
                                </div>
                            </div>
                        </div>

                        <div className="carInfo">
                            <div style={{float:'left'}}>
                                <label className="car_label">发证日期</label>
                                <div className="self_controls">
                                            <span>
                                                <Calendar data={today} ctrlName='issueDate'/>
                                            </span>
                                </div>
                            </div>
                        </div>

                        <div className="clear">
                        </div>

                        <div className="toolBar">
                            <a className="saveBtn btn_primary" href="javascript:void(0)" onClick={this.doSaveCarInfo.bind(this)}>保存</a>
                        </div>
                    </div>
                </div>
        }else{
            //初始化内容详情
            this.initialData();
        }

        return(
            <div >
                {mainContent}
            </div>
        );
    },
});
module.exports=RelatedCarInfo;
/**
 * Created by douxiaobin on 2017/03/4.
 */


