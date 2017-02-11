import React,{Component} from 'react';
import { Link }  from 'react-router';
import Navigationbar from './Navigationbar';

export default class Logout extends Component {
	
	render() {
		return(
			<div >
				{/*<Navigationbar />*/}
				<h2>You are logged out successfully</h2> 
				<p>Go to
				<Link to="/FirstPage">Home Page</Link>
				</p>
				
    		</div>
		);
	}
}