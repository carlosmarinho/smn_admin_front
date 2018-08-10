import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUserFields } from '../actions';
import { Panel } from 'react-bootstrap';
import Window from './Window';
import Table from './Table';




class User extends Component {

    constructor(props) {
        super(props);

        this.state = {users: ''}
    }

    componentDidMount() {
        this.props.fetchUserFields()
        this.props.fetchUsers()
    }

    createColumns(fields) {
        return _.map(fields, (field, key) => {
            let column = {
                dataField: key,
                text: _.capitalize(key).replace('_'," "),
                isKey: key=='_id'? true: false,
                hidden: key=='_id' || key=='__v'? true: false,
            }
            
            return column
        })

        
    }

    renderUsers() {
        console.log("prooooooopppppppppppppppppppppsssssssssss: ", this.props)
        if(this.props.users){

            const columns = [{
                dataField: '_id',
                text: 'ID',
                isKey: true,
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

            let columns1 = this.createColumns(this.props.usersFields);
            
            const selectRow = {
                mode: 'checkbox',
                clickToSelect: true
              };

            return <Table data={this.props.users} columns={columns1} name="Usuário" create resource="user" />
            //return <BootstrapTable keyField='id' data={ this.props.users } columns={ columns } />
        }
        return <div>Carregando Usuários ...</div>;
    }

 
    render() {
        let errors = '';
        let msg_success = '';

        return (
     
            <Window name="Lista de Usuários" element={this.renderUsers()} msgError={errors} msgSuccess={msg_success} />
        );
    }
    
}

function mapStateToProps(state){
    return {
        users: state.users,
        usersFields: state.usersFields
    }
}

export default connect(mapStateToProps, { fetchUsers, fetchUserFields })(User);