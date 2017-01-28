import React,{Component} from 'react'
import axios from 'axios'
import bcrypt from 'bcryptjs';
// console.log(bcrypt);

export default class SigninForm extends Component {
	constructor(props){
		super(props);
		this.state={
			username:'',
			password:''
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e){
		this.setState({ [e.target.name]:e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		axios.post('api/users',{user:this.state})
		.then((response) => {
			if(response.data.success) {
				// do whatever you want to do
				console.log('correct password')
			} else {
				// message with wrong password
				console.log('wrong password')
			}
		})
		.catch((error) => {
			console.log(error);
		})
	}

	render() {
		return(
			<form onSubmit={this.onSubmit}>
				<h1>Join our community!</h1>
				<div className="form-group">
					<label className="control-label">Username</label>
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
					<button className="btn btn-primary btn-lg">
						sign up
					</button>
				</div>


			</form>
			);
	}
}