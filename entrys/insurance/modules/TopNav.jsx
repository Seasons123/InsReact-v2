/**
 * Created by douxiaobin on 2017/02/10.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

var ProxyQ = require('../../../components/proxy/ProxyQ');
var SyncStore = require('../../../components/flux/stores/SyncStore');

var TopNav=React.createClass({
    click:function(ob){ //保存跳转的页面信息
        SyncStore.setRouter(ob);
    },

    getInitialState:function(){
        var note=SyncStore.getNote();
        var userName=SyncStore.getLoginName();
        return({loginState:note, userName:userName})
    },

    componentWillReceiveProps: function(){
        var note=SyncStore.getNote();
        var userName=SyncStore.getLoginName();
        this.setState({loginState:note, userName: userName})
    },
    initValue:function(){
        if(SyncStore.getNote()==false) {
            var url = "/insurance/insuranceReactPageDataRequest.do";
            var params = {
                reactPageName: 'insuranceLifeProductCenterPage',
                reactActionName: 'getLogin',
            };
            ProxyQ.queryHandle(
                'post',
                url,
                params,
                null,
                function (ob) {
                    var login = ob.ref;
                    var name = ob.data;
                    if (login == true) {
                        SyncStore.setNote();
                        SyncStore.setLoginName(name);
                        this.componentWillReceiveProps();
                    }

                }.bind(this),
                function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },

    render:function(){
        return(
            <div>
                <div className="top w1008 margin"  onLoad={this.initValue()}>
                    <div className="logo">
                        <a href="#">
                            <img src={window.App.getResourceDeployPrefix()+"/images/logo_02.png"} style={{width:'432px', height:'110px'}}></img></a>
                    </div>
                    <div className="fr">
                        <ul className="link">
                            <li className="tell">咨询热线： <i>0531-81188593</i></li>
                            {this.state.loginState ?
                                <li className="plogin">
                                    <a className="user" href="javascript:void(0)">
                                        <i className='icon-user'></i>
                                        <strong style={{marginLeft:'10px'}}>{this.state.userName}</strong>
                                    </a>
                                </li>

                             :
                                <li className="plogin">
                                    <Link to={window.App.getAppRoute() + "/login"}>
                                        <i className="login-btn" onClick={this.click.bind(null,"/mainPage")}>登录</i>
                                    </Link>
                                </li>
                            }

                        </ul>
                    </div>
                </div>

                <div className="clear">
                </div>
                <div className="nav">
                    <div className="w1008 margin">
                        <ul className="nav_menu">
                            <li className="nav_menu-item">
                                <Link to={window.App.getAppRoute() + "/"}>
                                    <i>首页</i>
                                </Link>
                            </li>
                            <li className="nav_menu-item"><a href="javascript:void(0)" onClick="">产品中心</a>
                                <ul className="nav_submenu">
                                    <li className="nav_submenu-item">
                                        <Link to={window.App.getAppRoute() + "/carInsurance"}>
                                            <i>车险</i>
                                        </Link>
                                    </li>
                                    <li className="nav_submenu-item">
                                        <Link to={window.App.getAppRoute() + "/lifeInsurance"}>
                                            <i>寿险</i>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav_menu-item">
                                {this.state.loginState ?
                                    <Link to={window.App.getAppRoute() + "personalCenter"}>
                                        <i>个人中心</i>
                                    </Link> :
                                    <Link to={window.App.getAppRoute() + "login"}>
                                        <i onClick={this.click.bind(null,"/personalCenter")}>个人中心</i>
                                    </Link>
                                }
                            </li>
                            <li className="nav_menu-item">
                                <Link to={window.App.getAppRoute() + "/consultation"}>
                                    <i>业务咨询</i>
                                </Link>
                            </li>
                            <li className="nav_menu-item">
                                <Link to={window.App.getAppRoute() + "/aboutUs"}>
                                    <i>关于我们</i>
                                </Link>
                            </li>
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
