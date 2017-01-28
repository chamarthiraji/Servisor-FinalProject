import React,{Component} from 'react';
import axios from 'axios';
import SearchPage from '../search/SearchPage';

var tmpUserRegisteredStatus;
var tmpUserRegisteredMsg;
var tmpmongoId;

export default class RigisterForm extends Component {

	constructor(props){
		super(props);
		this.state={
			username:'',
			password:'',
			userid:'',
			phonenum:'',
			email:'',
			image:'',
			about:'',
			userRegisteredStatus:undefined,
			userRegisteredMsg:'',
			mongoId:undefined
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    	this.setUserRegisteredState = this.setUserRegisteredState.bind(this);
	}

	onChange(e){
		this.setState({ [e.target.name]:e.target.value});
		// console.log('state', this.state);
	}


	onSubmit(e) {
		e.preventDefault();
		// console.log("hi user input data: ",this.state);
		var x = this;
		axios.post('api/users',{user:this.state})
		.then(function(result){
			// console.log('result', result)
			
			tmpUserRegisteredStatus = result.data.inserted;
 			tmpUserRegisteredMsg = result.data.message;
 			tmpmongoId = result.data.dbId;
 			x.setUserRegisteredState();

		}, function(err2) {
			// console.log("api/users call  err2:"+err2);
		}); 
	}

	setUserRegisteredState() {
		// console.log("hello setUserRegisteredState");
		var newState = this.state;
		// console.log('state', newState);
		newState["userRegisteredStatus"]=tmpUserRegisteredStatus;
		newState["userRegisteredMsg"] = tmpUserRegisteredMsg;
		newState["mongoId"] = tmpmongoId;
		this.setState(newState);
	}

	render() {
		return(
			<div>
				{ this.state.userRegisteredStatus === false &&
					<div className="form-group">
					 User already exists hello .
					 { this.state.userRegisteredMsg }

					</div>
				}

				{ (this.state.userRegisteredStatus === true) &&
					<div className="form-group">
					 hi User registered successfully - {this.state.mongoId}.
					 { this.state.userRegisteredMsg }
					 <SearchPage data={this.state.mongoId} />
					</div>
				}

				{ (this.state.userRegisteredStatus === undefined ||
					this.state.userRegisteredStatus === false) &&


					<form onSubmit={this.onSubmit}>
						<h1>Register in our community!</h1>
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
							<label className="control-label">UserName</label>
							<input
								type="text"
								name="username"
								value={this.state.username}
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
							<label className="control-label">PhoneNumber</label>
							<input
								type="text"
								name="phonenum"
								value={this.state.phonenum}
								onChange={this.onChange}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label className="control-label">Email</label>
							<input
								type="email"
								name="email"
								value={this.state.email}
								onChange={this.onChange}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label className="control-label">
							Image</label>
							<input
								type="text"
								name="image"
								value={this.state.image}
								onChange={this.onChange}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label className="control-label">Describe</label>
							<input
								type="text"
								name="about"
								value={this.state.about}
								onChange={this.onChange}
								className="form-control"
							/>
						</div>

						<div className="form-group">
							<button className="btn btn-primary btn-lg">
								Register
							</button>
						</div>
					</form>
				}
			</div>
		);
	}
}