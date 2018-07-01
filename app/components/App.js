import React, { Component } from 'react';
import { Switch, Route,Redirect} from 'react-router-dom';
import {Helmet} from "react-helmet";
// Import Components
import Homepage from './Home';
import PrivacyPolicy from './PrivacyPolicy';
import IndividualComponent from './IndividualBlog';

export default class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Helmet
					htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
					titleTemplate="%s | Trendingscan - Top Searches"
					titleAttributes={{itemprop: "name", lang: "en"}}
					meta={[
						{name: "description", content: "Trendingscan - Top Trending Searches"},
						{name: "viewport", content: "width=device-width, initial-scale=1"},
					]}
					link={[
						{rel:"icon shortcut",href:'/build/favicon.ico'},
						{rel:"stylesheet",type:"text/css",href:'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',crossorigin:'anonymous'}
					]}
				/>
				<Switch>
					<Route exact path='/' component={ Homepage } />
					<Route path="/privacy-policy" exact component={ PrivacyPolicy } />
					<Route path="/desc/:id" exact strict component={ IndividualComponent } />
					<Redirect from='/' to ='/' strict />
				</Switch>
			</div>
		);
	}
}