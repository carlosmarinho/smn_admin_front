import _ from 'lodash'
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { Link } from 'react-router-dom';

class MyForm extends Component{

    constructor(props, context) {
        super(props, context);
    
   
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        let classFeedback = '';
        let className = '';
        if(touched) {
            
            //className = `form-group ${ error ? 'has-error' : 'has-success'} has-feedback`;
            //classFeedback = `glyphicon ${ error ? 'glyphicon-remove' : 'glyphicon-ok'} form-control-feedback`
            if(field.required) {
                console.log("meu field: ", field);
                if(field.input.value){
                    className = `form-group ${ error ? 'has-error' : 'has-success'} has-feedback`;
                    classFeedback = `glyphicon ${ error ? 'glyphicon-remove' : 'glyphicon-ok'} form-control-feedback`
                }
                else{
                    className = `form-group ${ error ? 'has-error' : ''} has-feedback`;
                    classFeedback = `glyphicon ${ error ? 'glyphicon-remove' : ''} form-control-feedback`
                }
            }
            else{
                className = `form-group ${ error ? 'has-error' : 'has-success'} has-feedback`;
                classFeedback = `glyphicon ${ error ? 'glyphicon-remove' : 'glyphicon-ok'} form-control-feedback`
            }
        }
        
        //glyphicon-warning-sign
        return (
            <div className={className}>
                <label className="control-label">{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    required={field.required}
                    {...field.input}
                />
                <span className={classFeedback} aria-hidden="true"></span>
                <span className="help-block">{field.meta.touched ? field.meta.error : ''}</span>
            </div>
        )
    }


    
    onSubmit(values) {
        // this === component (thats the reason we used .bind(this)
        // on onSubmit, because different context of variable)
        //console.log(values);
        //let ret = this.props.createUser(values, () => this.props.history.push('/'));
        
        
        /*console.log("chamou o create: ", this.props.createUser(values));
        if(this.props.users){
            console.log("Users: ", this.props.users);
        }*/
        this.props.submit(values);
    }

    loadFields(fields) {
        
        return _.map(fields, (field, key) => {
            return (
                <Field
                key={key}
                label={_.capitalize(key).replace('_'," ")}
                name={key}
                component={this.renderField}
                required={field.isRequired}
                />     
            )
        })
    }
    
    render() {

        let fields = {};
        if( this.props.fields){
            console.log(this.props.fields)
            fields = this.props.fields;
        }

        const { handleSubmit } = this.props;

        return(
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    {this.loadFields(fields)}
       
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger" >Cancel</Link>
                </form>
        )
    }
}

function validate(values, props) {
    
    //console.log("chamou o validate se liga nos values: ", props.fields)

    let errors = {};
    

    //console.log("meus campinhos venham cá: ", props.fields)

    _.forEach(props.fields, (field, key) => {
        console.log("a chave: ---", values[key], "---", field.isRequired)
        if(field.isRequired && !values[key])
            errors[key] = `Informe o campo ${key}`;

        return errors
    }) 

    

    //errors.username = "Informe o Username"

    //If errors is empty, the form is fine to submit
    //If errors has *any* properties, redux form assumes form is invalid
    return errors
}

/* function mapStateToProps(state){
    console.log("stateeeeeeeeeeeee: ", state )
    return {
        usersFields: state.usersFields
    }
} */

export default reduxForm({
    validate,
    //this form property here you can really 
    //think of as being the name of the form
    form: 'UserNewForm' //this string has to be a unique form
})(
    //Tirei o connect daqui porque vou fazer o submit no parent
    //connect(mapStateToProps, { createUser })(MyForm)
    MyForm
);

/* export default reduxForm({
    validate,
    touchOnChange: true,
    //this form property here you can really 
    //think of as being the name of the form
    form: 'UserNewForm' //this string has to be a unique form
})(
    connect(null, { createUser })(MyForm)
); */

