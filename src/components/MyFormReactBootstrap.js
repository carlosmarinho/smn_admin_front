import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser } from '../actions';


//import { Link } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

class MyForm extends Component{

    constructor(props, context) {
        super(props, context);
    
   
        this.state = {
          value: ''
        };
    }


    renderField(field) {
        return (
            <div>
                <ControlLabel>{field.label}</ControlLabel>
                <input
                    type="text"
                    {...field.input}
                    className="form-control"
                    placeholder={`Informe o ${field.label}`}
                />
            </div>
        )
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error'; 
        return null;
    }

    /*handleChange(e) {
    this.setState({ value: e.target.value });
    }*/
    

    onSubmit(values) {
        // this === component (thats the reason we used .bind(this)
        // on onSubmit, because different context of variable)
        //console.log(values);
        //let ret = this.props.createUser(values, () => this.props.history.push('/'));
        console.log("chamou o create: ", this.props.createUser(values));
        if(this.props.users){
            console.log("Users: ", this.props.users);
        }
    }

    
    render() {

        let msg_type = null;
        if( this.props.errors){
            msg_type = 'error';
        }

        if( this.props.fields){
            console.log(this.props.fields)
        }

        const { handleSubmit } = this.props;

        return(
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <FormGroup
                    controlId="formBasicText"
                    validationState={msg_type}
                    >
                    
                    <Field 
                            label="Username"
                            name="username"
                            component={this.renderField}/>
                    <FormControl.Feedback />
                    <HelpBlock>{(this.props.errors && this.props.errors.username)? this.props.errors.username.message: ''}</HelpBlock>
                    First_name<HelpBlock>{this.props.errors ? this.props.errors.first_name.message: ''}</HelpBlock>
                    
                    </FormGroup>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
        )
    }
}


function validate(values) {
    //console.log(values) -> {title: 'asdf', categories: '', content: ''}

    const errors = {};

    //validate the inputs from 'values'
    if (!values.title || values.title.length < 3) {
        errors.title = 'Enter a title that is at least 3 character!';
    }

    if (!values.categories) {
        errors.categories = "Enter some categories!";
    }

    if (!values.content) {
        errors.content = "Enter some content!";
    }

    //If errors is empty, the form is fine to submit
    //If errors has *any* properties, redux form assumes form is invalid
    return errors
}

export default reduxForm({
    validate,
    //this form property here you can really 
    //think of as being the name of the form
    form: 'UserNewForm' //this string has to be a unique form
})(
    connect(null, { createUser })(MyForm)
);

