import React,{Component} from 'react'
import axios from 'axios'

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
			about:''

		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e){
		this.setState({ [e.target.name]:e.target.value});

	}
	onSubmit(e) {
		e.preventDefault();
		console.log(this.state);
		axios.post('api/users',{user:this.state});
	}

	render() {
		return(
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
			);
	}
} 