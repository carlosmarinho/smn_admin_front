import _ from 'lodash'; 
import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserFields, editUser, fetchUser } from '../../actions';

import Window from '../../components/Window';
import MyForm from '../../components/MyForm';

class UserEdit extends Component{

    constructor(props, context) {
        super(props, context);
    
        //this.handleChange = this.handleChange.bind(this);
    
        this.state = {usersFields: ''}

        //this.submit = this.submit.bind(this);
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

        console.log('values do submit: ', values );
        console.log("meus props: ", this.props);

        //Workaround para caso o usuario não digite nenhuma imagem ele não pegue os valores das imagens padrões
        _.map(this.props.usersFields, field => {
            if(field.options.image){
                if(values[field.path] === this.props.users[field.path])
                    delete values[field.path];
            }
        })
        
        console.log('values depois do submit: ', values );

        this.props.editUser(this.props.match.params.id, values, (msg) => this.props.history.push(`/user/${msg}`))
    }

    
    getForm(errors, fields, object) {
        _.merge(object, {resource: 'user'});
        

        return (<MyForm errors={errors} fields={fields} object={object} onSubmit={this.submit.bind(this)} resource="user" type="edit" />)
    }

    render() {
        let errors = null;
        let msg_success = null;
        let user = null;
        let fields = null;
        if(this.props.users && this.props.users.message){
            msg_success = this.props.users.message;
        }

        if(this.props.users && this.props.users.error){
            errors = this.props.users.error
        }

        if(this.props.users) {
            if(this.props.users.obj){
                user = this.props.users.obj
            }
            else{
                user = this.props.users
            }
        }


        let element = null;
        if(this.props.usersFields )
        {        
            fields = this.props.usersFields;
            delete fields['_id'];
            delete fields['__v'];
        }
        
        element = this.getForm(errors, fields, user)

        return(
            <div>
            <Window name="Edição de usuário"  icon="user" element={element} msgError={errors} msgSuccess={msg_success} />
            
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
