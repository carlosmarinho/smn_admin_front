import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';  

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
            selectedRows: [],
            redirect: false
        }

        
        this.onRowSelect = this.onRowSelect.bind(this)
        //this.redirectTo = this.redirectTo.bind(this)
        //this.showEditButton = this.showEditButton.bind(this)
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
        if(selected.length === 1)
            this.setState({redirect: true});
    }

    urlEdit(){
        return this.props.resource + "/edit/" + selected[0];
    }

    showEditButton() {
            return(
                <Button bsStyle="warning" onClick={this.handleOnClick} >Editar {this.props.name}</Button>
            )
    }

    removeItem() {
        console.log("vai excluir o item")
    }

    showRemoveButton() {
        if(this.props.create)
            return <Button bsStyle="danger" onClick={this.removeItem}>Excluir {this.props.name}</Button>
    }

    onRowSelect(row, isSelected){
        /* let rowStr = "";
        
        for(var prop in row){
          rowStr+=prop+": '"+row[prop]+"' ";
        } */
        //let selected = {}
        if(isSelected){
            //selected = this.state.selectedRows;
            console.log("beforeeeeee: ", selected)
            selected.push(row['_id'])
            console.log("affterrr: ", selected)
        }
        else{
            //selected = this.state.selectedRows;
            console.log("unselect beforeeeeee: ", selected)
            selected = selected.filter(item => item !== row['_id'])
            console.log("unselect affterrr: ", selected)
        }
        //        this.setState({selectedRows})

        
        //alert("is selected: " + isSelected + ", " + rowStr);
    }
      
    onSelectAll(isSelected, currentDisplayAndSelectedData){
        alert("is select all: " + isSelected);
        alert("Current display and selected data: ");
        for(let i=0;i<currentDisplayAndSelectedData.length;i++){
            alert(currentDisplayAndSelectedData[i]);
        }
    }

    showTable() {
        
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            style: { background: '#ccccff' },
            onSelect: this.onRowSelect
        };


        if(this.state.columns) { 
            //console.log("data na tabela: ", this.props.data)
            return <BootstrapTable 
                keyField={ this.props.keyField? this.props.keyField: '_id'} 
                data={ this.props.data } 
                columns={ this.state.columns } 
                pagination={ pagination }
                filter={ filterFactory() }
                selectRow={ selectRow }
            /> 

        }
        else {
            return <div>Carregando Tabela</div>
        }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect push to={this.urlEdit()} />;
        }

        return (
            <div>
                
                {this.showTable()}
                {this.showCreateButton()}
                {this.showEditButton()}
                {this.showRemoveButton()}
            </div>
        )
    }
}

export default Table;