/**
 * Created by douxiaobin on 2016/10/27.
 */
import React from 'react';
import {render} from 'react-dom';
import TopNav from '../modules/TopNav.jsx';
import Footer from '../modules/Footer.jsx';

var MainPage=React.createClass({
    render:function(){
        return(
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

                    <div className="company mar_20">
                        <div className="company_B">
                            关于我们
                        </div>
                        <span><a href="About.jsp">更多&gt;&gt;</a></span>
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
                        <span><a href="NewsList.jsp">更多&gt;&gt;</a></span>
                        <div className="news_L">
                            <ul>
                                <li><a href="#">保监会要求进一步规范保险理赔服务</a></li>
                                <li><a href="#">“营改增”后个人保险代理人佣金算法明确！</a></li>
                                <li><a href="#">2016年“7·8全国保险公众宣传日”主题活动在京举行</a></li>
                                <li><a href="#"> 互联网保险排雷紧锣密鼓 商业模式多元化成发展趋势</a></li>
                                <li><a href="#"> 保险合规管理将趋紧 罚款上限或作适度上调</a></li>
                                <li><a href="#">学习总书记“七一”讲话精神 不断开创保险工作新局面 保监会召开庆祝建党95周年大会</a></li>
                                <li><a href="#">“营改增”对保险公司保费核算的影响简析</a></li>
                                <li><a href="#">滴滴出行获中国人寿6亿美元战略投资</a></li>
                            </ul>
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

                <Footer />
            </div>
        );
    },
});
module.exports=MainPage;
/**
 * Created by douxiaobin on 2016/10/27.
 */
