import React, { Component } from 'react'
import {Helmet} from 'react-helmet';
import Header from './Header';
import Ad from './Ad';
import "isomorphic-fetch";
import './../assets/css/individualSite.css';
import defaultcontentImage from "./../assets/images/contentImage.jpg";
import seologo from './../assets/images/trendingscan.png';
import logo from './../assets/images/logo.png';

// HTML Parser modules
import Parser from 'html-react-parser';
const striptags = require('striptags');
// import { render } from 'react-dom';


export default class IndividualBlog extends Component {
    constructor(props){
        super(props);
        this.state={
            loader:true,
            error:false,
            content:[]
        };
        this.ismounted=false;
    }
    parseHTML(value){
        return Parser(value);
    }
    movetohome(e){
        e.preventDefault();
        window.location.href="/";
    }
    _getParameter(identifier,stringify=false) {
        var result = undefined, tmp = [];
        var items = window.location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === identifier){
                result = decodeURIComponent(tmp[1]);
            }   
        }
        return result ? result : false;
    }
    componentWillMount(){
        if(this.props.match.params && this.props.match.params.id){
            fetch('/sites/'+this.props.match.params.id,{headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(response=> {return response.json()})
            .then(data=>{
                if(this.ismounted){
                    if(data.title){
                        this.setState({error:false,loader:false,content : data});
                    }else{
                        this.setState({error:true,loader:false,content : "Unable to get Page!!"});    
                    }
                }
            }).catch(err=>{
                if(this.ismounted){
                    this.setState({error:true,loader:false,content : err});
                }
            });
        }
    }

    componentDidMount(){
        this.ismounted=true;
    }
    componentWillUnmount(){
        this.ismounted=false;
    }
  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var contents=this.state.content,
        transformdate=new Date(this.state.content.created_date),
        searched_date = transformdate.getUTCDate()+"-"+monthNames[transformdate.getUTCMonth()]+"-"+transformdate.getUTCFullYear(),
        contentlink=(contents.contentLink && (contents.contentLink.length>0)) ? <a href={contents.contentLink} rel="nofollow, noindex, noopener" target="_blank" className="post-link"><b>Read More...</b></a> : "",
        contentImage=(contents.contentImageUrl && contents.contentImageUrl.length>0) ? contents.contentImageUrl : defaultcontentImage,
        summary=contents.summary && Object.keys(contents.summary).length ? (<div className="blog-content">
                                                                            <p>
                                                                                <b>{this.parseHTML(contents.summary.title)}</b>
                                                                            </p>
                                                                            <p>
                                                                                {this.parseHTML(contents.summary.content)}
                                                                            </p>
                                                                            <p>
                                                                                <b>Source : </b>{this.parseHTML(contents.summary.source)}
                                                                            </p>
                                                                            </div>) : (
                                                                            <div className="blog-content">
                                                                            <p>
                                                                                People do not visit a specific page in this search but most of the people searched for this keyword in <b>{contents.countryName}</b>
                                                                            </p>
                                                                            </div>);
    var seo_desc=(contents.summary && (contents.summary.content && contents.summary.content!="")) ? contents.summary.content : ((contents.summary && (contents.summary.title && contents.summary.title!="")) ? contents.summary.title : contents.title);
        seo_desc=striptags(seo_desc);
    return (
        <div>
            <Helmet
                title={contents.title ? contents.title : contents.countryName}
                meta={[
                    {name:'fb:page_id',content:'189414828370961'},
                    {property:'fb:app_id',content:'462468354180027'},
                    {property:'og:url',content:'http://trendingscan.com/'},
                    {property:'og:title',content:(contents.title ? contents.title : contents.countryName+"'s Top Trending Searches - Trendingscan")},
                    {property:'og:type',content:'article'},
                    {property:'og:description',content:seo_desc},
                    {property:'og:image',content:(contents.contentImageUrl && contents.contentImageUrl.length>0) ? contents.contentImageUrl : seologo},
                    {itemprop:'name',content:(contents.title ? contents.title : contents.countryName+"'s Top Trending Searches - Trendingscan")},
                    {itemprop:'description',content:seo_desc}, 
                    {itemprop:'image',content:(contents.contentImageUrl && contents.contentImageUrl.length>0) ? contents.contentImageUrl : seologo}
                ]}
                link={[
                    {rel:"alternate",hreflang:"x-default",href:"http://trendingscan.com/"},
                    {rel:"canonical",href:"http://trendingscan.com/"}
                ]}
            />
            <div className="container-fluid">
                <div className='row'>
                    <div className="sticky header">
                        <Header logo_url={logo} />
                    </div>
                </div>
                <div className='row contentroot'>
                    <div className="col-sm-3 col-xs-3 col-md-3 col-lg-3 hidden-xs body searchoptions" >
                        <div className="sticky col-sm-3 col-xs-3 col-md-3 col-lg-3">
                            <div>
                            {/* <Ad position={"LEFT"} content={""}/> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-6 col-md-6 col-lg-6 body">
                        <div className="section individual-roundededge">
                        {(this.state.loader) ? <div className="loader-wrapper"><label className="loader"></label></div> : 
                        (this.state.error) ? <div className="error-heading"><h1 className="text-center">Oops..!!</h1><div className="text-center error_info">Something Went Wrong. Please try again Later!!<div><label><span onClick={this.movetohome} className="button-home">Go to Home</span></label></div></div></div> : (
                            <div className="blog-post">
                                <input type="button" value="<< Back"  onClick={this.movetohome} className="btn btn-md btn-warning"/>
                                <h1 className="blog-title text-center">Trending in {contents.countryName}</h1>                    
                                <div style={{textAlign:"center",margin:"30px 0px"}}>
                                    <img src={contentImage} className="content-photo" alt="Searched Thumbimage"/>
                                </div>
                                <h1 className="blog-title">{contents.title}</h1>
                                <h2 className="date">
                                    Searched on {searched_date}
                                </h2>
                                <span className="view">
                                    <span className="glyphycon-icon view-icon"></span>
                                    <span className="search_traffic">{contents.traffic}+ <i>Views</i></span>
                                </span>
                                <p className="blog-content-description">
                                    {contents.description ? contents.description : ""}
                                </p>
                                {summary}
                                <div>
                                <input type="button" value="<< Back to Home"  className="btn btn-md btn-warning" onClick={this.movetohome}/>
                                {contentlink}
                                </div>
                            </div>)
                        }
                        </div>
                    </div>
                    <div className="col-sm-3 col-xs-3 col-md-3 col-lg-3 hidden-xs body" >
                        <div className="sticky col-sm-3 col-xs-3 col-md-3 col-lg-3">
                            <div>
                            <Ad position={"RIGHT"} content={""}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Ad position={"BOTTOM"} content={""}/>         */}
        </div>
    )
  }
}
