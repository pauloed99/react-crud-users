import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

interface ModalProps {
    isLoading: boolean,
    error: boolean,
    errorMessage: String,
    successMessage: String,
    modalVisibility: boolean,
    showModal: () => void,
    closeModal: () => void,
}

const StatusModalComponent: React.FC<ModalProps> = (props) => {

  return (
    <Modal show={props.modalVisibility} onHide={props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Status da Criação do Usuário</Modal.Title>
          </Modal.Header>
          {
          props.isLoading ? 
            <Modal.Body>
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Modal.Body> : 
          props.error ?
          <Modal.Body>
            <p>{props.errorMessage}</p>
          </Modal.Body> :
          <Modal.Body>
            <p>{props.successMessage}</p>
          </Modal.Body> 
          }
        </Modal>
  );
}

export default StatusModalComponent;