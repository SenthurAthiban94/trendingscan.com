import React,{Component} from 'react';
import './../public/css/blog.css';
import defaultcontentImage from "./../public/assets/images/contentImage.jpg";
// HTML Parser modules
import Parser from 'html-react-parser';
// import { render } from 'react-dom';
////////////////////////////////////

export default class Blogcontent extends Component {
    constructor(){
        super();
        this.state={
            error:false,
            loader:true,
            contents_in_view:[],
            resultcount:20,
            next:false
        }
        this.moreresults=this.moreresults.bind(this);
        this.is_mounted=false;
    }
    sortByCity(cityname){
        this.setState({error:false,loader:true,contents_in_view : []});
        fetch('/sitesbycities/'+cityname+'/'+this.state.resultcount,{headers: {               //http://localhost:3001/
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(response=> {return response.json()})
        .then(data=>{
            if(this.is_mounted){
                this.setState({error:false,loader:false,contents_in_view : data},()=>{this.checknextsets(cityname)});
            }
        }).catch(err=>{
            if(this.is_mounted){
                this.setState({error:true,loader:false,contents_in_view : err});
            }
        });
    }
    checknextsets(cityname){
        fetch('/sitesbycities/'+cityname+'/'+(parseInt(this.state.resultcount,10) + 10),{headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(response=> {return response.json()})
        .then(data=>{
            var previousstate=this.state;
            if(data.length > this.state.contents_in_view.length){
                previousstate.next=true;
            }else{
                previousstate.next=false;
            }
            this.setState(previousstate);
        }).catch(err=>{
            this.setState({error:true,loader:false,contents_in_view : err});
        });
    }

    applyfilter(props){
        if(props){
            switch(props.filter.name){
                case "country":
                    this.sortByCity(props.filter.value);
                    break;
                case "query":
                    break;
                default:
                    break;
            }
        }
    }
    
    componentDidMount() {
        if(!this.is_mounted){
            this.is_mounted=true;
            console.log("Mounted");
            this.applyfilter(this.props);
        }
    }
    componentWillUnmount(){
        console.log("Mounting");
        this.is_mounted=false;
    }
    componentWillReceiveProps(nextProps) {
        var previousstate=this.state;
            previousstate.resultcount=10;
            this.setState(previousstate);
        this.applyfilter(nextProps);
    }
    moreresults(){
        var previousstate=this.state;
            previousstate.resultcount=this.state.resultcount+20;
            previousstate.next=false;
        this.setState(previousstate,()=>{
            this.applyfilter(this.props);
        });        
    }
    parseHTML(value){
        return Parser(value);
    }

    shorten_description(longstring,charCount){
        longstring=longstring.substring(0,charCount);
        return longstring.substr(0, Math.min(longstring.length, longstring.lastIndexOf(" ")))+"...";
    }

    createContentUrl(event,i){
        event.preventDefault();
        var pagetoshare="http://trendingscan.com/?id="+this.state.contents_in_view[i]["_id"],
            details=this.state.contents_in_view[i];
        this.socialshare(details,pagetoshare,event.target.parentElement.className);    
    }
    socialshare(details,url,media){
        var description=(details["summary"] && (details["summary"]["content"] && details["summary"]["content"]!="")) ? details["summary"]["content"] : ((details["summary"] && (details["summary"]["title"] && details["summary"]["title"]!="")) ? details["summary"]["title"] : details["title"]);
            description=this.shorten_description(this.stripHTML(description),50);
        switch(media){

            case "social_media_f":
                if(this.detectmobile()){
                    window.open('http://m.facebook.com/sharer.php?u='+encodeURIComponent(url));
                }else{
                    window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url)+'&amp;src=sdkpreparse','facebook-share-dialog','width=626,height=436');
                }
                break;
            case "social_media_t":
                window.open("https://twitter.com/share?url="+encodeURIComponent(url)+"&text="+description, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
                break;
            case "social_media_p":
                window.open("http://pinterest.com/pin/create/button/?url="+encodeURIComponent(url)+"&media="+details["contentImageUrl"]+"&description="+description);
                break;
            case "social_media_w":
                var domain="https://web.whatsapp.com/";
                if(this.detectmobile()){
                    domain="whatsapp://";
                }
                window.open(domain+"send?text=*"+description+"* \
                                                "+encodeURIComponent(url)+"\
                                                To Know The Trending Topic Searched On Internet Today Visit \
                                                *www.trendingscan.com*");
                break;
            default:
                break;
        }
    }
    
    detectmobile() {
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            return true;
        }else{
            return false;
        }
     }
    stripHTML(html)
    {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    render() {
        var renderelement= (
            <div className="content-wrapper">
                <h1 className="Heading">Trending on {this.props.filter.value}</h1>
                {    
                    (this.state.loader) ? <div className="loader-wrapper"><label className="loader"></label></div> : 
                    (this.state.error) ? <div className="text-center error_info">Something Went Wrong. Please try again Later!!</div> :
                    this.state.contents_in_view.map((e,v)=>{
                        var current_classname="blog-card "+((v % 2!==0) ? "alt" : ""),
                            image_url=e.contentImageUrl ? e.contentImageUrl : defaultcontentImage,
                            current_imageURL={background: 'url("'+image_url+'") center no-repeat',backgroundSize: '150px 150px'},
                            contentlink=e.contentLink ? (<a rel="nofollow, noindex, noopener" className="read_more" href={e.contentLink} target="_blank">Read More</a>) : "",
                            summary=e.summary ? (
                                                    <div className="summary">
                                                        <p>
                                                            {this.parseHTML(e.summary.title)}
                                                        </p>
                                                        <p>
                                                            {this.parseHTML(e.summary.content)}
                                                        </p>
                                                        <b>Source : </b><i>{this.parseHTML(e.summary.source)}</i>
                                                    </div>) : ( <div className="summary">
                                                                    <p>
                                                                        People in {e.countryName} have not searched this keyword "<b>{e.title}</b>" into any specific website, but still it is one of the most searched content over the web in {e.countryName}. 
                                                                    </p>
                                                                </div>);
                        return (                
                                <div className={current_classname} key={v}>
                                    <div className="blog-picture">
                                        <div className="photo" style={current_imageURL}></div>
                                    </div>
                                    <div className="views">
                                        <span className="glyphycon-icon view-icon"></span>
                                        <span className="search_traffic">{e.traffic}+ <i>Views</i></span>
                                    </div>
                                    <ul className="details">
                                        <li className="author">Share</li>
                                        {/* <li className="date">Aug. 24, 2015</li>
                                        <li className="tags"> */}
                                            {/* SHARE options  */}
                                            {/* <ul> */}
                                                <li><div className="social_media_w"><a href="" onClick={(event)=>this.createContentUrl(event,v)} data-action="share/whatsapp/share" className="social-links"> </a></div></li>
                                                <li><div className="social_media_f"><a href="" onClick={(event)=>this.createContentUrl(event,v)} className="social-links"> </a></div></li>
                                                <li><div className="social_media_p"><a href="" onClick={(event)=>this.createContentUrl(event,v)} className="social-links pin-it-button" count-layout="horizontal"> </a></div></li>
                                                <li><div className="social_media_t"><a href="" onClick={(event)=>this.createContentUrl(event,v)} className="social-links"> </a></div></li>
                                            {/* </ul> */}
                                        {/* </li> */}
                                    </ul>
                                    <div className="description">
                                        <a className="description_link" target="_blank" href={"./?id="+e._id}>
                                            <h3>{e.title}</h3>
                                        </a>
                                        <h2>{e.description}</h2>
                                        {summary}     
                                        {contentlink}
                                    </div>
                                </div>
                            )
                    })
                }               
        { (!this.state.error) && (!this.state.loader) && (this.state.next) ? 
            <div className="More-results">
                <span className="highlight" onClick={this.moreresults}>View More</span>
            </div> : ""
        }
        </div>
        )

        return renderelement;
    }
}
