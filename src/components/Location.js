import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations } from '../actions';
import { Panel } from 'react-bootstrap';
import Table from './Table';

const resource_name = "Localidade"
const resource_name_plural = "Localidades"

class Location extends Component {

    constructor(props) {
        super(props);

        this.state = {locations: ''}
    }

    componentDidMount() {
        this.props.fetchLocations()
    }

    renderLocations() {
        if(this.props.locations){
            const columns = [{
                dataField: 'id',
                text: 'ID',
                isKey: true
              }, {
                  dataField: 'state_id',
                  text: 'Estado',
                  sort: true
              }, {
                dataField: 'city_id',
                text: 'Cidade'
              }, {
                  dataField: 'name',
                  text: 'Bairro'
              }];

            return <Table data={this.props.locations} columns={columns} name={resource_name} create resource="location"></Table>
        }
        return <div>Carregando {resource_name_plural} ...</div>;
    }

 
    render() {
        return (
            <Panel bsStyle="default" className="mx-auto">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Lista de {resource_name_plural}</Panel.Title>
                </Panel.Heading>
                <Panel.Body className="">

                    {this.renderLocations()}
                </Panel.Body>
            </Panel>
        );
    }
    
}

function mapStateToProps(state){
    console.log("locations aqui no props: ", state.locations)
    return {locations: state.locations}
}

export default connect(mapStateToProps, { fetchLocations })(Location);