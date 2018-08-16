import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserFields, editUser, fetchUser } from '../actions';

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
        this.props.fetchUser(this.props.match.params.id)
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error'; 
        return null;
    }
   

        
    submit(values) {
        this.props.editUser(this.props.match.params.id, values, (msg) => this.props.history.push(`/user/${msg}`))
    }

    
    getForm(errors, fields, object) {
        return (<MyForm errors={errors} fields={fields} object={object} onSubmit={this.submit.bind(this)} resource="user" />)
    }

    render() {
        let errors = null;
        let msg_success = null;
        if(this.props.users){
            console.log("propppppppppppssssss.userrrr: ", this.props.users)
            console.log("userrrr: ", this.props.users)
            msg_success = this.props.users.message;
        }

        if(this.props.users && this.props.users.error){
            errors = this.props.users.error
        }

        let element = null;
        if(this.props.usersFields && this.props.users)
        {
            let user = this.props.users
            

            if(this.props.users.message)
                user = this.props.users.obj
            
                

            let fields = this.props.usersFields;
            delete fields['_id'];
            delete fields['__v'];
            element = this.getForm(errors, fields, user)
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
        users: state.users,
        usersFields: state.usersFields
    }
}

//export default connect(mapStateToProps, { createUser, fetchUserFields })(UserNew)
export default connect(mapStateToProps, { fetchUserFields, fetchUser, editUser })(UserEdit)
