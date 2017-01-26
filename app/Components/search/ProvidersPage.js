import React,{Component} from 'react'
import axios from 'axios'

export default class ProvidersPage extends Component {

	constructor(){
			super();
			this.state = {
			providers: []
		}
		
	}

	componentDidMount() {
		console.log("inside componentDidMount");

		
		axios.get('/api/' + this.state.serviceName).then(
			providers => {
				console.log("providers data",providers.data); 


				this.setState({ providers: providers.data });
			});
	} 

	render() {
		return(
			<div className="jumbotron">
				<ul>
				{this.state.providers.map(function(provider){
					return (
						<div key={provider.id} className="provider">
							{provider.serviceName}
						</div>
						)
				}
				)}

				 
				</ul>
    		</div>
			);
	}

}	