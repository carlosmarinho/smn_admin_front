import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserFields } from '../actions';
import { createUser } from '../actions';

import Window from './Window';
import MyForm from './MyForm';

class UserNew extends Component{

    constructor(props, context) {
        super(props, context);
    
        //this.handleChange = this.handleChange.bind(this);
    
        this.state = {usersFields: ''}

    }

    componentDidMount() {
        this.props.fetchUserFields()
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error'; 
        return null;
    }

    /* handleChange(e) {
        this.setState({ value: e.target.value });
    } */
    

    onSubmit(values) {
        // this === component (thats the reason we used .bind(this)
        // on onSubmit, because different context of variable)
        //console.log(values);
        //let ret = this.props.createUser(values, () => this.props.history.push('/'));
        console.log("chamou o create: ", this.props.createUser(values));
        if(this.props.usersFields){
            console.log("Users: ", this.props.usersFields);
        }
    }
    
    submit(values) {
        this.props.createUser(values)
    }

    getForm(errors, fields) {
        return (<MyForm errors={errors} fields={fields} onSubmit={this.submit.bind(this)} resource="user" />)
    }

    render() {
        let errors = null;
        let msg_success = null;
        if(this.props.users){
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
            element = this.getForm(errors, fields)
        }

        return(
            <div>
            <Window name="Cadastro de novo usuário" element={element} msgError={errors} msgSuccess={msg_success} />
            
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        users: state.users,
        usersFields: state.usersFields
    }
}

//export default connect(mapStateToProps, { createUser, fetchUserFields })(UserNew)
export default connect(mapStateToProps, { fetchUserFields, createUser })(UserNew)
