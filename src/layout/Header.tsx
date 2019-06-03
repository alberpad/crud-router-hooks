import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

export interface IHeaderProps {}

const Header = (props: IHeaderProps) => {
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/productos">React CRUD & Routing</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="/productos">Productos</Nav.Link>
            <Nav.Link href="/nuevo-producto">+ Producto</Nav.Link> */}
            <NavLink
              to="/productos"
              className="nav-link"
              activeClassName="active"
            >
              Productos
            </NavLink>
            <NavLink
              to="/nuevo-producto"
              className="nav-link"
              activeClassName="active"
            >
              + Producto
            </NavLink>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Búsqueda"
              className="mr-sm-2"
            />
            <Button variant="outline-light">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/productos" className="navbar-brand">
            React CRUD & Routing
          </Link>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                to="/productos"
                className="nav-link"
                activeClassName="active"
              >
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/nuevo-producto"
                className="nav-link"
                activeClassName="active"
              >
                + Producto
              </NavLink>
            </li>
          </ul>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Búsqueda"
              aria-label="Buscar"
            />
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              type="submit"
            >
              Buscar
            </button>
          </form>
        </div>
      </nav> */}
    </React.Fragment>
  );
};

export default Header;
