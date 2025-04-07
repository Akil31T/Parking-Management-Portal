import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand href="#" className="flex items-center gap-2">
          <Car className="text-emerald-500" size={24} />
          <span className="font-bold">UseMyParking</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#" className="hover:text-emerald-500">How it works</Nav.Link>
            <Nav.Link href="#" className="hover:text-emerald-500">Top locations</Nav.Link>
            <Nav.Link href="#" className="hover:text-emerald-500">Company</Nav.Link>
            <Nav.Link href="#" className="hover:text-emerald-500">Parking solutions</Nav.Link>
            <Nav.Link href="#" className="hover:text-emerald-500">Help & Support</Nav.Link>
          </Nav>
          <div className="flex gap-3">
          <Link
              to="/login"
            >
              <Button variant="success" className="bg-emerald-500">Log in</Button>
            </Link>
           
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;