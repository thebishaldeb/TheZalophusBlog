import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import { Button, Menu, Icon } from 'antd';
import './navbar.css';

const NavbarComponent=(props)=>
{
    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        props.changeState(false);
        window.location.reload();
      }
    const login=(type)=>{
        props.history.push(`/${type}`);
    }

    return(
        <React.Fragment>
            <Navbar bg="light" expand="lg" className="shadow-sm">
                <Navbar.Brand>
                    <Link to="/" className="text-dark">
                        <i className="chess king icon iconh text-dark"></i>
                        TheZalophusBlog
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link to="/" className="text-dark">Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/new" className="text-dark">New Blog</Link>
                        </Nav.Link>
                    </Nav>
                    { props.isLoggedin===false ? <Button type="primary" onClick={()=>{ login('login') }}>Login</Button> : null }
                    { props.isLoggedin===false ? <Button type="primary" onClick={()=>{ login('signup') }}>Sign Up</Button> : null }
                    { props.isLoggedin===true ? <Button type="primary" onClick={ logout }>Logout</Button> : null }
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    )
}

export default withRouter(NavbarComponent);