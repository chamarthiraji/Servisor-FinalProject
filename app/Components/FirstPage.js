import React,{Component} from 'react'
import { Link }  from 'react-router';
import SearchPage from '../components/search/SearchPage'

/* <Link  to="/providers/food" > */

export default class FirstPage extends Component {
	
	render() {
		return(
			<div className="jumbotron">
				<h2>Welcome!!</h2>
				<Link to="/searchPage">Search</Link>
				<p></p>

				<Link  to="/providers" >
					Browse for Providers</Link>
    		</div>
		);
	}
}