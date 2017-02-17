import React from 'react';
import {render} from 'react-dom';

import '../../../css/insurance/components/commonTopSupnuevo.css';
import '../../../css/insurance/components/navcontent.css';
import '../../../css/insurance/components/pagination.css';
import '../../../css/insurance/components/productIntroduction.css';
import '../../../css/insurance/components/Consultation.css';

var ProxyQ = require('../../../components/proxy/ProxyQ');
var SyncStore = require('../../../components/flux/stores/SyncStore');
var NewConsultation = React.createClass({

    render: function () {
        return (
            <div>
                <div className="w1008 margin mar_20 ">
                    <div className="pro_L " style={{float: 'left'}}>

                    </div>
                    <div className="pro_R fr bg" style={{width: '1035px'}}>
                        <div className="pro_bg">
                            <span className="fr pad_L">您的位置： <a href="home.jsp">首页</a> &gt; 人寿保险 &gt; <a
                                href="#">理财保险</a></span>
                        </div>
                        <div className="article">
                            <div className="visual">
                                <h3 className="font_15 text">提出您的新问题</h3>
                                <p  className="newConsultation-subtitle">
                                    如果没有搜索到您需要的问题，请在此进行提问然后等待回答！
                                </p>
                                <div className="CreateNew-area">
                                    <div className="CreateNew-L">
                                        <article >
                                            <h1 >
                                                <a >您的问题</a>
                                            </h1>
                                            <hr></hr>
                                            <p>
                                                如果您在刚刚的搜索中没有找到与您问题相符的问题及解决方案，您可以在此提交您自己的问题，我们的客服人员将会在三到五个工作日之内对您的问题进行解答，敬请谅解！</p>
                                            <hr></hr>
                                        </article>
                                        <form    >
                                            <div >
                                                <label >问题/主题内容:<span>*</span> </label>
                                            </div>
                                            <div >
                                            <textarea className="CreateNew-area-textArea" ></textarea>
                                            </div>
                                            <div >
                                                <input type='button' className="CreateNew-btn" value="提交"/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="CreateNew-R">
                                            <section className="widget">
                                                <div className="support-widget">
                                                    <h3 className="support-widget-title">业务支持</h3>
                                                    <p > 如果您需要更多的业务支持，请与我们的客服取得联系！</p>
                                                    <hr/>
                                                    <h3 className="support-widget-title">客服电话:</h3>
                                                    <p >231231</p>
                                                    <h3 className="support-widget-title">客服QQ:</h3>
                                                    <p >44444</p>
                                                    <h3 className="support-widget-title">客服邮箱:</h3>
                                                    <p >44444@163.com</p>
                                                    <h3 className="support-widget-title">邮件地址:</h3>
                                                    <p >技术覅时间的覅及</p>
                                                </div>
                                            </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
});
module.exports = NewConsultation;