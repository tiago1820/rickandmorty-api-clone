import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Navigation.module.css';

export const Navigation = (props) => {

    return (
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home">Brand</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="#home">Docs</Nav.Link>
                        <Nav.Link href="#features">About</Nav.Link>
                        <Nav.Link href="#pricing">Support Us</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

    )
}