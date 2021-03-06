import React,{Component} from 'react'
import axios from 'axios'
import SigninForm from '../signin/SigninForm'

var tmpserviceRegisteredStatus;

export default class SearchPage extends Component {

	constructor(props){
			super(props);
			console.log("SearchPage props",props);
			this.state = {
				serviceType : "",
				specializationName:"",
				serviceRegisteredStatus:false
			}

		this.state["userDataRefId"] = props.data;	
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.setServiceRegisteredState = this.setServiceRegisteredState.bind(this);

	}

	onChange(e){
		this.setState({ [e.target.name]:e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		//console.log("hi user input data: ",this.state);
		var x = this;
		axios.post('api/serviceproviders',{services:this.state})
		.then(function(result){
			console.log("axios serviceproviders ",JSON.stringify(result));

			tmpserviceRegisteredStatus = true;
 			x.setServiceRegisteredState();
		}, function(err2) {
			console.log("api/users call  err2:"+err2);
		});
	}

	setServiceRegisteredState() {
		// console.log("hello setServiceRegisteredState");
		var newState = this.state;
		// console.log('state', newState);
		newState["serviceRegisteredStatus"]=tmpserviceRegisteredStatus;
		this.setState(newState);
		console.log("setServiceRegisteredState tmpserviceRegisteredStatus:"+
			tmpserviceRegisteredStatus);
	}

	render(){

		return(
			<div>

				{ this.state.serviceRegisteredStatus === false &&
	 
				 	<div className="registerPage2">

						<form onSubmit={this.onSubmit}>
							<h3>Service Provider's Data</h3>
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
								<button className="btn btn-primary btn-md">
									Register
								</button>
							</div>
						</form>
					</div>	
				}

			</div>
		);
	}	
}