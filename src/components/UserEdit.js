import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserFields, createUser, fetchUser } from '../actions';

import Window from './Window';
import MyForm from './MyForm';

class UserEdit extends Component{

    constructor(props, context) {
        super(props, context);
    
        //this.handleChange = this.handleChange.bind(this);
    
        this.state = {usersFields: ''}

    }

    componentDidMount() {
        this.props.fetchUserFields()
        this.props.fetchUser('5b6af9e3d178c01842ebf011')
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error'; 
        return null;
    }
   

    onSubmit(values) {

        console.log("chamou o create: ", this.props.createUser(values));
        if(this.props.usersFields){
            console.log("Users: ", this.props.usersFields);
        }
    }
    
    submit(values) {
        this.props.createUser(values)
    }

    getForm(errors, fields, object) {
        return (<MyForm errors={errors} fields={fields} object={object} onSubmit={this.submit.bind(this)} />)
    }

    render() {
        let errors = null;
        let msg_success = null;
        if(this.props.users){
            console.log("propppppppppppssssss.userrrr: ", this.props.users)
            console.log("userrrr: ", this.props.user)
            msg_success = this.props.users.msg_success;
        }

        if(this.props.users && this.props.users.error){
            errors = this.props.users.error
        }

        let element = null;
        if(this.props.usersFields)
        {
            console.log("users fields: ", this.props.usersFields)
            let fields = this.props.usersFields;
            delete fields['_id'];
            delete fields['__v'];
            element = this.getForm(errors, fields, this.props.users)
        }

        return(
            <div>
            <Window name="Edição de usuário" element={element} msgError={errors} msgSuccess={msg_success} />
            
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        user: state.user,
        users: state.users,
        usersFields: state.usersFields
    }
}

//export default connect(mapStateToProps, { createUser, fetchUserFields })(UserNew)
export default connect(mapStateToProps, { fetchUserFields, fetchUser, createUser })(UserEdit)
