import React,{Component} from 'react'
import axios from 'axios'
import { ButtonGroup,Button,DropdownButton,MenuItem } from 'react-bootstrap';

import ProvidersListPage from './ProvidersListPage'

export default class ProvidersPage extends Component {

	constructor(props){
			super(props);
			console.log("ProvidersPage props",JSON.stringify(props.params));
			this.state = {
				providers: [],
				serviceName : undefined,
				specializationName : undefined
			}
			this.serviceSelect = this.serviceSelect.bind(this);
			this.specializationSelect = this.specializationSelect.bind(this);
			this.getProviderData = this.getProviderData.bind(this);
	}

	componentDidMount() {
		console.log("inside componentDidMount");
		//console.log("serviceName:"+this.props.params.serviceName);
		
		//axios.get('/api/providers/' + this.props.params.serviceName).then(
		this.getProviderData();
	} 

	getProviderData() {

	 	axios.post('/api/providers',this.state).then(
			providers => {
				console.log("providers data",providers.data);
				this.setState({ providers: providers.data });
			}
		);

	} // end of - getProviderData

	serviceSelect (eventKey){
	 	
	 	console.log("serviceSelect evtKey",eventKey);
	 	

	 	var newState = this.state;
		// console.log('state', newState);
		newState["serviceName"]=eventKey;
		this.setState(newState);

		this.getProviderData();

	}

	specializationSelect (eventKey){
	 	
	 	console.log("specializationName evtKey",eventKey);
	 	

	 	var newState = this.state;
		// console.log('state', newState);
		newState["specializationName"]=eventKey;
		this.setState(newState);

		this.getProviderData();

	}

	render() {
		return(
			<div className="">
				<ButtonGroup justified>
				    <DropdownButton  onSelect={this.specializationSelect} title="Search by Specialization" id="bg-justified-dropdown">
				      <MenuItem eventKey="math">Math</MenuItem>
				      <MenuItem eventKey="English">English</MenuItem>
				      <MenuItem eventKey="veg">Vegitarian</MenuItem>
				    </DropdownButton>
				    
				    <DropdownButton  onSelect={this.serviceSelect} title="Search by Service" id="bg-justified-dropdown">
				      <MenuItem eventKey="Catering">Catering</MenuItem>
				      <MenuItem eventKey="Food">Food</MenuItem>
				      <MenuItem eventKey="Tutoring">Tutoring</MenuItem>
				    </DropdownButton>
				</ButtonGroup>

				<ul>
					{this.state.providers.map(provider =>
					  <ProvidersListPage key={provider._id} provider={provider}/>
					
					)}
				</ul>
    		</div>
		);
	}

}	