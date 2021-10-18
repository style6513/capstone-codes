import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../UserContext";

const NavbarComponent = ({ logout }) => {
    const { currentUser } = React.useContext(UserContext);
    const history = useHistory();

    const loggedInNav = () => (
        <>
            <Nav.Link onClick={logout}>
                <Link to="/logout">
                    Logout
                </Link>
            </Nav.Link>
            <Nav.Link to={`/profile/${currentUser.username}`}>
                <Link to={`/profile/${currentUser.username}`}>
                    My Page
                </Link>
            </Nav.Link>
            <Nav.Link to="#">Community</Nav.Link>
        </>
    );
    const loggedOutNav = () => {
        <>
            <Nav.Link to="/login">Login</Nav.Link>
            <Nav.Link to="">Register</Nav.Link>
        </>
    }
    console.log(currentUser);
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/codes">App Market</Navbar.Brand>
                <Nav className="me-auto">
                    {currentUser ? loggedInNav() : loggedOutNav()}
                </Nav>
            </Container>
        </Navbar>
    )
};

export default NavbarComponent;
