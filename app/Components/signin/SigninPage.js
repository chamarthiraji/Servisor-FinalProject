import React,{Component} from 'react'
import SigninForm from './SigninForm'

export default class SigninPage extends Component {
	constructor(props){
		super(props);
		console.log("SigninPage props:"+JSON.stringify(props));

	}

	render() {
		return(
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<SigninForm  {...this.props}/>
				</div>
			</div>
		);
	}
}				