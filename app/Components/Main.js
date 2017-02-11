import React, { Component } from 'react';
import { Link }  from 'react-router';
import Navigationbar from './Navigationbar'

export default class Main extends Component {
	constructor(props){
		super(props);
		this.state={
			isLoggedIn: false
		}

		this.setLoggedIn = this.setLoggedIn.bind(this);
	}

	setLoggedIn() {
		const {isLoggedIn} = this.state;
		console.log("isLoggedIn", isLoggedIn);
		this.setState({ isLoggedIn: !isLoggedIn })
	}	


	render() {

		return (
			<div>
				<div className="container">
					<Navigationbar isLoggedIn={this.state.isLoggedIn}
								   setLoggedIn={this.setLoggedIn}
					/>
					
					{this.props.children && React.cloneElement(this.props.children, {
              setLoggedIn: this.setLoggedIn
            })} 
					
				</div>	
      		</div>
    	);
  	}
}
