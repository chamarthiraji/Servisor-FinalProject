import React,{Component} from 'react'
import RigisterForm from './RigisterForm'

export default class RegisterPage extends Component {
	
	render() {
		return(
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<RigisterForm />
				</div>
			</div>
			);
		}
	}				