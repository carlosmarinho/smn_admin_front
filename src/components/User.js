import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUserFields, removeUser } from '../actions';
import { Panel } from 'react-bootstrap';
import Window from './Window';
import Table from './Table';




class User extends Component {

    constructor(props) {
        super(props);

        this.state = {users: []}
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        
        this.props.fetchUserFields();
        this.props.fetchUsers();
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.users){
            if(nextProps.users.users)
            {
                //let users = _.mapKeys(nextProps.users.users, '_id')
                this.setState({users: nextProps.users.users});
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

    remove(ids) {
        console.log("ids removidos: ", ids);
        if( ids.length == 1){
            let users = this.state.users.map( (e, i) => {
                if(e._id != ids[0])
                {
                    return e;
                }
               
            }) 
            this.setState({users:users});
        }

        this.props.removeUser(ids)
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
              console.log
            return <Table data={this.state.users} columns={columns1} name="Usuário" create resource="user" remove={this.remove} />
            //return <BootstrapTable keyField='id' data={ this.props.users } columns={ columns } />
        }
        return <div>Carregando Usuários ...</div>;
    }

 
    render() {
        let errors = '';
        let msg_success = '';

        if(this.props.users)
        {
            //if(this.props.users.users)
            {
            //    this.setState({users: this.props.users.users});
                console.log('vai alterar o estado do setState', this.state.users)
            }

        }
    
        //console.log("aui no render do user: ", this.props.match.params);

        if(this.props.match.params.message_success)
            msg_success = this.props.match.params.message_success;

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

export default connect(mapStateToProps, { fetchUsers, fetchUserFields, removeUser })(User);