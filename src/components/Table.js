import _ from 'lodash'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import React, { Component } from 'react';
import { Button, ButtonToolbar  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';  
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
            selectedRows: [],
            redirect: false,
            lgShow: false
        }

        
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        //this.redirectTo = this.redirectTo.bind(this)
        //this.showEditButton = this.showEditButton.bind(this)
        this.removeItem=this.removeItem.bind(this);
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

    onRowSelect(row, isSelected){

        if(isSelected){
            //selected = this.state.selectedRows;
            console.log("beforeeeeee: ", selected)
            selected.push(row['_id'])
            console.log("affterrr: ", selected)
        }
        else{
            //selected = this.state.selectedRows;
            
            console.log("não está selecionado vamos ver: unselect beforeeeeee: ", selected)
            selected = selected.filter(item => item !== row['_id'])
            console.log("unselect affterrr: ", selected)
        }
        //        this.setState({selectedRows})
   
        //alert("is selected: " + isSelected + ", " + rowStr);
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
        console.log(_.values(this.props.data))
        return _.values(this.props.data);
    }
    
    showTable() {
        
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            style: { background: '#ccccff' },
            onSelect: this.onRowSelect,
            onSelectAll:this.onSelectAll
        };


        if(this.state.columns) { 
            //console.log("data na tabela: ", this.props.data)
            return <BootstrapTable 
                keyField={ this.props.keyField? this.props.keyField: '_id'} 
                data={ this.showData() } 
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