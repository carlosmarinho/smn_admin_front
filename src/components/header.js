import React from 'react';
//import {Navbar} from 'react-materialize';
import {Navbar} from 'react-bootstrap';

import Menu from './menu';

const header = () => {
    return(
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                <a href="#brand">React-Bootstrap</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Menu />
            </Navbar.Collapse>
        </Navbar>
    );

}

export default header;