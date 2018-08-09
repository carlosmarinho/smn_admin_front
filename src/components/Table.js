import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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


//const products = [ {id:1, name: 'carlos'} ];


class Table extends Component {

    constructor(props){
        super(props);

        this.state = {
            columns: this.props.columns
        }
    }

    componentDidMount(){
        if(this.props.columns){
            console.log("minhas colunas: ", this.props.columns);
        }
        else{
            this.setState({columns: [{
                dataField: 'id',
                text: 'ID',
                isKey: true
              }, {
                  dataField: 'name',
                  text: 'Nome',
                  sort: true
              }, {
                dataField: 'price',
                text: 'Preço'
              }]});
            console.log("não tem colunas");
        }
    }

    showCreateButton() {
        if(this.props.create)
            return <Link to={`/${this.props.resource}/new`}><Button bsStyle="primary">Criar {this.props.name}</Button></Link>
    }

    showTable() {
        
        if(this.state.columns) { 
            console.log("data na tabela: ", this.props.data)
            return <BootstrapTable 
                keyField={ this.props.keyField? this.props.keyField: '_id'} 
                data={ this.props.data } 
                columns={ this.state.columns } 
                pagination={ pagination }
                filter={ filterFactory() }
            />
        }
        else {
            return <div>Carregando Tabela</div>
        }
    }

    render() {
        return (
            <div>
                {this.showCreateButton()}
                {this.showTable()}
            </div>
        )
    }
}

export default Table;