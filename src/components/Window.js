import React, { Component } from 'react';
import { Panel, Alert } from 'react-bootstrap'

class Window extends Component{

    submit(values) {
        console.log("testa essa porcaria")
    }

    msgError(){
        if(this.props.msgError){
            return(
                <Alert bsStyle="danger">{this.props.msgError}</Alert>
            )
        }
    }

    msgSuccess(){
        if(this.props.msgSuccess){
            return(
                <Alert>{this.props.msgSuccess}</Alert>
            )
        }
    }

    remove(id){
        alert('testnnnnnn')
    }

    render(){
        return (
            <Panel bsStyle="default" className="mx-auto">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">{this.props.name}</Panel.Title>
                </Panel.Heading>
                <Panel.Body className="">
                    {this.msgError()}
                    {this.msgSuccess()}
                    {this.props.element}
                </Panel.Body>
            </Panel>
        );
    }
}

export default Window;