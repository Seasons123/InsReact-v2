import React from 'react';
import {render} from 'react-dom';

import '../../../css/insurance/components/commonTopSupnuevo.css';
import '../../../css/insurance/components/navcontent.css';
import '../../../css/insurance/components/pagination.css';
import '../../../css/insurance/components/productIntroduction.css';

var ProxyQ = require('../../../components/proxy/ProxyQ');
var info={};

var testCar = React.createClass({
    getInitialState: function() {
        return {
            proNum:1,
            buyName:[],
            buyCheck:[]
        }
    },
    goToOthers:function(branch){

        if(this.state.buyName!=null&&this.state.buyName!=undefined&&this.state.buyName.length!=0){
            //    this.setState({
            //    nav: branch
            //});
            alert("该部分功能暂未开放！");
        }else{
            alert("您还没有选购商品！");
        }

    },
    changeBuyState:function(num,productName) {
        var step =null;
        var items = this.refs[num];
        if(productName=='玻璃单独破碎险'||productName=='车身划痕损失险'||productName=='自燃损失险'
            ||productName=='车损险无法找到第三方'||productName=='新增设备损失险'||productName=='发动机涉水损失险'){
            if(this.state.buyName.length!=0){
                this.state.buyName.map(function(item,i){
                    if(item=="车辆损失险"){
                        step=true;
                    }
                });
                if(step!=true){
                    alert("此险种不可单独购买！请先购买“车损险”，谢谢！");
                }
            }else{
                alert("此险种不可单独购买！请先购买“车损险”，谢谢！");
            }

        }else{
            if(productName=='车上人员责任险（乘客）'||productName=='车上人员责任险（驾驶员）')
            {
                if(this.state.buyName.length!=0) {
                    this.state.buyName.map(function (item, i) {
                        if (item == "第三者责任险") {
                            step = true;
                        }
                    });
                    if(step!=true){
                        alert("此险种不可单独购买！请先购买“第三者责任险”，谢谢！");
                    }
                }else{
                    alert("此险种不可单独购买！请先购买“第三者责任险”，谢谢！");
                }
            }
            else{
                step=true;
            }
        }
        if(step==true){
            //购买项
            if(this.state.buyName.length==0){
                this.state.buyName.push(productName);
            }else{
                var q=this.state.buyName;
                var ref=this;
                var op=false;
                var c=[];
                q.map(function(item,i){
                    if(item==productName) {
                        if(productName=='车辆损失险'){
                            q.map(function(item,i){
                                if(item=="玻璃单独破碎险"||item=='车身划痕损失险'||item=='自燃损失险'
                                    ||item=='车损险无法找到第三方'||item=='新增设备损失险'||item=='发动机涉水损失险'){
                                    q[i]=null;
                                }
                            });
                        }else{if(productName=='第三者责任险'){
                            q.map(function(item,i){
                                if(item=="车上人员责任险（乘客）"||item=='车上人员责任险（驾驶员）'){
                                    q[i]=null;
                                }
                            });
                        }}
                        q[i]=null;
                        op=true;
                    }else{
                        if(op==false){
                            if(i==ref.state.buyName.length-1){
                                q.push(productName);
                            }
                        }
                    }
                });
                q.map(function(item,i){
                    if(item!=null) {
                        c.push(item);
                    }
                });
                this.state.buyName=c;
            }
            //购买项的不计免赔项
            if(this.state.buyCheck.length==0){
                if($(items).find(attach)[0]!=undefined){
                    var check=$(items).find(attach)[0].checked;
                    this.state.buyCheck.push([productName,check,num]);
                }else{
                    this.state.buyCheck.push([productName,'none',num]);
                }
            }else {
                var p = this.state.buyCheck;
                var a = $(items).find(attach)[0];
                var b =[];
                var operate=false;
                p.map(function (item,i) {
                    if(item[0]==productName){
                        if(productName=='车辆损失险'){
                            p.map(function(item,i){
                                if(item[0]=="玻璃单独破碎险"||item[0]=='车身划痕损失险'||item[0]=='自燃损失险'
                                    ||item[0]=='车损险无法找到第三方'||item[0]=='新增设备损失险'||item[0]=='发动机涉水损失险'){
                                    p[i][1]=null;
                                    $(ref.refs[p[i][2]]).attr("style", "");
                                    $(ref.refs[p[i][2]]).attr("value","0");
                                    ref.setState({proNum:ref.state.proNum-1});
                                }
                            });
                        }else{if(productName=='第三者责任险'){
                            p.map(function(item,i){
                                if(item[0]=="车上人员责任险（乘客）"||item[0]=='车上人员责任险（驾驶员）'){
                                    p[i][1]=null;
                                    $(ref.refs[p[i][2]]).attr("style", "");
                                    $(ref.refs[p[i][2]]).attr("value","0");
                                    ref.setState({proNum:ref.state.proNum-1});
                                }
                            });
                        }}
                        p[i]=null;
                        operate=true;
                    }else{
                        if(operate==false){
                            if(i==ref.state.buyCheck.length-1){
                                if(a!=undefined){
                                    var check=a.checked;
                                    p.push([productName,check,num]);
                                }else{
                                    p.push([productName,'none',num]);
                                }
                            }
                        }
                    }
                });
                p.map(function(item,i){
                    if(item!=null&&item[1]!=null) {
                        b.push(item);
                    }
                });
                this.state.buyCheck=b;
            }

            var val=$(items).attr("value");
            if(val=='0'){
                $(items).attr("style", "background: #c4f4a1");
                $(items).attr("value","1");
                //this.setState({proNum:this.state.proNum+1});
            }else{
                $(items).attr("style", "");
                $(items).attr("value","0");
                //this.setState({proNum:this.state.proNum-1});
            }
            this.setState({proNum: this.state.buyName.length+1});
        }

    },
    initialData:function(){

        window.setTimeout(function () {

            this.setState({
                data:info.data
            })
        }.bind(this), 300);

    },
    getCarInsurances:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insuranceCarProductCenterPage',
            reactActionName:'getInsuranceCarProduct',
        };

        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function(ob) {
                info=ob;
            }.bind(this),

            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    render: function () {
        var container=null;
        if(this.state.data!==undefined&&this.state.data!==null) {
            var trs = [];
            var jqx = [];
            var data = this.state.data;
            var ref=this;
            data.map(function (item, i) {
                if(item.productName=='交强险'){
                    jqx.push(
                    <div className="visual" key={i}>
                        <h3 className="font_15 text" style={{marginBottom: '10px'}}>重要通告声明</h3>
                        <p style={{color:'#0176cf'}}>
                        交强险为车险基础保障险,本如若您需要在本公司购买车险产品,本公司将默认您选购交强险!您如果已在他处购买交强险,请继续您的购买,在接下订单页面中,请务必填写已购交强险订单号并自行取消订单中的交强险!谢谢合作!</p>
                        <p><span style={{color:'#168750',fontWeight:'600'}}>交强险简介:</span>{item.description}</p>

                    </div>
                    )
                }
                else{
                    if(item.productName=='玻璃单独破碎险'||item.productName=='车损险无法找到第三方'){
                        trs.push(
                        <p className="carPro" key={i} value="0" ref={i}>
                            <label className="title">{item.productName}</label>
                            <h3>简介:</h3>
                            <textarea disabled="disabled" className="longtxt" value={item.description}></textarea>
                            <label className="checkLab" style={{height: '30px'}}>
                            </label>
                            <h1 className="buyCar">
                                <a onClick={ref.changeBuyState.bind(this,i,item.productName)}>选购</a>
                            </h1>
                        </p>
                    )
                    }else{
                        trs.push(
                        <p className="carPro" key={i} value="0" ref={i}>
                            <label className="title">{item.productName}</label>
                            <h3>简介:</h3>
                            <textarea disabled="disabled" className="longtxt" value={item.description}></textarea>
                            <label className="checkLab" >
                                <input id="attach" type="checkbox"  defaultChecked={true}/>
                                <span className="checkText">不计免赔</span>
                            </label>
                            <h1 className="buyCar">
                                <a onClick={ref.changeBuyState.bind(this,i,item.productName)}>选购</a>
                            </h1>
                        </p>
                        )
                    }

                }
            });
        }else{
            this.initialData();
        }
        switch (this.state.nav) {
            case undefined:
                container=
                    <div >
                        <div className="w1008 margin mar_20" onLoad={this.getCarInsurances()}>
                            <div className="pro_L " style={{float:'left'}}>

                            </div>
                            <div className="pro_R fr bg" style={{width:'1035px'}}>
                                <div className="pro_bg">
                            <span className="fr pad_L">您的位置： <a href="home.jsp">首页</a> &gt; 人寿保险 &gt; <a
                                href="#">理财保险</a></span>
                                </div>

                                <div className="article">
                                    {jqx}
                                    <div className="productDetails">
                                        <div className="car_mframe">
                                            <div className="car_mcontent">
                                                <div className="result">
                                                    <div className="pro_detail_list">

                                                        <div className="car">
                                                            <fieldset>
                                                                {trs}
                                                            </fieldset>
                                                        </div>
                                                        <div className="car_btm_area">
                                                            <div className="pointline"></div>
                                                            <div className="btm_btn">
                                                                <div className="detail_btn">
                                                                    <a title="购买" target="_blank" onClick={this.goToOthers.bind(this,'buy')}></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="grayline"></div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            default :
                break;
        }
        return container;
    }
});
module.exports = testCar;
