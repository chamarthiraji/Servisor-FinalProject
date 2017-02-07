import React,{Component} from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import AfterSignInPage from './AfterSignInPage';
import Navigationbar from '../Navigationbar';
var tempMessage;
var tempSuccess2;

export default class SigninForm extends Component {
	constructor(props){
		super(props);
		console.log("SigninForm props:"+JSON.stringify(props));

		this.state={
			userid:'',
			password:'',
			success2:undefined,
			message:'',
			isLoggedIn: false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.setUserSigninState = this.setUserSigninState.bind(this);

		console.log(' SigninForm final state', this.state);
	}

	onChange(e){
		this.setState({ [e.target.name]:e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();

		console.log("inside signin form this.state",this.state);
		var x = this;
		axios.post('api/users',{user:this.state})
		.then((response) => {
			console.log("signin form axios response",response);

			tempMessage = response.data.message;
			tempSuccess2 = response.data.success;

			x.setUserSigninState();

		})
		.catch((error) => {
			console.log(error);
		})
	}

	setUserSigninState() {
		// console.log("hello setUserRegisteredState");
		var newState = this.state;
		// console.log('state', newState);
		newState["message"]=tempMessage;
		newState["success2"] = tempSuccess2;
		newState["success2"] = tempSuccess2;
		if (tempSuccess2) {
		 newState["isLoggedIn"]= true;
		 this.props.setLoggedIn();
		}
		
		this.setState(newState);
		console.log('setUserSigninState newState', newState);

	}

	render() {
		return(
		<div>	
		<div>hello {this.state.success2}</div>
			{ (this.state.success2 === false ) &&
				<div>
					<p>Please enter correct Password</p>
					
				</div>	
			}	

			{ (this.state.success2 === true)	 &&
				<div>
					
					{this.state.message} 
					<AfterSignInPage data={this.state} />

				</div>
			}	

			{(this.state.success2 === undefined ||
				this.state.success2 === false) 
				&&
			
				<form onSubmit={this.onSubmit}>
					<h1>Join our community!</h1>
					<div className="form-group">
						<label className="control-label">UserID</label>
						<input
							type="text"
							name="userid"
							value={this.state.userid}
							onChange={this.onChange}
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<label className="control-label">Password</label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.onChange}
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-primary btn-lg">
							sign in
						</button>
					</div>
				</form>
			}
		</div>	
		);
	}
}