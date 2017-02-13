/**
 * Created by douxiaobin on 2017/02/10.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

var TopNav=React.createClass({

    
    render:function(){
        return(
            <div>
                <div className="top w1008 margin">
                    <div className="logo" >
                        <a href="#">
                            <img src={window.App.getResourceDeployPrefix()+"/images/logo_02.png"} style={{width:'432px', height:'110px'}}></img></a>
                    </div>
                    <div className="fr">
                        <ul className="link">
                            <li className="tell">咨询热线： <i>0531-81188593</i></li>
                            <li className="plogin" style={{paddingRight:'5px'}}><a onClick={this.click}>注册</a></li>
                            <li className="plogin"><a onClick={this.click}>登录</a></li>
                        </ul>
                    </div>
                </div>

                <div className="clear">
                </div>
                <div className="nav">
                    <div className="w1008 margin">
                        <ul className="nav_menu">
                            <li className="nav_menu-item"><a href="home.jsp">首页</a></li>
                            <li className="nav_menu-item"><a href="#" onClick="">产品中心</a>
                                <ul className="nav_submenu">
                                    <li className="nav_submenu-item">
                                        <Link to={window.App.getAppRoute() + "/carInsurance"}>
                                            <a>车险</a>
                                        </Link>
                                    </li>
                                    <li className="nav_submenu-item">
                                        <Link to={window.App.getAppRoute() + "/lifeInsurance"}>
                                            <a>寿险</a>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav_menu-item"><a href="#" onClick="">个人中心</a>
                            </li>
                            <li className="nav_menu-item"><a href="#" onClick="">业务咨询</a>
                            </li>
                            <li className="nav_menu-item"><a href="about.jsp">新闻资讯</a></li>
                            <li className="nav_menu-item"><a href="contact.jsp">关于我们</a> </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    },
});
module.exports=TopNav;
/**
 * Created by douxiaobin on 2017/02/10.
 */
