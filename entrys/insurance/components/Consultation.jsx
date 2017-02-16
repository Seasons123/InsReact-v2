import React from 'react';
import {render} from 'react-dom';
import '../../../css/insurance/components/commonTopSupnuevo.css';
import '../../../css/insurance/components/navcontent.css';
import '../../../css/insurance/components/pagination.css';
import '../../../css/insurance/components/productIntroduction.css';
import '../../../css/insurance/components/Consultation.css';
import Calendar from './Calendar.jsx';
import PageNavigator from '../modules/PageNavigator.jsx';

var ProxyQ = require('../../../components/proxy/ProxyQ');
var Page = require('../modules/Page');
var SyncStore = require('../../../components/flux/stores/SyncStore');
var info={};
var today=new Date().toLocaleDateString().replace("/", "-").replace("/", "-");

var TestConsultation = React.createClass({
    Branch:function(branch){
        this.setState({nav: branch});
        this.initialData();
        this.getAllQuestion();

    },
    validate:function(){
        if(this.state.session!=true){

            var loginModal = this.refs['loginModal'];
            var username=$(loginModal).find("input[name='username']").val();
            var password=$(loginModal).find("input[name='password']").val();

            var url="/bsuims/bsMainFrameInit.do";
            var params={
                login_strLoginName: username,
                login_strPassword: password
            };

            ProxyQ.queryHandle(
                'post',
                url,
                params,
                null,
                function(res) {
                    var re = res.re;
                    if(re!==undefined && re!==null && (re ==1 || re =="1")){ //登陆成功
                        this.setState({session: true});
                        var loginModal = this.refs['loginModal'];
                        $(loginModal).modal('hide');
                        window.setTimeout(this.goToOthers('newQuestion'), 300);
                        SyncStore.setNote();

                    }
                }.bind(this),
                function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            );
        }
    },


    paginationData:function (data,pageIndex) {
        let capacity=data.length;
        var slices=null;
        Page.getInitialDataIndex(10,capacity,pageIndex,function(ob){
                slices=data.slice(ob.begin,ob.end);
            }
        );
        return slices;
    },
    previousCb:function (index,isChange) { //向前跳页
        this.setState({pageIndex:index,isChange:isChange});
    },

    pageCb:function(index,isChange) { //进入指定页的列表
        this.setState({pageIndex:index,isChange:isChange});
    },
    nextCb:function(index,isChange){ //向后跳页,isChange为true
        this.setState({pageIndex:index,isChange:isChange});
    },

    goToOthers:function(branch){
        if (this.state.session != true) {
            var loginModal = this.refs['loginModal'];
            $(loginModal).modal('show');
        } else {
            this.setState({
                nav: branch,
            });
        }
    },

    getInitialState: function() {
        return {

            checked: !!this.props.checked,
            current: 'carOrder',
            startData:null,
            endDate:null,
            pageIndex:0,
            isChange:false,
            value:null,
            session:SyncStore.getNote(),
            dataTg:1


        }
    },

    initialData:function(){

        window.setTimeout(function () {

            this.setState({
                data: info.data
            })
        }.bind(this), 300);

    },
    onSaveInput:function(event){

        this.setState({value: event.target.value});

    },
    onChildChanged: function (type,date) {
        switch (type){
            case 'startDate':
                this.setState({
                    startData: date
                });
                break;
            case 'endDate':
                this.setState({
                    endData: date
                });
                break;
        }
    },
    getQuestionContent:function(item,title,personId,date,comments){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterProblemPage',
            reactActionName:'getProblemContent',
            themeId:item
        };

        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function(ob) {
                info=ob;
                if(info.data=="data is null"){
                    alert("暂无解答！");
                }else{
                    this.state.nav='consultationDetails';
                    this.initialData();
                }


            }.bind(this),

            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
        this.state.title=title;
        this.state.personId=personId;
        this.state.date=date;
        this.state.comments=comments;
    },
    setDataTg:function(){
        this.state.dataTg=this.state.dataTg+1;
        if(this.state.dataTg%2==0){
            $('#lab5').attr('data-tg','只看自己');
            this.getMyQuestion();
        }else{
            $('#lab5').attr('data-tg','全部');
            this.getLimitQuestion();
        }

    },

    getMyQuestion:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterProblemPage',
            reactActionName:'getMyProblem',
        };
        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function(ob) {
                info=ob;
                this.state.nav=undefined;
                this.initialData();
            }.bind(this),

            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    getLimitQuestion:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterProblemPage',
            reactActionName:'getLimitProblem',
            startDate:this.state.startData,
            endDate:this.state.endData,
            title:this.state.value
        };

        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function(ob) {
                info=ob;
                this.state.nav=undefined;
                this.initialData();

            }.bind(this),

            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    getAllQuestion:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterProblemPage',
            reactActionName:'getProblemList'
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
            if(this.state.nav!='consultationDetails'&&this.state.nav!='newQuestion') {
                var test = this.state.data;
                var data = this.paginationData(test, this.state.pageIndex);
                var trs = [];
                var ref = this;
                data.map(function (item, i) {
                    trs.push(
                        <ul className="question-detail-item-list" >
                            <li className="item clearfix" key={i}>
                                <div className="what">
                                    {item.title}
                                </div>
                                <div className="who">
                                {item.perName}
                                </div>
                                <div className="when">
                                    {item.createTime.month+1 + "月" + item.createTime.date + "日"
                                + item.createTime.hours + ":" + item.createTime.minutes}
                                </div>
                                <div className="details"  onClick={ref.getQuestionContent.bind(this,item.themeId,item.title,item.personId,item.createTime,item.readCount)}>
                                <a > 详情 </a>
                                </div>
                            </li>
                        </ul>
                    )
                });
            }
            switch (this.state.nav) {
                case undefined:
                    container =
                        <div>
                            <div className="question-detail" >
                                <ul className="question-detail-masthead clearfix">
                                    <li className="what">主题/问题</li>
                                    <li className="who">提问者</li>
                                    <li className="when">日期</li>
                                    <li className="details">详情</li>
                                </ul>
                                <div>
                                    {trs}
                                </div>
                                <PageNavigator
                                    capacity={this.state.data.length}
                                    pageIndex={this.state.pageIndex}
                                    pageBegin={1}
                                    previousCb={this.previousCb}
                                    pageCb={this.pageCb}
                                    nextCb={this.nextCb}
                                    isChange={this.state.isChange}
                                    paginate={Page}
                                    />
                            </div>
                        </div>

                    break;
            }
        }else{

            this.initialData();
        }
        let  navbar;
        if(this.state.nav!='newQuestion') {
            navbar =
                <div className='questionSearchContainer'>
                    <div className='search-area '>
                        <form className='clearfix' method="get" action="#">
                            <div style={{marginTop:'15px'}}>
                                <div className='questionText'>
                                            <span >
                                                 <input className='search-term-question' type="text"
                                                        placeholder="在此输入您的问题进行搜索！"
                                                        onChange={this.onSaveInput.bind(this)}/>
                                            </span>
                                </div>
                                <div className='time'>
                                    <div className='row-50'>
                                                <span style={{float:'left',marginTop:'3px'}}>
                                                     <h2>时间：</h2>
                                                </span>

                                        <div  >
                                                    <span>
                                                       <Calendar data={today} ctrlName={'consultation'}
                                                                 callbackParent={this.onChildChanged.bind(this,'startDate')}/>
                                                    </span>
                                        </div>
                                    </div>
                                    <div className='row-50'>
                                                <span style={{float:'left',marginLeft:'-90px',marginTop:'3px'}}>
                                                        <h2>起——至</h2>
                                                </span>

                                        <div style={{marginLeft:'-36px'}}>
                                                    <span >
                                                        <Calendar data={today} ctrlName={'consultation'}
                                                                  callbackParent={this.onChildChanged.bind(this,'endDate')}/>
                                                    </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="searchButton">
                                            <span >
                                                <input type='button' className="search-btn" onClick={this.getLimitQuestion} value="搜索"/>
                                            </span>
                                </div>
                                <div className="search-newButton">
                                            <span >
                                                <input type='button' className="search-new"  onClick={this.goToOthers.bind(this,'newQuestion')}
                                                       value="创建新问题"/>
                                            </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>;
        }
            return(
            <div>
                <div className="w1008 margin mar_20 ">
                    <div className="pro_L " style={{float:'left'}}>

                    </div>
                    <div className="pro_R fr bg" style={{width:'1035px'}}>
                        <div className="pro_bg">
                            <span className="fr pad_L">您的位置： <a href="home.jsp">首页</a> &gt; 人寿保险 &gt; <a
                                href="#">理财保险</a></span>
                        </div>
                        <div className="article">
                            <div className="visual">
                                <h3 className="font_15 text">问题搜索</h3>
                    <div className='questionSearchContainer'>
                        {navbar}
                        <div className="question-area" onLoad={this.getAllQuestion()}>
                            <h3 className="font_15 text">问题列表</h3>
                            {container}
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
});
module.exports = TestConsultation;