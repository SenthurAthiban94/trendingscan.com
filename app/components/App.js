import React, { Component } from 'react'
import {Helmet} from 'react-helmet';
import Header from './Header';
import Ad from './Ad';
import Search from './Search';
import Blogcontent from './Blogcontent';
import IndividualBlog from './IndividualBlog';
import PrivacyPolicy from './PrivacyPolicy';
import './../public/css/Main.css';
import logo from './../public/assets/images/logo.png';

class App extends Component {
  constructor(){
    super();
    this.state={
      filter : {
        name:"country",
        value:"India"
      },
      blogdetails : this._getParameter('id')
    }
    this.changefilter=this.changefilter.bind(this);
  }

   _getParameter(identifier) {
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

  changefilter(filterdata){
    switch(filterdata.name){
      case "country":
          this.setState({filter : filterdata,blogdetails : false})
          break;
      case "query":
          break;
      default:
          break;
    }
  }
  
  getAddress (latitude, longitude) {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyBn7F5tuFmuhWoC8ntngoGZ2RYjVG9vcWA')
    .then(response=> {return response.json()})
    .then(response=>{
            // console.log('User\'s Address Data is ', response);
            if(response.results && Object.keys(response.results).length){
              this.setState({filter:{name:"country",value:response.results[0].address_components[9].long_name},blogdetails : this._getParameter('id')});
            }
      }).catch(err=>{
        console.log('Request failed.  Returned status of',err);
    })
  }
  componentWillMount(){
    // this.getmylocation();
    // this.ipLookUp();
  }
  viewPrivacyPolicy(){
    var currentpage=window.location.href;
    if(currentpage==="http://localhost:8080/privacy-policy/" || currentpage==="http://localhost:8080/privacy-policy"){    
       return true;
    }
    return false;
  }

  ipLookUp() {
    fetch('http://ip-api.com/json')
    .then(response => response.json())
    .then(response=>{
        // console.log('User\'s Location Data is ', response);
        // console.log('User\'s Country', response.country);
        // getAdress(response.lat, response.lon)
    })
    .catch((err,status)=>{
        console.log('Request failed.  Returned status of',status);
    });
  }
  getmylocation(){
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      var superscope=this;
      navigator.geolocation.getCurrentPosition(
       function success(position) {
        // for when getting location is a success
        //  console.log('latitude', position.coords.latitude, 
        //              'longitude', position.coords.longitude);
        superscope.getAddress(position.coords.latitude, position.coords.longitude);
       },
      function error(error_message) {
        // for when getting location results in an error
        // console.error('An error has occured while retrievinglocation', error_message)
      }  
    );
    }else {
      // geolocation is not supported
      // get your location some other way
      // console.log('geolocation is not enabled on this browser')
    }
  }
  render() {
    var searchoption=this.state.blogdetails ? "" : (<Search filter={this.changefilter}/>);
    var contents_container=this.state.blogdetails ? (
                            <IndividualBlog id={this.state.blogdetails} currenturl={this.state.blogdetails}/>
                          ) : (
                            <Blogcontent filter={this.state.filter} />
                          );
      
    var pagecontent= this.viewPrivacyPolicy() ? (<div>
                          <Helmet>
                              <title>Trendingscan | Home</title>
                              <link rel="alternate" hreflang="x-default" href="http://trendingscan.com/" />
                              <link rel="canonical" href="http://trendingscan.com/" /> 
                              <meta name="description" content="Explore Top Trending Searches On Internet With Trendingscan" />
                              <meta name="fb:page_id" content="189414828370961" />
                              {/* <meta name="og:country-name" content="India"/> */}
                              <meta itemprop="name" content="News New Trending Searches" />
                              <meta itemprop="image" content="./public/assets/images/logo.png" />
                              <meta itemprop="description" content="Explore Top Trending Searches On Internet With Trendingscan" />
                              <meta property="fb:app_id" content="462468354180027"/>
                              <meta property="og:url" content="http://trendingscan.com/" />
                              <meta property="og:title" content="Trendingscan - Top Trending Searches" />
                              <meta property="og:type" content="article"/>
                              <meta property="og:description" content="Explore Top Trending Searches On Internet With Trendingscan"/>
                              <meta property="og:image" content="./public/assets/images/logo.png"/>
                          </Helmet>
                          <div className="container-fluid">
                            <div className='row'>
                              <div className="sticky header">
                                <Header logo_url={`${logo}`} />
                              </div>
                            </div>
                          </div>
                          <div className="privacy">
                            <PrivacyPolicy />
                          </div>
                        </div> ) :
                        (<div>
                          <Helmet>
                              <title>Trendingscan | Home</title>
                              <link rel="alternate" hreflang="x-default" href="http://trendingscan.com/" />
                              <link rel="canonical" href="http://trendingscan.com/" /> 
                              <meta name="description" content="Explore Top Trending Searches On Internet With Trendingscan" />
                              <meta name="fb:page_id" content="189414828370961" />
                              {/* <meta name="og:country-name" content="India"/> */}
                              <meta itemprop="name" content="News New Trending Searches" />
                              <meta itemprop="image" content="./public/assets/images/logo.png" />
                              <meta itemprop="description" content="Explore Top Trending Searches On Internet With Trendingscan" />
                              <meta property="fb:app_id" content="462468354180027"/>
                              <meta property="og:url" content="http://trendingscan.com/" />
                              <meta property="og:title" content="Trendingscan - Top Trending Searches" />
                              <meta property="og:type" content="article"/>
                              <meta property="og:description" content="Explore Top Trending Searches On Internet With Trendingscan"/>
                              <meta property="og:image" content="./public/assets/images/logo.png"/>
                          </Helmet>
                          <div className="container-fluid">
                            <div className='row'>
                              <div className="sticky header">
                                <Header logo_url={`${logo}`} />
                              </div>
                            </div>
                            <div className='row contentroot'>
                              <div className="col-sm-3 col-xs-3 col-md-3 col-lg-3 hidden-xs body searchoptions" >
                                <div className="sticky col-sm-3 col-xs-3 col-md-3 col-lg-3">
                                  {searchoption}
                                  <div>
                                    {/* <Ad position={"LEFT"} content={""}/> */}
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6 col-xs-6 col-md-6 col-lg-6 body">
                                  {contents_container}
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
                      );
      return pagecontent;
  }
}

export default App;