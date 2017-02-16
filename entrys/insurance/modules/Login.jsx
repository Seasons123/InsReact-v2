/**
 * Created by dell on 2016/10/27.
 */
import React from 'react';
import { render } from 'react-dom';

import '../../../css/insurance/components/passport.css';

var Login=React.createClass({
    render:function(){
        return(
            <div className="passport-wrapper">
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
                                                    <input type="text" name="uname" className="passport-txt xl w-full" tabIndex="1" placeholder="手机 号" autoComplete="off"/>
                                                </div>
                                            </div>

                                            <div className="form-item">
                                                <div className="form-cont">
                                                    <input type="password" name="password" className="passport-txt xl w-full" tabIndex="2" placeholder="密码" autoComplete="off"/>
                                                </div>
                                            </div>
                                            <div className="form-item form-imgcode mb-25">
                                                <div className="form-cont">
                                                    <div className="layout-inner">
                                                        <input type="text" name="verify" className="passport-txt xl w-lg" tabIndex="3" placeholder="验证码" autoComplete="off"/>
                                                    </div>
                                                    <div className="imgcode">
                                                        <img src="#" alt="验证码" className="verifyCode" />
                                                        <i className="passport-icon icon-refresh refreshCode"></i>
                                                    </div>
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
                                                    <button type="button" id="login" className="passport-btn passport-btn-def xl w-full" tabIndex="4" href="javascript:;">登录</button>
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



