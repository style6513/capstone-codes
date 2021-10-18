import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const NavbarComponent = ({ logout }) => {
    const history = useHistory();
    const handleClick = () => {
        logout();
        history.push("/auth/login")
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/codes">App Market</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link to="#">Mypage</Nav.Link>
                    <Nav.Link to="#">Market</Nav.Link>
                    <Nav.Link to="#">Community</Nav.Link>


                    <Nav.Link to="#">Login</Nav.Link>
                    <Nav.Link to="#">Register</Nav.Link>

                </Nav>
            </Container>
        </Navbar>
    )
};

export default NavbarComponent;
