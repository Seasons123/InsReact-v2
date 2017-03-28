/**
 * Created by dell on 2016/10/27.
 */
import React from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router';

import '../../../css/insurance/components/passport.css';

var ProxyQ = require('../../../components/proxy/ProxyQ');
var SyncStore = require('../../../components/flux/stores/SyncStore');
var flag=0;
var Login=React.createClass({


    login:function(){
        if(flag==0) {
            var loginPage = this.refs['loginPage'];
            var username = $(loginPage).find("input[name='username']").val();
            var password = $(loginPage).find("input[name='password']").val();

            var url = "/bsuims/bsMainFrameInit.do";
            var params = {
                login_strLoginName: username,
                login_strPassword: password
            };

            ProxyQ.queryHandle(
                'post',
                url,
                params,
                null,
                function (res) {
                    var re = res.re;
                    var realName = res.realName;
                    if (re !== undefined && re !== null && (re == 1 || re == "1")) { //登陆成功
                        SyncStore.setNote(); //设置全局登录状态为true
                        SyncStore.setResult(true);
                        SyncStore.setLoginName(realName);

                        console.log("登陆成功！");
                        flag = 1;
                        document.getElementById("goToOther").click();


                        //var exp = new Date();
                        //exp.setTime(exp.getTime() + 1000 * 60 * 60 * 2); //这里表示保存2小时
                        //document.cookie = "username=" + username + ";expires=" + exp.toGMTString();
                        //document.cookie = "password=" + password + ";expires=" + exp.toGMTString();
                    }
                }.bind(this),
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },

    getInitialState:function(){
        var path = SyncStore.getRouter();
        SyncStore.setRouter(null);
        return ({path:path});
    },

    render:function(){
        return(
            <div className="passport-wrapper" ref="loginPage">
                <header id="header" className="passport-header">
                    <div id="logo"><a><img src="images/loginLogo.png" /></a></div>
                </header>
                <div id="container">
                    <div className="passport-sign">
                        <div className="main-form main-form-sign">
                            <div className="passport-tab" id="login-tabs">
                                <div className="tabs">
                                    <ul>
                                        <li className="active">登录</li>
                                    </ul>
                                </div>

                                <div className="tabbed">
                                    <div className="tab-group" style={{display: 'block'}}>
                                        <div className="passport-form passport-form-sign" id="login-form">
                                            <div className="form-item">
                                                <div className="form-cont">
                                                    <input type="text" name="username" className="passport-txt xl w-full" tabIndex="1" placeholder="手机号" autoComplete="off"/>
                                                </div>
                                            </div>

                                            <div className="form-item">
                                                <div className="form-cont">
                                                    <input type="password" name="password" className="passport-txt xl w-full" tabIndex="2" placeholder="密码" autoComplete="off"/>
                                                </div>
                                            </div>

                                            <div className="form-item form-sevenday">
                                                <div className="form-cont clearfix">
                                                    <label><input type="checkbox" className="passport-sevenday"/>记住密码</label>
                                                    <a href="#" className="forget-link">忘记密码</a>
                                                </div>
                                            </div>
                                            <div className="form-item">
                                                <div className="form-cont">

                                                        <button type="button" id="login" className="passport-btn passport-btn-def xl w-full" tabIndex="4" onClick={this.login}>
                                                            <a style={{color:'#ffffff'}}>登录</a>
                                                            <Link to={window.App.getAppRoute() + this.state.path} id="goToOther"></Link>
                                                        </button>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="aside">
                            <div className="passport-goto">没有账号? <a tabIndex="5">新用户注册</a></div>
                            <div className="sendgift"></div>
                            <div className="passport-third">
                                <header className="hd">
                                    <div className="layout-inner">
                                        <h3>汽车保险</h3>
                                    </div>
                                </header>
                                <div className="links">
                                    <img src="images/loginCar.jpg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports=Login;



