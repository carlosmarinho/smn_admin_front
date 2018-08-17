import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class MyModal extends React.Component {
    render() {
        return (
            <Modal
            {...this.props}
            bsSize="large"
            aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{this.props.subtitle}</h4>
                    <p>
                    {this.props.mensagem}
                    </p>

                    {
                        //caso queira colocar varios paragrafos não só um <p> como acima
                        this.props.texto
                    }
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default MyModal