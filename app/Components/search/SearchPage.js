import React,{Component} from 'react'
import axios from 'axios'

export default class SearchPage extends Component {

	constructor(props){
			super(props);
			console.log("SearchPage props",props);
			this.state = {
				serviceType : "",
				specializationName:""

			}
		this.state["user_id"] = props.data;	
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e){
		this.setState({ [e.target.name]:e.target.value});

	}


	onSubmit(e) {
		e.preventDefault();
		console.log("hi user input data: ",this.state);
		//var x = this;
		axios.post('api/serviceproviders',{services:this.state})
		.then(function(result){
			console.log("axios serviceproviders ",JSON.stringify(result));
			console.log("axios serviceproviders ",result.data.inserted);
			
		}, function(err2) {
			console.log("api/users call  err2:"+err2);
		}); // e;
	}


	
	render(){

		return(
			<div>
				<form onSubmit={this.onSubmit}>
					<h1>Service Provider's Data</h1>
					<div className="form-group">
						<label className="control-label">ServiceType</label>
						<input
							type="text"
							name="serviceType"
							value={this.state.serviceType}
							onChange={this.onChange}
							className="form-control"
						/>
					</div>
					
					<div className="form-group">
						<label className="control-label">Specialization Name</label>
						<input
							type="text"
							name="specializationName"
							value={this.state.specializationName}
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

			</div>
			);
	}	
}