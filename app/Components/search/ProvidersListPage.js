import React, { Component } from 'react';
import EmailModal from '../EmailModal';
import { Grid,Row,Col } from 'react-bootstrap';
import { Link }  from 'react-router';
import Reviews from './Reviews';

export default class ProvidersListPage extends Component {
	constructor(props){
		super(props);
		console.log("ProvidersListPage props",this.props.provider);
	}
	
	render() {
		return (
			<div>
				{
					(this.props.provider.userDataRefId) &&

					<li className="well providerList ">
						
						<div className="row">
							 <div className="col-xs-5 col-sm-3">
							 	<img src={this.props.provider.userDataRefId.image}
							 	 height="80" width="80" />
							 	 <br/><br/>{this.props.provider.userDataRefId.userName}
							 	 <br/><br/><EmailModal  providerEmail={this.props.provider.userDataRefId.email}/>
							 </div>
							 <div className="col-xs-2 col-sm-2">
							 </div>
							 <div className="col-xs-5 col-sm-7">
							 	About<br/>
							 	{this.props.provider.userDataRefId.about}<br/><br/>
							 	Service Type<br/>
							 	{this.props.provider.serviceName}<br/><br/>
							 	Specialization<br/>
							 	{this.props.provider.specializationName}<br/><br/>
							 	<Reviews  data={this.props.provider}/>
							 </div>
						</div>
								
					</li>
				}
			</div>
		)
	};
}				