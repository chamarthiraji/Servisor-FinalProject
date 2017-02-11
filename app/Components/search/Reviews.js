	
import React, { Component } from 'react';
import { Modal,Button,ButtonToolbar } from 'react-bootstrap';
import ReviewForm from './ReviewForm';

export default class Reviews extends Component {
	constructor(props){
		super(props);
		console.log("Review props ",props);
		this.state = {
			showModal: false
		}

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		
	}
	 
	  close() {
	    this.setState({ showModal: false });
	  }

	  open() {
	    this.setState({ showModal: true });
	  }

	
	render() {
		return (
		<div>
	        <Button
	          bsStyle="primary"
	          bsSize="small"
	          onClick={this.open}
	        >
	         Reviews
	        </Button>

	        <Modal show={this.state.showModal} onHide={this.close}>
	          <Modal.Header closeButton>
	            <Modal.Title>Reviews</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
	          	 <ReviewForm data={this.props.data}/>
	          </Modal.Body>
	          <Modal.Footer>
	          	<ButtonToolbar>
	            	<Button bsStyle="primary" bsSize="xsmall" onClick={this.close}>Close</Button>
	            </ButtonToolbar>
	          </Modal.Footer>
	        </Modal>
        </div>
				);
	}
}			
