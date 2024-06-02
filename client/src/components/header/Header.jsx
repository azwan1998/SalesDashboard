import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header className="bg-primary text-white mb-4">
      <Container>
        <Navbar expand="lg" variant="dark">
          <Navbar.Brand href="#">
            <h2>Sales Dashboard</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/" className="text-white">Home</Nav.Link>
              <Nav.Link href="/sales" className="text-white">Data Penjualan</Nav.Link>
              <Nav.Link href="/kategori" className="text-white">Kategori</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
