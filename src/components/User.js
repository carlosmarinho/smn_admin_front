import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Panel } from 'react-bootstrap';
import Table from './Table';



class User extends Component {

    constructor(props) {
        super(props);

        this.state = {users: ''}
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    renderUsers() {
        if(this.props.users){
            const columns = [{
                dataField: '_id',
                text: 'ID',
                isKey: true
              }, {
                  dataField: 'username',
                  text: 'Usuário',
                  sort: true
              }, {
                dataField: 'first_name',
                text: 'Nome'
              }, {
                  dataField: 'last_name',
                  text: 'Sobrenome'
              }
            ];

            return <Table data={this.props.users} columns={columns} name="Usuário" create resource="user"></Table>
            //return <BootstrapTable keyField='id' data={ this.props.users } columns={ columns } />
        }
        return <div>Carregando Usuários ...</div>;
    }

 
    render() {
        return (
            <Panel bsStyle="default" className="mx-auto">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Lista de Usuários</Panel.Title>
                </Panel.Heading>
                <Panel.Body className="">

                    {this.renderUsers()}
                </Panel.Body>
            </Panel>
        );
    }
    
}

function mapStateToProps(state){
    return {users: state.users}
}

export default connect(mapStateToProps, { fetchUsers })(User);