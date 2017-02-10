import React, { Component } from 'react';
import { FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';
//import nodemailer from 'nodemailer';

import axios from 'axios';



export default class ModalForm extends Component {
	constructor(props){
		super(props);
		console.log("modal prpos",props);
		this.state = {
			email:'',
			subject:'',
			message:''
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e){
		this.setState({ [e.target.name]:e.target.value});
	}
	showAlert() {
		alert("message sent");
	}

	onSubmit(e){
		e.preventDefault();
		const {email} = this.props;
		const state = this.state;
		const info = {
			providerEmail: email,
			customerEmail:this.state.email,
			subject:this.state.subject,
			message:this.state.message
		}
		axios.post('api/sendmail',info)
		.then((response) => {
			console.log("sendmail response",response);


		})
		.catch((error) => {
			console.log(error);
		})	


	}


	render() {
		return (
			<form onSubmit={this.onSubmit}>
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
					<label className="control-label">subject</label>
					<input
						type="text"
						name="subject"
						value={this.state.subject}
						onChange={this.onChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label className="control-label">message</label>
					<input
						type="text"
						name="message"
						value={this.state.message}
						onChange={this.onChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
						<button className="btn btn-primary btn-lg" onClick={this.showAlert}>
							Submit
						</button>
				</div>


			</form>
    
			    
			);
	}	
}		