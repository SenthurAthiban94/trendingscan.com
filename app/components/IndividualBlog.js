import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import './../public/css/individualSite.css';
import defaultcontentImage from "./../public/assets/images/contentImage.jpg";
// HTML Parser modules
import Parser from 'html-react-parser';
import seologo from './../public/assets/images/FB-Trendingscan.png';



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
        fetch('http://trendingscan.com/sites/'+this.props.id,{headers: {               //http://localhost:3001/
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

    componentDidMount(){
        this.ismounted=true;
    }
    componentWillUnmount(){
        this.ismounted=false;
    }

    stripHTML(html)
    {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var contents=this.state.content,
        transformdate=new Date(this.state.content.created_date),
        searched_date = transformdate.getUTCDate()+"-"+monthNames[transformdate.getUTCMonth()]+"-"+transformdate.getUTCFullYear(),
        contentlink=(contents.contentLink && (contents.contentLink.length>0)) ? <a href={contents.contentLink} rel="nofollow, noindex, noopener" target="_blank" className="post-link">Read More...</a> : "",
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
        seo_desc=this.stripHTML(seo_desc);
    return (
        <div>
            <Helmet>
                <title>{"Trendingscan "+(contents.title ? "- "+contents.title : contents.countryName)}</title>
                <link rel="alternate" hreflang="x-default" href="http://trendingscan.com/" />
                <link rel="canonical" href="http://trendingscan.com/" /> 
                <meta name="description" content={seo_desc} />
                <meta name="fb:page_id" content="189414828370961" />
                <meta name="og:country-name" content={contents.countryName}/> 
                <meta itemprop="name" content={contents.title} />
                <meta itemprop="image" content={"./"+seologo} />
                <meta itemprop="description" content={seo_desc} />
                <meta property="fb:app_id" content="462468354180027"/>
		<meta property="og:url" content="http://trendingscan.com/" />
                <meta property="og:title" content={contents.title} />
                <meta property="og:type" content="article"/>
                <meta property="og:description" content={seo_desc}/>
                <meta property="og:image" content={"./"+seologo}/>
            </Helmet>
        <div className="container individual-container">
                {(this.state.loader) ? <div className="loader-wrapper"><label className="loader"></label></div> : 
                (this.state.error) ? <div><h1 className="text-center">Oops..!!</h1><div className="text-center error_info">Something Went Wrong. Please try again Later!!<div><label><span onClick={this.movetohome} className="button-home">Go to Home</span></label></div></div></div> : (
            <div className="section">
                    <div className="blog-post">
                        <h1 className="blog-title">Trending in {contents.countryName}</h1>                    
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
                        {contentlink}
                    </div>
            </div>)
            }
        </div>
    </div>
    )
  }
}
