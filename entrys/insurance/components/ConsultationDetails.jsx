import React from 'react';
import {render} from 'react-dom';
import '../../../css/insurance/components/commonTopSupnuevo.css';
import '../../../css/insurance/components/navcontent.css';
import '../../../css/insurance/components/pagination.css';
import '../../../css/insurance/components/productIntroduction.css';
import '../../../css/insurance/components/Consultation.css';
import '../../../css/insurance/components/ConsultationDetails.css';
import Upload from '../../../entrys/insurance/components/Upload';
var SyncStore = require('../../../components/flux/stores/SyncStore');
var ProxyQ = require('../../../components/proxy/ProxyQ');

var TestConsultationDetails = React.createClass({
    Branch:function(url) {

        //if (this.state.session != true) {
        //    var loginModal = this.refs['loginModal'];
        //    $(loginModal).modal('show');
        //} else {
        if(this.props.Branch!==undefined&&this.props.Branch!==null)

        {
            var successModal = this.refs['successModal'];
            $(successModal).modal('hide');
            this.props.Branch(url);
            //var state = store.get('loginState');

        }
        //}

    },
    onChildChanged: function (date) {
        this.setState({
            img: date
        });

    },
    uploadAllQuestionContents:function(){
        if(this.state.img!=null||this.state.img!=undefined){
            this.state.attachId=true;
        }
        else{
            this.state.attachId=false;
        }
        this.saveOrUpdateQuestionContent();
    },


    getInitialState  : function () {
        var data=null;
        data = this.props.data;
        var title=null;
        title=this.props.title;
        var personId=null;
        personId=this.props.personId;
        var date=null;
        date=this.props.date;
        var comments=null;
        comments=this.props.comments;
        var img=null;
        img=this.props.img;
        this.getNotes();
        return ({data: data,
            title:title,
            personId:personId,
            date:date,
            comments:comments,
            files: []
        });
    },
    onSaveInput:function(event){

        this.state.content=event.target.value;
        //this.setState({content: event.target.value});

    },
    saveOrUpdateQuestionContent:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterProblemPage',
            reactActionName:'saveOrUpdateProblemContent',
            themeId:this.state.data.data[0].themeId,
            content:this.state.content,
            attachId:this.state.attachId,

            attachType : '73',
            ownerId : this.state.personId,
            fileName : this.state.content+'.jpg',
            folderName :'question' ,
            fileData:this.state.img

        };
        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function(ob) {
                if(ob.data=='success'){
                    var successModal = this.refs['successModal'];
                    $(successModal).modal('show');
                }

            }.bind(this),

            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    getNotes:function(){
        var url="/insurance/insuranceReactPageDataRequest.do";
        var params={
            reactPageName:'insurancePersonalCenterProblemPage',
            reactActionName:'getUserInfo'
        };
        ProxyQ.queryHandle(
            'post',
            url,
            params,
            null,
            function(ob) {
                if(ob.data==this.state.personId){
                    this.setState({myself:true,notes:SyncStore.getNote()});
                }

            }.bind(this),

            function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        );
    },
    render:function(){
        var lrs=[];
        if(this.state.notes==true&&this.state.myself==true){
            lrs.push(
                <div key={'my'} className="question-quiz" >
                        <div >
                            <label >继续提问:<span>*</span> </label>
                        </div>
                        <div >
                            <textarea  className="quizArea" onChange={this.onSaveInput.bind(this)}></textarea>
                        </div>
                        <div >
                            <label>上传图片: <span>*</span> </label>
                        </div>
                    <div>
                        <Upload ctrlName={'test'} callbackParent={this.onChildChanged.bind(this)}/>
                    </div>
                        {this.state.img ?
                            <div className="thumb-box" >
                                <img    className="quizImg" src={this.state.img}/>
                            </div> : null}
                        <div >
                            <input type="button" className="quizBtn" onClick={this.uploadAllQuestionContents}  value="Send Message" />
                        </div>
                </div>
            )
        }
        else{

        }
        var contents=this.state.data.data;
        var trs=[];
        contents.map(function (item, i) {
            if(item.contentType==1){
                trs.push(
                    <dl className="faqs" key={i}>
                        <dt>{item.content}</dt>
                    {item.attach ?
                        <div >
                            <p className="questionImageText">附图：</p>
                            <img  className="questionImage"
                              src={item.attach}/>
                        </div>: null}
                    </dl>
                )
            }else{
                trs.push(
                    <dl className="faqs" key={i}>
                        <dd>{item.content}</dd>
                        {item.attach ?
                        <div >
                            <p className="questionImageText">附图：</p>
                            <img className="questionImage"
                                 src={item.attach}/>
                        </div>: null}
                    </dl>
                )
            }

        });
        return(
            <div>
                <div >
                    <article className="questionDetailTitle clearfix">
                        <h1 className="questionTheme">问题主题：{this.state.title}</h1>
                        <div className="questionFootnote clearfix">
                            <button className="backQuestionList" onClick={this.Branch.bind(this,undefined)}>返回问题列表</button>
                            <span className="icon-comment" >{this.state.comments+'  '}Comments</span>
                            <span className="icon-calendar">{this.state.date.month+1+'月'+this.state.date.date+'日'}</span>
                        </div>
                    </article>
                    <hr className="consultationHR"/>
                    <div className="questionDetailContain">
                        <dl className="faqs">
                            <dt>{this.state.title}</dt>
                        </dl>
                        {trs}
                    </div>
                    <hr className="consultationHR" style={{marginTop:'25px'}}/>
                    {lrs}
                </div>
            </div>
        )
    }
});
module.exports = TestConsultationDetails;