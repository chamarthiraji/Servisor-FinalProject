import React, { Component } from 'react';
import { FormGroup, Button, ControlLabel, FormControl,Collapse,Well } from 'react-bootstrap';
import axios from 'axios';

var tempDbReviews = [];
export default class ReviewForm extends Component {
	constructor(props){
		super(props);
		
		console.log("ReviewForm prpos",props);
		this.state = {
			review:[],
			userid:'',
      		userReview : ""
			
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    	this.getReviewsData = this.getReviewsData.bind(this);
    	tempDbReviews = props.data.reviews;
	}

	componentDidMount() {
	//  console.log("comments js 2 - componentDidUpdate");
		if (this.props.data._id) {
		  this.getReviewsData();
		}

	} // end of - componentDidMount

	getReviewsData() {
		axios.get('/api/getReviews/' + this.props.data._id).then(
		  posts => {
		    console.log("getReviewsData js - posts:"+
		     JSON.stringify(posts));
		 
		    tempDbReviews = posts.data[0].reviews;

		    var newState = this.state;
			newState["review"]=tempDbReviews;
			newState["userReview"] = "";
			this.setState(newState);
			console.log(' getReviewsData state', newState);

		  });
	} // end of - getReviewsData

	onChange(e){
		//this.setState({ [e.target.name]:e.target.value});
		
		e.preventDefault();
		var newState = this.state;
	    newState[e.target.name] = e.target.value;
	    this.setState(newState);

	}
	
	onSubmit(e){
		e.preventDefault();
		
		const newState = this.state;
		newState["userid"] = this.props.data._id;
		newState["userReview"] = this.state.userReview;
		console.log("newState submit ",newState);
		
		axios.post('api/reviews',newState)
		.then((response) => {
			console.log("reviews response",response);
			this.setState({ review: response.data.reviews});
			console.log("this.state",this.state);


		})
		.catch((error) => {
			console.log(error);
		})	

		if (this.props.data._id) {
			this.getReviewsData();
		}

	}	

	render() {
		return (
			<div>

				{
					tempDbReviews.map((data, index) => (
	        			<p>{data}</p>
	    			))
				}

				<Button onClick={ 
					()=> this.setState({ open: !this.state.open })}
				>
	          		Submit Review
	        	</Button>
	        	<Collapse in={this.state.open}>
	          		<div>
	            		<Well>
							<form onSubmit={this.onSubmit}>
								
								<div className="form-group">
									<label className="control-label">Review</label>
									<input
										type="text"
										name="userReview"
										value={this.state.userReview}
										onChange={this.onChange}
										className="form-control"
									/>
								</div>
						
								<div className="form-group">
										<button className="btn btn-primary btn-md" onClick={this.showAlert}>
											Submit
										</button>
								</div>
							</form>
						</Well>
	          		</div>
	        	</Collapse>
	      	</div>
    			
			    
		);
	}	
}		