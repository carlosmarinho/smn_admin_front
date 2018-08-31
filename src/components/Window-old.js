import _ from 'lodash'; 
import React, { Component } from 'react';
import { Panel, Alert } from 'react-bootstrap'

class Window extends Component{

    submit(values) {
        console.log("testa essa porcaria")
    }

    msgError(){
        if(this.props.msgError){
            if( this.props.msgError instanceof Array) {
                let error = this.props.msgError.map(erro => {
                    if(typeof(erro) === 'object') {
                        return <li>{_.values(erro)}</li>
                    }
                    else {
                        return <li>{erro}</li>;
                    }
                })
                console.log("error no window: ", error);
                return <Alert bsStyle="danger">{error}</Alert>
            }
            else if( this.props.msgError instanceof Object) {
                let error = null;
                if(this.props.msgError.message){
                    error = this.props.msgError.message;
                }
                else {
                     error = _.map(this.props.msgError,  (erro) => {
                        if(typeof(erro) === 'object') {
                            return <li>{_.values(erro.message)}</li>
                        }
                        else {
                            return <li>{erro}</li>;
                        }
                    })
                }
                console.log("error no window: ", error);
                return <Alert bsStyle="danger">{error}</Alert>
            }
            else {
                console.log("aqui no else mesmo")
                return(
                    <Alert bsStyle="danger">{this.props.msgError}</Alert>
                )
            }
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