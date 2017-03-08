/**
 * Created by douxiaobin on 2016/10/27.
 */
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

import TopNav from '../modules/TopNav.jsx';
import Footer from '../modules/Footer.jsx';
import NewsList from './NewsList.jsx';
import NewsPage from './NewsPage.jsx';

var ProxyQ = require('../../../components/proxy/ProxyQ');

var MainPage=React.createClass({

    clickCb: function (data, detail, contentMapping) {
        this.setState({data: data, hiddenInfo: detail, contentMapping: contentMapping, isEnter: true})
    },

    initialData: function () {
        var url = "/insurance/insuranceReactPageDataRequest.do";
        var params = {
            reactPageName: "groupNewsReactPage",
            reactActionName: "getInsuranceNewsList"
        };

        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function (response) {
                var data;
                if (Object.prototype.toString.call(response) != '[object Array]')
                    if (response.data !== undefined && response.data !== null)
                        if (Object.prototype.toString.call(response.data) == '[object Array]')
                            data = response.data;
                        else
                            data = response;
                this.setState({data: data});
            }.bind(this),
            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },

    getInitialState: function () {
        return {data: null}
    },

    render:function(){
        var mainContent;

        if (this.state.data !== undefined && this.state.data !== null) {
            mainContent=
                <div>
                    <TopNav />

                    <div className="w1008 margin">
                        <div id="playBox">
                            <div className="pre">
                            </div>
                            <div className="next">
                            </div>
                            <div className="smalltitle">
                                <ul>
                                    <li className="thistitle"></li>
                                    <li className=""></li>
                                </ul>
                            </div>
                            <ul className="oUlplay" style={{left:'0'}}>
                                <li><a href="#" target="_blank"><img src={window.App.getResourceDeployPrefix()+"/images/uploads/banner/201508051024452571_40401877.jpg"} style={{width: '1009px', height: '336px'}}></img></a></li>
                                <li><a href="#" target="_blank"><img src={window.App.getResourceDeployPrefix()+"/images/uploads/banner/201508041229461753_40451054.jpg"} style={{width: '1009px', height: '336px'}}></img></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="shadow margin">
                        <img src={window.App.getResourceDeployPrefix()+"/images/yyy_05.jpg"} style={{width:'901px', height:'8px'}}></img>
                    </div>

                    <div className="clear">
                    </div>

                    <div className="margin w1008">
                        <div className="product">
                            <div className="product_B">
                                <a href="Product.jsp">产品介绍 </a><span><a href="Product.">更多&gt;&gt; </a></span>
                            </div>

                            <div className="product_img">
                                <img src={window.App.getResourceDeployPrefix()+"/images/uploads/project/201508041122361838_09058640.jpg"} style={{width:'183px', height:'129px'}}></img>
                                <div className="product_bg">
                                </div>
                                <div className="product_font">
                                    <a href="Product.jsp" id="585"> 车险产品</a>
                                </div>
                                <div className="clear">
                                </div>

                            </div>

                            <div className="product_img">
                                <img src={window.App.getResourceDeployPrefix()+"/images/uploads/project/201508041122115824_21534582.jpg"} style={{width:'183px', height:'129px'}}></img>
                                <div className="product_bg">
                                </div>
                                <div className="product_font">
                                    <a href="Product.jsp?id=584"> 财产险产品</a>
                                </div>
                                <div className="clear">
                                </div>

                            </div>

                            <div className="product_img">
                                <img src={window.App.getResourceDeployPrefix()+"/images/uploads/project/201508041121433098_40696128.jpg"} style={{width:'183px', height:'129px'}}></img>
                                <div className="product_bg">
                                </div>
                                <div className="product_font">
                                    <a href="Product.jsp?id=583">人身保险产品</a>
                                </div>
                                <div className="clear">
                                </div>

                            </div>

                            <div className="product_img">
                                <img src={window.App.getResourceDeployPrefix()+"/images/uploads/project/201508041122464354_46422271.jpg"} style={{width:'183px', height:'129px'}}></img>
                                <div className="product_bg">
                                </div>
                                <div className="product_font">
                                    <a href="Product.jsp?id=581">  理财类保险产品</a>
                                </div>
                                <div className="clear">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="margin w1008">
                        <div className="company mar_20">
                            <div className="company_B">
                                关于我们
                            </div>
                            <span className="about-more"><a href="javascript:void(0)">more&gt;&gt;</a></span>
                            <div className="company_img">
                                <img alt="" src={window.App.getResourceDeployPrefix()+"/images/company.jpg"}></img>
                                <br/> 捷惠保：立足于客户立场，深度发掘客户需求，客观分析，在众多保险产品中为客户选择适合的产品；
                                与保险主体公司深度合作，依据已有客户需求研发更多，保障全，保费低的优质产品；
                                为客户提供咨询，理赔，资料代管，车驾管服务等与保险相关的一站式服务。
                            </div>
                        </div>

                        <div className="news mar_L">
                            <div className="news_B">
                                最新资讯
                            </div>
                            <Link to={window.App.getAppRoute() + "/news"}>
                                <span className="news-more"><a href="javascript:void(0)">more&gt;&gt;</a></span>
                            </Link>
                            <div className="news_L">

                                <div>
                                    <NewsList
                                        data={this.state.data}
                                        clickCb={this.clickCb}
                                        />
                                </div>


                            </div>
                        </div>

                        <div className="service fr mar_20">
                            <div className="clear">
                            </div>
                            <div className="contact">
                                <div className="tell" style={{align:'left'}}>
                                    <i className="line_H">
                                    <span style={{color:'#337fe5',fontSize:'14px'}}>
                                        <strong><span style={{fontSize:'14px'}}>0531-81188593</span></strong>
                                    </span>
                                    </i> <br/>
                                    <em>
                                    <span style={{color:'#337fe5',fontSize:'14px'}}>
                                    <strong><span style={{fontSize:'14px'}}>地址：</span>
                                        <span style={{fontSize:'14px'}}>济南市高新区汇展西路88号</span></strong>
                                    </span>
                                    </em>
                                    <span style={{fontSize:'14px'}}>&nbsp;</span><br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="clear">
                    </div>
                    <div className="footer" style={{position:'relative',bottom:'0'}}>
                        <div className="margin">
                            <p>版权所有：山东泓信信息科技股份有限公司&nbsp;&nbsp;&nbsp;&nbsp;
                                企业邮箱：jhb2017@qq.com&nbsp;&nbsp;&nbsp;&nbsp;
                                技术支持：山东大学
                            </p>
                        </div>
                    </div>
                </div>
        } else{
            this.initialData();
        }

        if (this.state.isEnter != undefined && this.state.isEnter != null) { //进入新闻详情
            return (
                <NewsPage
                    addNav={true}
                    data={this.state.data}
                    auto={true}
                    hiddenInfo={this.state.hiddenInfo}
                    contentMapping={this.state.contentMapping}
                    display="content"
                    />
            );
        }

        return(
            <div>
                {mainContent}
            </div>
        );
    },
});
module.exports=MainPage;
/**
 * Created by douxiaobin on 2016/10/27.
 */
