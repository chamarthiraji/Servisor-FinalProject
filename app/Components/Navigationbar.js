import React from 'react';
import { Link }  from 'react-router';
import  FbLogin from './register/FbLogin'

export default class Navigationbar extends  React.Component {
	render(){

		return (
			
			<nav className="navbar navbar-default">
  				<div className="container-fluid">
	 	    		<div className="navbar-header">
	 	    			<Link to="/" className="navbar-brand">
	 	    				Servisor</Link>
	    			</div>
	    			<div className="collapse navbar-collapse"
	    			 	id="bs-example-navbar-collapse-1">
	    				<ul className="nav navbar-nav navbar-right">
	        				<li><Link to="/signin">Sign In</Link></li>
	        				<li><Link to="/register">Register</Link></li>	
							<li><FbLogin /></li>
	        			</ul>
	        		</div>	
	        	</div>
	        </nav>
	    			
		);
	}		
	
}