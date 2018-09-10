import _ from 'lodash'
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar  } from 'react-bootstrap';
import MyEditor from './MyEditor';


class MyForm extends Component{

    constructor(props, context) {
        super(props, context);

        this.state = {quill: {}}
        
    
        this.renderField = this.renderField.bind(this);
        this.imagePreview = this.imagePreview.bind(this);
        this.myCallback = this.myCallback.bind(this);
    }

    imagePreview(field, resource){
        
        if(field.isImage && field._id !== 0)
        {
            let fieldname = field.input.name.replace('_img','')
            
            if(this.props.object && this.props.object[fieldname] ){
                //console.log('url no image preview::::: ', this.props.object);
                return(
                    <div className="imgPreview">
                        <img src={`http://localhost:3001/image/${resource}/${fieldname}/${field._id}`}  />
                    </div>
                )
            }
        }
    }

    fieldText(field) {
        const { type } = field
        return (
                <input
                    className="form-control"
                    type={type}
                    required={field.required}
                    {...field.input}
                />
        )
    }

    myCallback(field, dataFromChild){
        let array = this.state.quill;
        array[field] = dataFromChild;
        this.setState({quill: array})
    }

    fieldQuill(field) {
        let initialValue = null;
        if(this.props.initialValues){
            initialValue = this.props.initialValues[field.input.name];
        }
        console.log('fielddd: ', field)
        const { type } = field
        let style = {height:'210px', marginBottom:'20px', padding: '0px'};
        return (
          <MyEditor callbackFromParent={this.myCallback} type={field.type} fieldName={field.input.name} value={initialValue}/>
        )
    }


    fieldTextArea(field) {
        const { type } = field
        return (
                <textarea
                    className="form-control"
                    
                    required={field.required}
                    {...field.input}
                />
        )
    }


    fieldSelect(field) {

        let options = field.option.map((option, key) => {
            
            if(option instanceof Object || option instanceof Array){
                return <option key={key} value={_.keys(option)}>{_.capitalize(_.values(option))}</option>
            }
            else{
                if(option)
                    return <option key={key} value={option}>{_.capitalize(option)}</option>
                else{
                    //return <option key={key} value="">Selecione {_.capitalize(field.input.name)}</option>
                    return false;
                }
            }
            
        }) 

        return (
                <select
                    className="form-control"
                    required={field.required}
                    {...field.input}
                >
                    <option key="selecione" value="">Selecione {_.capitalize(field.input.name)}</option>
                    {options}

                </select>
        )
    }

    fieldRadioOrCheck(field) {

        let radios = field.option.map((option, key) => {
            
            if(option instanceof Object || option instanceof Array){
                return (
                    <span key={key} className="mr-3">
                        <input type={field.type} {...field.input} value={_.keys(option)} checked={ String(field.meta.initial) == _.keys(option)} /> {_.capitalize(_.values(option))}
                    </span>
                )
            }
            else {
                return (
                    <span key={key} className="mr-3">
                        <input type={field.type} {...field.input} value={option} checked={ String(field.meta.initial) == option} /> {_.capitalize(option)}
                    </span>
                )
            }
            //return <option key={key} value={_.keys(option)}>{_.values(option)}</option>
        }) 
        return (
            <div className="form-control">
                    {radios}
            </div>
        )
    }
    

    fieldType(field)
    {
        if(field.type == 'text')
            return this.fieldText(field);
        else if(field.type == 'select')
            return this.fieldSelect(field);
        else if(field.type == 'radio' || field.type == 'checkbox')
            return this.fieldRadioOrCheck(field);
        else if(field.type == 'textarea')
            return this.fieldTextArea(field);
        else if(field.type == 'quill' || field.type == 'quillBig' || field.type == 'quillSmall'   )
            return this.fieldQuill(field);
        else
            return this.fieldText(field);
    }

    renderField(field) {

        const { input, type, meta: { touched, error, warning } } = field
        if(field.isImage){
            delete input.value
        }
        //const { meta: { touched, error } } = field;
        let classFeedback = '';
        let className = '';


        if(type == "hidden") {
            return(
                <input
                    className="form-control"
                    type={type}
                    required={field.required}
                    {...field.input}
                /> 
            )

        }
        else {
            if(this.props.errors){
                if(this.props.errors instanceof Array) {
                    this.props.errors.map(erro => {
                        if(erro[field.input.name]) {
                            field.meta.error = erro[field.input.name];
                            classFeedback = `glyphicon glyphicon-remove form-control-feedback`
                            className = `form-group has-error`;
                            console.log("erro no map: ", erro[field.input.name], " --- ", field.name);
                        }
                    } )
                }
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
            
            
            
            
            return (
                <div className={className}>
                    <label className="control-label">{field.label}</label>
                    {this.fieldType(field)}
                    <span className={classFeedback} aria-hidden="true"></span>
                    <span className="help-block">{field.meta.touched ? field.meta.error : ''}</span>
                    {this.imagePreview(field, this.props.resource, this.props.object)}               
                </div>
            )
               
            
        }
        
        
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

        
        _.map(this.state.quill, (value, key) => {
            console.log("key: ", key, " ==== ", value);
            values[key] = value;
        });


        this.props.submit(values);
    }

    loadFields(fields, object) {

        let id = 0;
        if(object)
            id = object._id;
        
        return _.map(fields, (field, key) => {
            let type = "text";
            let name = key;
            let options = [];
            if(field.options.image) {
                //name = key + '_img'
                type = "file";

            }
            else if(field.options.inputForm){
                type = field.options.inputForm;

                if(field.enumValues){
                    options = field.enumValues;
                }
                else if(field.instance == 'Boolean'){
                    if(field.path == 'status')
                        options = [{false: 'Inativo'}, {true: 'Ativo'}]
                    else
                        options = [{false: 'false'}, {true: 'true'}]
                }
            }
            else {
                if(field.instance == 'String' && field.enumValues.length > 1){
                    if(field.enumValues <= 2 )
                        type = 'radio';
                    else
                        type = 'select';
                    
                    options = field.enumValues;
                    
    
                    //options = this.getOptions(options);
                }
                else if(field.instance == 'Boolean'){
                    type = "radio";
                    if(field.path == 'status') {
                        options = [{false: 'Inativo'}, {true: 'Ativo'}]
                        if(this.props.type == 'create')
                            type="hidden";
                    }
                    else
                        options = [{false: 'false'}, {true: 'true'}]
    
                    //options = this.getOptions(options);
                }
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
                    _id={id}
                    option={options}
                   
                />
                 
            )
        })
    }
    
    handleChange(value) {
        this.setState({ text: value })
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
                        type="hidden"
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

