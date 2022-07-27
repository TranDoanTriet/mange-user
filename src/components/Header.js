import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { handleLogoutRedux } from '../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';

const Header = (props) => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.account)
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(handleLogoutRedux())
    }

    useEffect(() => {
        if (user && user.auth === false) {
            navigate('/')
            toast.success('Log out success')
        }
    }, [user])
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">

                        <img
                            src={logoApp}
                            width='30'
                            height='30'
                            className='d-inline-block align-top'
                            alt='React logo'
                        />
                        <span> React-practice</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth || window.location.pathname === '/') &&
                            <>
                                <Nav className="me-auto" >

                                    <NavLink to='/' className='nav-link'>Home</NavLink>
                                    <NavLink to='/users' className='nav-link'>Manage Users</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.email && <span className='nav-link'>Hello {user.email}</span>}

                                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                                        {user && user.auth === true ?
                                            <NavDropdown.Item onClick={() => handleLogOut()}>
                                                Log out
                                            </NavDropdown.Item> :
                                            <NavLink to='/login' className='dropdown-item'>Log in</NavLink>
                                        }
                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;