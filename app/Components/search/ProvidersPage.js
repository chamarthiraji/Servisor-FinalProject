import React,{Component} from 'react'
import axios from 'axios'

import ProvidersListPage from './ProvidersListPage'

export default class ProvidersPage extends Component {

	constructor(props){
			super(props);
			console.log("ProvidersPage props",JSON.stringify(props.params));
			this.state = {
				providers: []
			}
	}

	componentDidMount() {
		console.log("inside componentDidMount");
		console.log("serviceName:"+this.props.params.serviceName);
		
		axios.get('/api/providers/' + this.props.params.serviceName).then(
			providers => {
				console.log("providers data",providers.data);
				this.setState({ providers: providers.data });
			}
		);
	} 

	render() {
		return(
			<div className="jumbotron">
				<ul>
					{this.state.providers.map(provider =>
					  <ProvidersListPage key={provider._id} provider={provider}/>
					
					)}
				</ul>
    		</div>
		);
	}

}	