import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';
import { logoutFirebase } from '../firebase/AuthServices';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase/config';


const Header = () => {
    const [email, setEmail] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setEmail(user.email);
            } else {
                setEmail(null);
            }
        })
    }, []);


    const logout = async () => {
        await logoutFirebase();
        navigate('/Login');
        setIsOpen(false);
        setEmail(null);
    }

    return (

        <div>
            <Navbar color="dark" dark>
                <NavbarBrand href="/" className="me-auto">Login-app</NavbarBrand>
                <NavbarToggler onClick={toggle} className="me-2" />
                <Collapse isOpen={isOpen} navbar>

                    <Nav className="me-auto" navbar>
                        <NavbarText style={{ color: 'aquamarine', textAlign: 'center' }}>Bienvenido {email}</NavbarText>
                        <NavItem active={false}>
                            <NavLink href="/Login" style={{ display: email !== null ? "none" : "block" }}>Login</NavLink>
                            <NavLink href="/Register" style={{ display: email !== null ? "none" : "block" }}>Register</NavLink>
                            <NavLink href="/Crud" style={{ display: email === null ? "none" : "block" }}>Formulario</NavLink>
                            <NavLink onClick={() => logout()} style={{ display: email === null ? "none" : "block", color: "indianred" }}>Salir</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>

            </Navbar>
        </div>
    );
};


export default Header;