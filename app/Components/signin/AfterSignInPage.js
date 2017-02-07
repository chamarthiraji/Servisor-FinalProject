import React,{Component} from 'react';
import { Link }  from 'react-router';
import { Button } from 'react-bootstrap';

export default class AfterSignInPage extends Component {
	constructor(props){
		super(props);
		console.log("AfterSignInPage props",props);
	}	

	render() {
		return(
			<div>
				<Button>
					<Link  to="/providers" >
						Browse for Providers</Link>
				</Button>	
				<Button bsStyle="info">
					<Link  to="/" >My Account</Link>
				</Button>	

			</div>			
		);
	}	
}	