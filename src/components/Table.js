import _ from 'lodash'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import React, { Component } from 'react';
import { Button, ButtonToolbar  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, multiSelectFilter, numberFilter, dateFilter }  from 'react-bootstrap-table2-filter';  
import { AppSwitch } from '@coreui/react'
import MyModal from './MyModal'

const pagination = paginationFactory({
    sizePerPageList: [ {
        text: '10', value: 10
      }, {
        text: '50', value: 50
      }, {
        text: '100', value: 100
      }, {
        text: '500', value: 500
      }
    ]
})

var selected = []
//const products = [ {id:1, name: 'carlos'} ];


class Table extends Component {

    constructor(props){
        super(props);

        this.state = {
            columns: this.props.columns,
            selectedRow: [],
            redirect: false,
            lgShow: false
        }

        
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        //this.redirectTo = this.redirectTo.bind(this)
        //this.showEditButton = this.showEditButton.bind(this)
        this.removeItem=this.removeItem.bind(this);
        this.showImage=this.showImage.bind(this);
        this.showBoolean=this.showBoolean.bind(this);

        this.handleBooleanChecked=this.handleBooleanChecked.bind(this);
        //this.createColumns=this.createColumns.bind(this);
    }

    componentDidMount(){
        if(this.props.columns){
            //console.log("minhas colunas: ", this.props.columns);
        }
        else{
            this.setState({columns: [{
                dataField: 'id',
                text: 'ID',
                isKey: true
              }]});
        }
    }

    showCreateButton() {
        if(this.props.create)
            return <Link to={`/${this.props.resource}/new`}><Button bsStyle="primary">Criar {this.props.name}</Button></Link>
    }

    handleOnClick = () => {
        // some action...
        // then redirect
        console.log("tamanho do estado: ", selected.length )
        if(selected.length === 1) {
            this.setState({redirect: true});
        }
    }

    urlEdit(){
        console.log("url a ser editada: ", this.props.resource + "/edit/" + selected[0])
        let url = this.props.resource + "/edit/" + selected[0];
        selected = [];
        return url;
    }

    showEditButton() {
            return(
                <Button bsStyle="warning" onClick={this.handleOnClick} >Editar {this.props.name}</Button>
            )
    }

    removeItem() {
        this.setState({ lgShow: true })
        this.props.remove(selected);
        selected = [];
    }

    showRemoveButton() {
        
        if(this.props.create)
            return <Button bsStyle="danger" /*onClick={this.removeItem}*/ onClick={this.removeItem} >Excluir {this.props.name}</Button>
    }

    selectRowByDoubleClick(e, row, rowIndex) {
        selected = []
        this.setState({selectedRow: [row._id]});
        this.onRowSelect(row, true);
    }

    onRowSelect(row, isSelected) {
        console.log("vamos ver como está o estado do selectedRow: ", this.state.selectedRow)
        if(isSelected){
            //selected = this.state.selectedRows;
            console.log("beforeeeeee: ", row)
            selected.push(row['_id'])
            //console.log("affterrr: ", selected)
        }
        else{
            //selected = this.state.selectedRows;
            selected = selected.filter(item => item !== row['_id'])
        }

    }
      
    onSelectAll(isSelected, currentDisplayAndSelectedData){
        console.log("Current display and selected data: ", currentDisplayAndSelectedData.length);
        if(isSelected){
            for(let i=0;i<currentDisplayAndSelectedData.length;i++){
                this.onRowSelect(currentDisplayAndSelectedData[i], isSelected);
            }
        }
        else{
            selected = [];
        }
        //console.log("selected: ", selected);
    }

    showData() {
        return _.values(this.props.data);
    }
    
    showImage(cell, row, rowIndex) {
        if(cell) 
        {
            return (
                <div className="imgPreviewTable">
                    <Link to={`/${this.props.resource}/edit/${row._id}`}><img src={`http://localhost:3001/image/path/${encodeURIComponent(JSON.parse(cell).path)}`}  /></Link>
                </div>
            ) 
        }
        //return "text"

    }

    showBoolean(cell, row, rowIndex, formatExtraData) {
        return (
            <div className="booleanTable"><AppSwitch onChange={this.handleBooleanChecked} name={`${formatExtraData.path}#${row._id}`} className={'mx-1'} variant={'pill'} color={'success'} checked={cell? true: false} /></div>
        )
        //return "text"

    }

    handleBooleanChecked(field) {
        let selectedRow = selected
        console.log(`O valor deveria do campo `, field.target.name, ' --- ', field.target.name)
        let fieldvalue = field.target.name.split('#')
        this.props.updateField(fieldvalue[1], fieldvalue[0], field.target.checked);

        //Vou zerar o status do selected pois eu mudo o state da tabela
        this.setState({selectedRow: selected})
        
        return false;
    }
    

    getFilter(field) {

        let filter = field.filter

        switch(filter) {
            case undefined:
                if(field.instance == 'String'){
                    console.log("field no filter: ", field)
                    if(field.enumValues.length > 1)
                    {
                        let obj = {}
                        field.enumValues.map(value => {
                            obj[value] = value;
                        })
                        console.log("o objeto aqui: ", obj)
                        return selectFilter({options: obj});
                    }
                    else
                        return textFilter();
                }
                else if( field.instance == 'Number' )
                    return numberFilter();
                else if( field.instance == 'Date' )
                    return dateFilter();
                else if( field.instance == 'Boolean' ){
                    if(field.path == 'status'){
                        return selectFilter({options: {false: 'Inativo', true: 'Ativo'}});
                    }
                    else {
                        return selectFilter({options: {false: 'false', true: 'true'}});
                    }
                }
                else
                    return textFilter();
                break;
            case false:
                break;
            case 'text':
                return textFilter();
                break;
            case 'select':
                return selectFilter();
                break;
            case 'multi':
                return multiSelectFilter();
                break;
            case 'number':
                return numberFilter();
                break;
            case 'date':
                return dateFilter();
                break;
            default:
                return textFilter();

        }
        
    }

    formatColumn(field) {
        if(field.options.image)
            return this.showImage;
        if(field.instance == 'Boolean')
            return this.showBoolean;
    }

    createColumns() {
        let fields = this.state.columns;

        return _.map(fields, (field, key) => {
            let column = {
                dataField: key,
                text: _.capitalize(key).replace('_'," "),
                isKey: key=='_id'? true: false,
                hidden: key=='_id' || key=='__v' || field.options.inputForm == 'quill' || field.options.inputForm == 'password' ? true: false,
                filter: this.getFilter(field),
                formatter: this.formatColumn(field),
                formatExtraData: field
            }
            //console.log("collumn: ", column);
            return column
        })

        
    }

    showTable() {
        
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: false,
            style: { background: '#ccccff' },
            onSelect: this.onRowSelect,
            onSelectAll:this.onSelectAll,
            selected: this.state.selectedRow
        };

        const rowEvents = {
            onDoubleClick: (e, row, rowIndex) => {this.selectRowByDoubleClick(e, row, rowIndex)}
        }


        if(this.state.columns) { 
            //console.log("data na tabela: ", this.props.data)
            return <BootstrapTable 
                keyField={ this.props.keyField? this.props.keyField: '_id'} 
                data={ this.showData() } 
                columns={ this.createColumns() } 
                pagination={ pagination }
                filter={ filterFactory() }
                selectRow={ selectRow }
                rowEvents={ rowEvents }
            /> 

        }
        else {
            return <div>Carregando Tabela</div>
        }
    }

    showModal() {
        let lgClose = () => this.setState({ lgShow: false });
        let title = `Exclusão de ${this.props.name}`;
        let subtitle = `Tem certeza que deseja excluir o(a) ${this.props.name}`;
        /*return (
            <MyModal show={this.state.lgShow} onHide={lgClose} title={title} subtitle={subtitle} />
        );*/
    }

    render() {

        if (this.state.redirect) {
            return <Redirect push to={this.urlEdit()} />;
        }

        return (
            <div>
                {this.showModal()}
                {this.showTable()}
                <ButtonToolbar>
                    {this.showCreateButton()}
                    {this.showEditButton()}
                    {this.showRemoveButton()}
                </ButtonToolbar>
            </div>
        )
    }
}

export default Table;