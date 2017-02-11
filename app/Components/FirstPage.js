import React,{Component} from 'react'
import { Link }  from 'react-router';
import SearchPage from '../components/search/SearchPage'

/* <Link  to="/providers/food" > */

export default class FirstPage extends Component {
	
	render() {
		return(
			<div >
				
				<div className="center">
				<h2 >SERVISOR</h2>

				
				
				<Link  to="/providers" >
					Browse for Providers</Link>
				</div>	
    		</div>
		);
	}
}