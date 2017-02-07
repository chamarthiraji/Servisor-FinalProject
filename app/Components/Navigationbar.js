import React from 'react';
import { Link }  from 'react-router';
import  FbLogin from './register/FbLogin'

export default class Navigationbar extends  React.Component {

	constructor(props){
			super(props);
			console.log("Navigationbar props",props);
	}

	render() {
		const userLinks = (
			<ul className="nav navbar-nav navbar-right">

				<li><Link to="/signin" onClick={this.props.setLoggedIn} data={this.state}>Logout</Link></li>
			</ul>
		);

		const guestLinks = (
		 <ul className="nav navbar-nav navbar-right">

               <li><Link to="/signin" 
               		data={this.state}
               		>Sign In</Link></li>
               <li><Link to="/register">Register</Link></li>
               <li><FbLogin /></li>

           </ul>
             
		);          

		console.log("this.props.isLoggedIn",this.props.isLoggedIn);
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
	 	    		<div className="navbar-header">
	 	    			<Link to="/" className="navbar-brand">
	 	    				Servisor</Link>
	    			</div>
	    			<div className="collapse navbar-collapse"
	    			 	id="bs-example-navbar-collapse-1">

	    			 	{ this.props.isLoggedIn ? userLinks : guestLinks }

					</div>
	        	</div>
	        </nav>
	    			
		);
	}	
	
}
