/**
 * Created by douxiaobin on 2016/10/27.
 */
import React from 'react';
import {render} from 'react-dom';
import '../../../css/insurance/components/personInfoBase.css';
import '../../../css/insurance/components/personInfoLayout.css';

import Upload from './Upload.jsx';

var ProxyQ = require('../../../components/proxy/ProxyQ');

var PersonInfo=React.createClass({

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

    doSave:function(ob){
        var customerId=ob;
        var selfPersonInfo = this.refs['selfPersonInfo'];
        var perName=$(selfPersonInfo).find("input[name='perName']").val();
        var perIdCard=$(selfPersonInfo).find("input[name='perIdCard']").val();
        var phoneNum=$(selfPersonInfo).find("input[name='phoneNum']").val();
        var postCode=$(selfPersonInfo).find("input[name='postCode']").val();
        var address=$(selfPersonInfo).find("input[name='address']").val();

        if (perName == '') {
            this.showTips('请填写您的姓名~');
        } else if (perIdCard == '') {
            this.showTips('请输入您的证件号码~');
        } else if (phoneNum == '') {
            this.showTips('请输入您的电话号码~');
        } else if (postCode == '') {
            this.showTips('请输入您的邮编~');
        } else if (address == '') {
            this.showTips('请输入您的地址~');
        } else {
            //this.showTips('提交成功~', 2500, 1);

            var url="/insurance/insuranceReactPageDataRequest.do";
            var params={
                reactPageName:'insurancePersonalCenterPersonInfo',
                reactActionName:'setInsuranceCustomerInfo',
                customerId:customerId,
                perName:perName,
                perIdCard:perIdCard,
                phoneNum:phoneNum,
                postCode:postCode,
                address:address
            };

            ProxyQ.queryHandle(
                'post',
                url,
                params,
                null,
                function(ob) {

                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },

    onChildChanged:function (ob,imgData) {
        switch(ob){
            case 'frontImg':
                this.setState({frontImg: imgData});
                break;
            case 'backImg':
                this.setState({backImg: imgData});
                break;
            case 'driveLicenseImg':
                this.setState({driveLicenseImg: imgData});
                break;
            default:
                break;
        }
    },

    handleChange:function(ob,event){
        switch(ob){
            case 'perName':
                this.setState({perName:event.target.value})
                break;
            case 'perIdCard':
                this.setState({perIdCard:event.target.value})
                break;
            case 'phoneNum':
                this.setState({phoneNum:event.target.value})
                break;
            case 'address':
                this.setState({address:event.target.value})
                break;
            case 'postCode':
                this.setState({postCode:event.target.value})
                break;
            case 'relatedName':
                this.setState({relatedName:event.target.value})
                break;
            default :
                break;
        }
    },

    uploadRelativeInfo:function(){
        var relativePersonInfo = this.refs['relativePersonInfo'];
        var relatedName=$(relativePersonInfo).find("input[name='relatedName']").val();
        var relative=$('#relative option:selected').val();

        if (relatedName == '') {
            this.showTips('请填写关联人的姓名~');
        } else if (relative == '-1' || relative == -1) {
            this.showTips('请选择关联人和你的关系~');
        } else if (this.state.frontImg == undefined || this.state.frontImg == null) {
            this.showTips('请上传关联人身份证正面照片~');
        } else if (this.state.backImg == undefined || this.state.backImg == null) {
            this.showTips('请上传关联人身份证反面照片~');
        } else {

            var url="/insurance/insuranceReactPageDataRequest.do";
            var params={
                reactPageName:'insurancePersonalCenterPersonInfo',
                reactActionName:'addInsuranceRelativeInfo',
                customerId:this.state.customerId,
                relatedName:relatedName,
                relType:relative,

                fileData1:this.state.frontImg,
                fileData2:this.state.backImg
            };

            ProxyQ.queryHandle(
                'post',
                url,
                params,
                null,
                function(ob) {
                    this.initialData;
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
            reactActionName:'getInsuranceCustomerInfo',
            customerId:this.state.customerId
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
                var selfInfo=data.selfInfo;
                var relatedInfo=data.relatedInfo;
                var carInfo=data.carInfo;
                this.setState({
                    data:data,
                    selfInfo:selfInfo,
                    relatedInfo:relatedInfo,
                    carInfo:carInfo,
                    customerId:selfInfo.customerId
                });
            }.bind(this),
            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState:function(){
        var info;
        if(this.props.info!==undefined && this.props.info!==null){
            info = this.props.info;
        }
        return ({current:info, data:null,
            selfInfo:null, customerId:null,
            relatedInfo:null, relatedName:null, frontImg:null, backImg:null,
            carInfo:null, driveLicenseImg:null
        });
    },

    componentWillReceiveProps: function(props){
        var info;
        if(props.info!==undefined && props.info!==null){
            info = props.info;
        }
        this.setState({current:info});
    },

    render:function(){
        var mainContent;
        var selfInfo;
        var relatedInfo;
        var carInfo;

        var relative_trs=[];
        var relative_add_trs=[];
        var car_trs=[];

        if(this.state.data!==undefined&&this.state.data!==null) {
            selfInfo=this.state.data.selfInfo;
            relatedInfo=this.state.data.relatedInfo;
            relatedInfo.map(function (item, i) {
                relative_trs.push(
                    <tr key={i}>
                        <td>
                            {item.relatedName}
                        </td>
                        <td>
                            {item.perIdCard}
                        </td>
                        <td>
                            {item.relTypeStr}
                        </td>
                    </tr>
                );
            });

            carInfo=this.state.data.carInfo;
            carInfo.map(function (item, i) {
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


            relative_add_trs.push(<option key={0} value={2}>{"父母"}</option>); //下拉列表
            relative_add_trs.push(<option key={1} value={3}>{"子女"}</option>);
            relative_add_trs.push(<option key={2} value={4}>{"配偶"}</option>);

            switch(this.state.current){
                case 'baseInfo':
                    mainContent=
                        <div ref="selfPersonInfo" style={{marginTop:'20px'}}>
                            <div className="self_control_group">
                                <span className="self_label">用户名</span>
                                <div className="self_controls">
                                    <input name="perName" defaultValue={selfInfo.perName || ""} onChange={this.handleChange.bind(this,"perName")} className="self_input" />
                                </div>
                            </div>
                            <div className="self_control_group">
                                <span className="self_label">身份证</span>
                                <div className="self_controls">
                                    <input name="perIdCard" defaultValue={selfInfo.perIdCard || ""} onChange={this.handleChange.bind(this,"perIdCard")} className="self_input" maxLength='18'/>
                                </div>
                            </div>
                            <div className="self_control_group">
                                <span className="self_label">电话</span>
                                <div className="self_controls">
                                    <input name="phoneNum" defaultValue={selfInfo.phoneNum || ""} onChange={this.handleChange.bind(this,"phoneNum")} className="self_input" maxLength='11'/>
                                </div>
                            </div>
                            <div className="self_control_group">
                                <span className="self_label">邮编</span>
                                <div className="self_controls">
                                    <input name="postCode" defaultValue={selfInfo.postCode || ""} onChange={this.handleChange.bind(this,"postCode")} className="self_input" maxLength='6'/>
                                </div>
                            </div>
                            <div className="self_control_group">
                                <span className="self_label">地址</span>
                                <div className="self_controls">
                                    <input name="address" defaultValue={selfInfo.address || ""} onChange={this.handleChange.bind(this,"address")} className="self_input"/>
                                </div>
                            </div>
                            <div className="toolBar">
                                <a className="saveBtn btn_primary" href="javascript:;" onClick={this.doSave.bind(this,this.state.customerId)}>保存</a>
                            </div>
                        </div>
                    break;

                case 'relatedInfo':
                    mainContent=
                        <div ref="relativePersonInfo">
                            <div className="self_control_group">
                                <table className="table table-striped invoice-table">
                                    <thead>
                                    <tr>
                                        <th width="300" style={{textAlign:'center'}}>姓名</th>
                                        <th width="300" style={{textAlign:'center'}}>证件号</th>
                                        <th width="300" style={{textAlign:'center'}}>亲属关系</th>
                                    </tr>
                                    </thead>
                                    <tbody style={{textAlign:'center'}}>
                                    {relative_trs}
                                    </tbody>
                                </table>
                                <hr style={{height:'2px',width:'100%',border:'none',borderTop:'2px dotted #185598'}} />
                            </div>

                            <div>
                                <div style={{float:'left', width:'100%', marginTop:'25px'}}>
                                    <div className="related_control_group" style={{float:'left'}}>
                                        <label className="related_label">姓名</label>
                                        <div className="self_controls">
                                            <input name="relatedName" defaultValue={this.state.relatedName || ""} onChange={this.handleChange.bind(this,"relatedName")} className="self_input"/>
                                        </div>
                                    </div>

                                    <div className="related_control_group">
                                        <label className="related_label" style={{marginLeft:'55px'}}>关系</label>
                                        <div className="self_controls">
                                            <select style={{width:'300px',height:'35px'}} id="relative" className="buy-field required">
                                                <option value={-1}>请选择亲属关系</option>
                                                {relative_add_trs}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="clear">
                                </div>
                                <div className="self_control_group">
                                    <div style={{float:'left',width:'50%'}}>
                                        <label className="related_label" style={{width:'7em'}}>身份证正面:</label>
                                        <div style={{marginTop:'5px'}}>
                                            <Upload ctrlName={'test'} callbackParent={this.onChildChanged.bind(this,"frontImg")} />
                                        </div>

                                        {this.state.frontImg ?
                                            <div className="thumb-box" style={{height:'260px',width:'444px'}}>
                                                <img style={{width:'300px', height:'200px', marginTop:'15px'}} src={this.state.frontImg}/>
                                            </div> : null}
                                    </div>

                                    <div style={{float:'left',width:'50%'}}>
                                        <label className="related_label" style={{width:'7em',marginLeft:'12px'}}>身份证反面:</label>
                                        <div style={{marginTop:'5px'}}>
                                            <Upload ctrlName={'test'} callbackParent={this.onChildChanged.bind(this,"backImg")} />
                                        </div>

                                        {this.state.backImg ?
                                            <div className="thumb-box" style={{height:'260px',width:'444px'}}>
                                                <img style={{width:'300px', height:'200px', marginTop:'15px'}} src={this.state.backImg}/>
                                            </div> : null}
                                    </div>
                                </div>

                                <div className="save_control" style={{float:'left', marginLeft: '45%', marginTop:'20px',marginBottom:'20px',width:'100%'}}>
                                    <a className="saveBtn btn_primary" href="javascript:;"onClick={this.uploadRelativeInfo}>添加</a>
                                </div>

                            </div>
                        </div>
                    break;

                case 'carInfo':
                    mainContent=
                        <div>
                            <div className="self_control_group">
                                <table className="table table-striped invoice-table">
                                    <thead>
                                    <tr>
                                        <th width="300">车牌</th>
                                        <th width="300">车主姓名</th>
                                        <th width="300">注册日期</th>
                                        <th width="300">厂牌型号</th>
                                        <th width="300">发动机型号</th>
                                        <th width="300">车架号</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {car_trs}
                                    </tbody>
                                </table>
                                <hr style={{height:'2px',width:'100%',border:'none',marginTop:'20px',borderTop:'2px dotted #185598'}} />
                            </div>

                            <div style={{float:'left',width:'100%'}}>
                                <div className="self_control_group">
                                    <label className="car_label">用车城市:</label>
                                    <div className="self_controls">
                                        <input type="text" className="self_input email"/>
                                    </div>
                                </div>
                                <div className="self_control_group">
                                    <label className="car_label">车牌:</label>
                                    <div className="self_controls">
                                        <input name="" type="text" className="self_input passwd" />
                                    </div>
                                </div>
                                <div className="self_control_group">
                                    <label className="car_label">姓名:</label>
                                    <div className="self_controls verifycode">
                                        <input type="text" name="" className="self_input verifyCode" maxLength="4"/>
                                    </div>
                                </div>
                                <div className="self_control_group">
                                    <label className="car_label">注册日期:</label>
                                    <div className="self_controls">
                                        <input type="text" name="" className="self_input email"/>
                                    </div>
                                </div>
                                <div className="self_control_group">
                                    <label className="car_label">是一年内过户的二手车吗:</label>
                                    <div className="self_controls">
                                        <input type="text" name="" className="self_input email"/>
                                    </div>
                                </div>
                                <div className="self_control_group">
                                    <label className="car_label">过户日期:</label>
                                    <div className="self_controls">
                                        <input type="text" name="" className="self_input email"/>
                                    </div>
                                </div>
                                <div className="self_control_group">
                                    <label className="car_label">厂牌型号:</label>
                                    <div className="self_controls">
                                        <input type="text" name="" className="self_input email"/>
                                    </div>
                                </div>
                                <div className="self_control_group">
                                    <label className="car_label">发动机号:</label>
                                    <div className="self_controls">
                                        <input type="text" name="" className="self_input email"/>
                                    </div>
                                </div>
                                <div className="self_control_group">
                                    <label className="car_label">车架号:</label>
                                    <div className="self_controls">
                                        <input type="text" name="" className="self_input email"/>
                                    </div>
                                </div>

                                <div className="self_control_group" style={{float:'left',width:'100%'}}>
                                    <label className="car_label" style={{width:'7em'}}>上传行驶证:</label>
                                    <div style={{marginTop:'5px'}}>
                                        <Upload ctrlName={'test'} callbackParent={this.onChildChanged.bind(this,"driveLicenseImg")} />
                                    </div>
                                </div>
                                {this.state.driveLicenseImg ?
                                    <div className="thumb-box" style={{height:'200px',width:'300px'}}>
                                        <img style={{marginLeft:'40%', marginTop:'3%'}} src={this.state.driveLicenseImg}/>
                                    </div> : null}


                                <div className="toolBar">
                                    <a id="nextBtn" className="saveBtn btn_primary" href="javascript:;">保存</a>
                                </div>
                            </div>
                        </div>
                    break;
            }

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

    componentDidMount: function() {

    }
});
module.exports=PersonInfo;
/**
 * Created by douxiaobin on 2016/10/27.
 */
