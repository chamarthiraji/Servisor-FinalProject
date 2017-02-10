import React, { Component } from 'react';
import { Modal,Button,ButtonToolbar } from 'react-bootstrap';
import ModalForm from './ModalForm';

export default class EmailModal extends Component {
	constructor(props){
		super(props);
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
	         Send Message 
	        </Button>

	        <Modal show={this.state.showModal} onHide={this.close}>
	          <Modal.Header closeButton>
	            <Modal.Title>Modal heading</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
	          	<ModalForm  email={this.props.providerEmail}/> 
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