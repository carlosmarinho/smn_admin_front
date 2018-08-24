import _ from 'lodash'
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar  } from 'react-bootstrap';


class MyForm extends Component{

    constructor(props, context) {
        super(props, context);
    
        this.renderField = this.renderField.bind(this);
    }

    renderField(field) {
        const { input, type, meta: { touched, error, warning } } = field
        if(field.isImage){
            delete input.value
        }
        //const { meta: { touched, error } } = field;
        let classFeedback = '';
        let className = '';


        if(this.props.errors){
            this.props.errors.map(erro => {
                if(erro[field.input.name]) {
                    field.meta.error = erro[field.input.name];
                    classFeedback = `glyphicon glyphicon-remove form-control-feedback`
                    className = `form-group has-error`;
                    console.log("erro no map: ", erro[field.input.name], " --- ", field.name);
                }
            } )
        }

        if(touched && className == '') {
            //console.log("foi touched: ", field);
            //className = `form-group ${ error ? 'has-error' : 'has-success'} has-feedback`;
            //classFeedback = `glyphicon ${ error ? 'glyphicon-remove' : 'glyphicon-ok'} form-control-feedback`
            if(field.required) {
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
                    type={type}
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

    loadFields(fields, object) {
        
        
        return _.map(fields, (field, key) => {
            let type = "text";
            let name = key;
            if(field.options.image) {
                name = key + '_img'
                type = "file";
            }
            
            return (
                <Field
                    type={type}
                    key={key}
                    label={_.capitalize(key).replace('_'," ")}
                    name={name}
                    component={this.renderField}
                    required={field.isRequired}
                    isImage={field.options.image}
                />     
            )
        })
    }
    
    

    render() {

        let fields = {};
        if( this.props.fields){
            fields = this.props.fields;
        }
        

        const { handleSubmit } = this.props;

        return(
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                    <Field
                        type="text"
                        key={this.props.resource}
                        name="resource"
                        component={this.renderField}
              
              
                    />  


                    {this.loadFields(fields, this.props.object)}
                    <ButtonToolbar>
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                        <Link to={`/${this.props.resource}`} className="btn btn-danger" >Voltar</Link>
                    </ButtonToolbar>
                </form>
        )
    }
}

function validate(values, props) {
    
    let errors = {};
    

    //console.log("meus campinhos venham cá: ", props.fields)

    _.forEach(props.fields, (field, key) => {
        //if(field.isRequired && !values[key])
          //  errors[key] = `Informe o campo ${key}`;

       _.map(field.options, (option, key1) => {
           if(key1 == 'required') {
               errors[key] = validateRequired(key, option, values[key])
           } else if(key1 == 'min') {
                errors[key] = validateMin(key, option, values[key])
           } else if(key1 == 'max') {
                errors[key] = validateMax(key, option, values[key])
           }

        })

        //console.log("errors: ", errors);

        return errors
    }) 

    

    //errors.username = "Informe o Username"

    //If errors is empty, the form is fine to submit
    //If errors has *any* properties, redux form assumes form is invalid
    return errors
}


function validateRequired(campo, value, inputValue) {
    if((value == true || value === 'true') && (inputValue === '' || inputValue === undefined) ){
        return `O campo ${campo} é obrigatório!!!`;
    }
    else if(value !== false && (inputValue === '' || inputValue === undefined) ){
        return value
    }
    else
        return
}

function validateMin(campo, valueRequired, value) {
    //console.log('no validateMin', value )
    if(typeof(valueRequired) === 'object'){
        //console.log(valueRequired[0], " ----- ", value)
        if(value < valueRequired[0] )
            return valueRequired[1];
    }
    else {

    }
}

function validateMax(campo, valueRequired, value) {
    //console.log('no validateMax', value )
    if(typeof(valueRequired) === 'object'){
        //console.log(valueRequired[0], " ----- ", value)
        if(value > valueRequired[0] )
            return valueRequired[1];
    }
    else {

    }
}

/* export default reduxForm({
    validate,
    //this form property here you can really 
    //think of as being the name of the form
    //initialValues: {username: this.props.object.username},
    form: 'UserNewForm' //this string has to be a unique form
})(
    //Tirei o connect daqui porque vou fazer o submit no parent
    //connect(mapStateToProps, { createUser })(MyForm)
    MyForm
); */

/*Tive que usar o compose para passar a props para dentro do reduxForm*/
export default compose(
    connect((state, props) => ({
        initialValues: props.object
    })),
    reduxForm({
        validate,
        //this form property here you can really 
        //think of as being the name of the form
        //initialValues: {username: this.props.object.username},
        
        enableReinitialize: true,
        form: 'UserNewForm' //this string has to be a unique form
    })
)(MyForm);

/* export default reduxForm({
    validate,
    touchOnChange: true,
    //this form property here you can really 
    //think of as being the name of the form
    form: 'UserNewForm' //this string has to be a unique form
})(
    connect(null, { createUser })(MyForm)
); */

