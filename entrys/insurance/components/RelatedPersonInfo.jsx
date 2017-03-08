/**
 * Created by douxiaobin on 2017/03/4.
 */
import React from 'react';
import { render } from 'react-dom';

import '../../../css/insurance/components/personInfoBase.css';
import '../../../css/insurance/components/personInfoLayout.css';
import AddRelatedPersonInfo from './AddRelatedPersonInfo.jsx';
import Upload from './Upload.jsx';
import Calendar from '../../../components/basic/Calendar.jsx';

var ProxyQ = require('../../../components/proxy/ProxyQ');

var RelatedPersonInfo=React.createClass({

    // //显示提示框，目前三个参数(txt：要显示的文本；time：自动关闭的时间（不设置的话默认1500毫秒）；status：默认0为错误提示，1为正确提示；)
    // showTips:function(txt,time,status) {
    //     var htmlCon = '';
    //     if(txt != ''){
    //         if(status != 0 && status != undefined){
    //             htmlCon = '<div class="tipsBox" style="width:220px;padding:10px;background-color:#4AAF33;border-radius:4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;color:#fff;box-shadow:0 0 3px #ddd inset;-webkit-box-shadow: 0 0 3px #ddd inset;text-align:center;position:fixed;top:25%;left:50%;z-index:999999;margin-left:-120px;">'+txt+'</div>';
    //         }else{
    //             htmlCon = '<div class="tipsBox" style="width:220px;padding:10px;background-color:#D84C31;border-radius:4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;color:#fff;box-shadow:0 0 3px #ddd inset;-webkit-box-shadow: 0 0 3px #ddd inset;text-align:center;position:fixed;top:25%;left:50%;z-index:999999;margin-left:-120px;">'+txt+'</div>';
    //         }
    //         $('body').prepend(htmlCon);
    //         if(time == '' || time == undefined){
    //             time = 1500;
    //         }
    //         setTimeout(function(){ $('.tipsBox').remove(); },time);
    //     }
    // },
    //
    // displayUploadImg:function (ob,imgData) {
    //     switch(ob){
    //         case 'frontImg':
    //             this.setState({frontImg: imgData});
    //             break;
    //         case 'backImg':
    //             this.setState({backImg: imgData});
    //             break;
    //         default:
    //             break;
    //     }
    // },
    //
    // doSaveRelativeInfo:function(){
    //     var relativePersonInfo = this.refs.relativePersonInfo;
    //     var relatedName=$(relativePersonInfo).find("input[name='relatedName']").val();
    //     var relative=$('#relative option:selected').val();
    //
    //     if (relatedName == '') {
    //         this.showTips('请填写关联人的姓名~');
    //     } else if (relative == '-1' || relative == -1) {
    //         this.showTips('请选择关联人和你的关系~');
    //     } else if (this.state.frontImg == undefined || this.state.frontImg == null) {
    //         this.showTips('请上传关联人身份证正面照片~');
    //     } else if (this.state.backImg == undefined || this.state.backImg == null) {
    //         this.showTips('请上传关联人身份证反面照片~');
    //     } else {
    //
    //         var url="/insurance/insuranceReactPageDataRequest.do";
    //         var params={
    //             reactPageName:'insurancePersonalCenterPersonInfo',
    //             reactActionName:'addInsuranceRelatedPersonInfo',
    //             customerId:this.state.customerId,
    //             relatedName:relatedName,
    //             relType:relative,
    //
    //             fileData1:this.state.frontImg,
    //             fileData2:this.state.backImg
    //         };
    //
    //         ProxyQ.queryHandle(
    //             'post',
    //             url,
    //             params,
    //             null,
    //             function(ob) {
    //                 var re = ob.re;
    //                 if(re!==undefined && re!==null && (re ==2 || re =="2")) { //登录信息为空
    //                     this.initialData();
    //                 }
    //             }.bind(this),
    //             function(xhr, status, err) {
    //                 console.error(this.props.url, status, err.toString());
    //             }.bind(this)
    //         );
    //     }
    // },

    initialData:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterPersonInfo',
            reactActionName:'getInsuranceRelatedPersonInfo',
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
                var customerId=ob.customerId
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
            relatedName:null,
            });
    },

    render:function(){
        var mainContent;
        var data;
        var relative_trs=[];


        if(this.state.data!==undefined && this.state.data!==null) {
            data=this.state.data;
            data.map(function (item, i) {
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



            mainContent=
                <div >
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
                    </div>

                  <AddRelatedPersonInfo customerId={this.state.customerId} flush={this.initialData}/>
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
module.exports=RelatedPersonInfo;
/**
 * Created by douxiaobin on 2017/03/4.
 */