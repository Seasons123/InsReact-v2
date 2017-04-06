/**
 * Created by dell on 2016/10/27.
 */
import React from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router';
import config from '../../../config.json';
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
            var validate = $(loginPage).find("input[name='verify']").val();
            this.loginSetCookie(username,password);
            if (username == ''||username==null) {
                alert('请填写用户名！');
            } else if(password ==''||password == null){
                alert('请填写密码！');
            } else if(validate == ''||validate == null){
                alert('请填写验证码！');
            } else {
                var url = "/bsuims/bsMainFrameInit.do";
                var params = {
                    login_strLoginName: username,
                    login_strPassword: password,
                    login_validate: validate
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
        }
    },

    viewSwitch:function(ob){
        var view=ob;
        this.setState({view:view});
    },

    checkPasswordStatus:function(){
        var registerPage = this.refs['registerPage'];
        var value = $(registerPage).find("input[name='password']").val();
        var len = value.length;
        var element = this.refs['safely'];

        var regxs = [];
        regxs.push(/[^a-zA-Z0-9_]/g);
        regxs.push(/[a-zA-Z]/g);
        regxs.push(/[0-9]/g);

        var sec = 0;
        if (len >= 6) { // 至少六个字符
            for (var i = 0; i < regxs.length; i++) {
                if (value.match(regxs[i])) {
                    sec++;
                }
            }
        } else{
            sec = 0;
        }
        var result = (sec / regxs.length) * 100;
        if(result == 0){
            $(element).removeClass('safely-general');
            $(element).removeClass('safely-safe');
            $(element).removeClass('safely-danger');
        }else if(result > 0 && result <= 50){
            $(element).removeClass('safely-general');
            $(element).removeClass('safely-safe');
            $(element).addClass('safely-danger');
        }else if (result > 50 && result < 100) {
            $(element).removeClass('safely-danger');
            $(element).removeClass('safely-safe');
            $(element).addClass('safely-general');
        } else if (result == 100) {
            $(element).removeClass('safely-danger');
            $(element).removeClass('safely-general');
            $(element).addClass('safely-safe');
        }
    },

    register:function(){
        var registerPage = this.refs['registerPage'];
        var userName = $(registerPage).find("input[name='userName']").val();
        var password = $(registerPage).find("input[name='password']").val();
        var ackPassword = $(registerPage).find("input[name='ackPassword']").val();
        var email = $(registerPage).find("input[name='email']").val();
        var phoneNum = $(registerPage).find("input[name='phoneNum']").val();
        var verifyCode = $(registerPage).find("input[name='verifyCode']").val();

    },

    getVerifyCode:function(){
        var registerPage = this.refs['registerPage'];
        var phoneNum = $(registerPage).find("input[name='phoneNum']").val();
        var num = '';
        for(var i=0;i<4;i++){
            num+=Math.floor(Math.random()*10);
        }

        alert('mobile====='+phoneNum);

        var inputData = {
            corp_id:'hy6550',
            corp_pwd:'mm2289',
            corp_service:1069003256550,
            mobile:phoneNum,
            msg_content:''+num,
            corp_msg_id:'',
            ext:''
        };


        //request({
        //    url:'http://sms.cloud.hbsmservice.com:8080/sms_send2.do',
        //    method:'POST',
        //    data:JSON.stringify(inputData),
        //    headers: {
        //        'Content-Type': 'application/x-www-form-urlencoded'
        //    },
        //    ContentType: 'application/x-www-form-urlencoded',
        //},function(err,response,body){
        //    if(err)
        //    {
        //        alert('get securityCode='+err.errMsg);
        //        res.json({re:-1, data:err.errMsg});
        //    }
        //    else
        //        res.json({re: 1, data: num});
        //});


        var url='http://sms.cloud.hbsmservice.com:8080/sms_send2.do';
        $.ajax({
            type    : 'POST',
            url     : url,
            data    : JSON.stringify(inputData),
            dataType: 'JSONP',
            crossDomain: true,
            headers: {
                        //'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
            ContentType: 'application/x-www-form-urlencoded',

            success : function (response) {
                //加载遮罩
                if (App.getLoadModel() == "true") {
                    App.unload();
                }

                this.setState({verifyCode: num});
            },
            error   : function (xhr, status, err) {
                if (App.getLoadModel() == "true") {
                    App.unload();
                }
                console.error("error=" + err);
                var $modal=$("#root_modal");
                var content;
                var errType;
                if(xhr.status==404||xhr.status=="404") {
                    content="错误描述:        "+xhr.responseText;
                    errType="";
                    switch(xhr.statusText)
                    {
                        case "Not Found":
                            errType="发生错误:"+"path not found";
                            break;
                        default:
                            break;
                    }
                } else if (xhr.status == 502 || xhr.status == "502") {
                    content = "错误描述:        " + xhr.responseText;
                    errType = "发生错误:" + "无效的服务器指向";

                } else {}
                $modal.find(".modal-body").text(content);
                $modal.find(".modal-title").text(errType);
                $modal.modal('show');
            }
        });
    },


    loginSetCookie:function(username,password){
        var userValue = username;
        //alert(userValue);
        var exp = new Date();
        exp.setTime(exp.getTime() + (30*24*60*60*1000));
        window.document.cookie = "username=" + escape (userValue) + "; expires=" + exp.toGMTString()+";path=/";

        var auto = document.getElementById("login_autoLoginCheckbox").checked;

        if(auto)
        {
            var password = password;
            window.document.cookie = "password="+escape(password)+"; expires=" + exp.toGMTString()+";path=/";
            window.document.cookie = "autocheck=true; expires="+ exp.toGMTString()+";path=/";
        }else{
            window.document.cookie = "password=; expires=" + exp.toGMTString()+";path=/";
            window.document.cookie = "autocheck=false; expires="+ exp.toGMTString()+";path=/";
        }

    },
    loginAutoLogin:function (){
        this.loginGetCookie("login_strLoginName","username");
        this.loginGetCookie("login_strPassword","password");
        this.loginCheckAuto();
    },
    loginCheckAuto:function (){
        var checkValue = this.loginGetCookieValue("autocheck");
        if(checkValue=="true")
            document.all("login_autoLoginCheckbox").checked = checkValue;
    },
    loginGetCookieValue:function (name){
        var arg = name + "="; // 要查找的对象
        var arglength = arg.length;
        var cookielength = window.document.cookie.length;
        var i = 0;
        while (i < cookielength)
        {
            var j = i + arglength;
            if (window.document.cookie.substring(i, j) == arg) {
                return this.loginGetCookieVal (j);
            }
            i = window.document.cookie.indexOf(" ", i) + 1;
            if (i == 0)
                break;
        }
        return null;
    },
    loginGetCookie:function(showText, name){
        var arg = name + "="; // 要查找的对象
        var arglength = arg.length;
        var cookielength = window.document.cookie.length;
        var i = 0;
        while (i < cookielength)
        {
            var j = i + arglength;
            if (window.document.cookie.substring(i, j) == arg) {
                var a=this.loginGetCookieVal (j)
                document.getElementById(showText).value = a;
                return true;
            }
            i = window.document.cookie.indexOf(" ", i) + 1;
            if (i == 0)
                break;
        }
           return true;
    },
    loginGetCookieVal:function  (offset) {
         var endstr = window.document.cookie.indexOf (";", offset);
         if (endstr == -1)
             endstr = window.document.cookie.length;
         return unescape(window.document.cookie.substring(offset, endstr));
     },
    getInitialState:function(){
        flag=0;
        var path = SyncStore.getRouter();
        SyncStore.setRouter(null);
        return ({view:'login', path:path, verifyCode: null});
    },
    repaintImage:function (){
        var img = $("#validateImage");
        img.attr('src',"/insurancems/validatecode.jpg?rnd=" + Math.random());// 防止浏览器缓存的问题
    },
    render:function(){
        var mainContent;
        var view=this.state.view;

        switch(view){
            case 'login':
                mainContent=
                    <div ref="loginPage"  onLoad={this.loginAutoLogin}>
                        <div className="main-form">
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
                                                    <input type="text" name="username" id="login_strLoginName" className="passport-txt xl w-full" tabIndex="1" placeholder="用户名/手机号" autoComplete="off"/>
                                                </div>
                                            </div>

                                            <div className="form-item">
                                                <div className="form-cont">
                                                    <input type="password" name="password" id="login_strPassword" className="passport-txt xl w-full" tabIndex="2" placeholder="请输入密码" autoComplete="off"/>
                                                </div>
                                            </div>
                                            <table id="tableVerify" className="form-item">
                                                <tbody>
                                                    <tr >
                                                        <td><span className="info">验证码:  &nbsp;</span></td>
                                                        <td><input type="text" name="verify" id="verify" className="passport-txt xl w-full" /></td>
                                                        <td><img style={{paddingLeft:'10px'}} id="validateImage" src="/insurancems/validatecode.jpg"/></td>
                                                        <td><img style={{paddingLeft:'5px'}} onClick={this.repaintImage} src="../images/refresh1.png" ></img></td>
                                                        <td><span id="verifyMsg" className="errorMessage"></span></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <div className="form-item form-sevenday">
                                                <div className="form-cont clearfix">
                                                    <label><input type="checkbox" id="login_autoLoginCheckbox" className="passport-sevenday" tabIndex="2" />记住密码</label>
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
                            <div className="passport-goto">没有账号?
                                <a tabIndex="6" onClick={this.viewSwitch.bind(this,'register')}>新用户注册</a>
                            </div>
                            <div className="sendgift"></div>
                            <div className="passport-third">
                                <header className="hd">
                                    <div className="layout-inner">
                                        <h3>汽车保险</h3>
                                    </div>
                                </header>
                                <div className="links">
                                    <img src={window.App.getResourceDeployPrefix()+"/images/loginCar.jpg"} />
                                </div>
                            </div>
                        </div>

                    </div>
                break;
            case 'register':
                mainContent=
                    <div ref="registerPage">
                        <div className="main-form">
                            <div className="passport-tab" id="login-tabs">
                                <div className="tabs">
                                    <ul>
                                        <li className="active">新用户注册</li>
                                    </ul>
                                </div>

                                <div className="passport-form passport-form-sign" id="register-form">
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="text" name="userName" className="passport-txt xl w-full" tabIndex="1" autoComplete="off" placeholder="请输入用户名"/>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="password" name="password" className="passport-txt xl w-full" tabIndex="2" autoComplete="off" onKeyUp={this.checkPasswordStatus} placeholder="请输入密码"/>
                                            <ul className="passport-safely" ref="safely">
                                                <li className="danger">弱</li>
                                                <li className="general">中</li>
                                                <li className="safe">高</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="text" name="ackPassword" className="passport-txt xl w-full" tabIndex="1" autoComplete="off" placeholder="请再次输入密码"/>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="text" name="email" className="passport-txt xl w-full" tabIndex="1" autoComplete="off" placeholder="请输入邮箱地址，本项选填"/>
                                        </div>
                                    </div>

                                    <div className="form-item form-mcode mb-25">
                                        <div className="form-cont">
                                            <input type="text" name="phoneNum" className="passport-txt xl w-full" tabIndex="4" autoComplete="off" placeholder="请输入手机号"/>
                                            <div className="btn-getcode">
                                                <button type="button" className="passport-btn js-getcode" onClick={this.getVerifyCode}>发送验证码</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-item">
                                        <div className="form-cont">
                                            <input type="text" name="verifyCode" className="passport-txt xl w-full" tabIndex="1" autoComplete="off" placeholder="请输入验证码"/>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <div className="form-cont">
                                            <button type="button" name="register" id="register" className="passport-btn passport-btn-def xl w-full" tabIndex="5" onClick={this.register}>注册</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="aside">
                            <div className="passport-goto mg-b100">已有帐号
                                <a tabIndex="6" onClick={this.viewSwitch.bind(this,'login')}>直接登录</a></div>
                            <div className="passport-third">
                                <header className="hd">
                                    <div className="layout-inner">
                                        <h3>汽车保险</h3>
                                    </div>
                                </header>
                                <div className="links">
                                    <img src={window.App.getResourceDeployPrefix()+"/images/loginCar.jpg"} />
                                </div>
                            </div>
                        </div>
                    </div>
                break;
        }


        return(
            <div className="passport-wrapper">
                <header id="header" className="passport-header">
                    <div id="logo"><a><img src="images/loginLogo.png" /></a></div>
                </header>
                <div id="container">
                    <div className="passport-sign">

                        {mainContent}

                    </div>
                </div>
            </div>
        )
    },

    componentDidMount:function () {
        this.repaintImage();
    },

});
module.exports=Login;



