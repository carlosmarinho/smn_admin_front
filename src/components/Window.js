import _ from 'lodash'; 
import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Alert } from 'react-bootstrap'

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
    }

    getIconName(){
        if(this.props.icon && this.props.icon != ''){
            return `fa fa-${this.props.icon}`;
        }
        else
            return "fa fa-align-justify";
    }

    render(){
        return (
            <div className="animated fadeIn">
                <Row>
                <Col xl={12}>
                    <Card>
                    <CardHeader>
                        <i className={this.getIconName()}></i> {this.props.name} <small className="text-muted">{this.props.subtitle}</small>
                    </CardHeader>
                    <CardBody>
                        {this.msgError()}
                        {this.msgSuccess()}
                        {this.props.element}
                    </CardBody>
                    </Card>
                </Col>
                </Row>
            
            </div>
        );
    }
}

export default Window;