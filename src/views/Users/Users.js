import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUserFields, removeUser, updateUserField } from '../../actions';
import Window from '../../components/Window';
import Table from '../../components/Table';





class User extends Component {

    constructor(props) {
        super(props);

        this.state = {users: []}
        this.remove = this.remove.bind(this);
        this.updateField = this.updateField.bind(this);
        
    }

    componentDidMount() {
        
        this.props.fetchUserFields();
        this.props.fetchUsers();
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.users){
            if(nextProps.users.users)
            {
                let users = _.mapKeys(nextProps.users.users, '_id')
                this.setState({users: users});
                //this.setState({users: nextProps.users.users});
            }
        }
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

    updateField(id, field, value){
        console.log("id: ", id, " --- field: ", field, " --- value: ", value );
        this.props.updateUserField(id, field, value);
    }

    remove(ids) {
        this.props.removeUser(ids)
        
        let users = this.state.users;
        if( ids.length == 1){
            //let users = this.state.users;
            users = _.omit(users, ids[0]);
             
        }
        else{
            ids.map(id => {
                users = _.omit(users, id);
            })
            
        }


        this.setState({users:users});
    }

    renderUsers() {

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

              //this.setState({users: this.props.users.users})
            return <Table data={this.state.users} columns={this.props.usersFields} name="Usuário" create resource="user" remove={this.remove} updateField={this.updateField} />
            //return <BootstrapTable keyField='id' data={ this.props.users } columns={ columns } />
        }
        return <div>Carregando Usuários ...</div>;
    }

 
    render() {
        let errors = '';
        let msg_success = '';

        if(this.props.match.params.message_success)
            msg_success = this.props.match.params.message_success;
        if(this.props.match.params.message_errors)
            errors = this.props.match.params.message_errors;

        if(this.props.users && this.props.users.data)
        {
            console.log('vai alterar o estado do setState', this.props.users)
            if(this.props.users.data.action){
                //msg_success = this.props.users.data.return[0].message
                console.log("antes do return map")        
                const msg = this.props.users.data.return.map(message => {
                    console.log("dentro do console.map lllllll");
                    return <li key={message.id}>{message.message}</li>
                })

                msg_success =<ul>{msg}</ul>;
                //msg_success = ["meu teste 123", "caramba esse é legal"];
            }
         
        }
    
        //console.log("aui no render do user: ", this.props.match.params);


        return (
            <Window name="Lista de Usuários" element={this.renderUsers()} icon="user" subtitle="Grid" msgError={errors} msgSuccess={msg_success} />
        );
    }
    
}

function mapStateToProps(state){
    return {
        users: state.users,
        usersFields: state.usersFields
    }
}

export default connect(mapStateToProps, { fetchUsers, fetchUserFields, removeUser, updateUserField })(User);