import React, { Component } from 'react';

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

						<li className="well">
							<p>{this.props.provider.userName}</p>

							<p>{this.props.provider.serviceName}</p>

							<p>{this.props.provider.specializationName}</p>

							<p>{this.props.provider.userDataRefId.userId}</p>

							<p>{this.props.provider.userDataRefId.email}</p>
							

							{
								/* comment

								
							 */
							}
						</li>
					}
			</div>
			)};
}				