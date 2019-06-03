import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

export interface IFooterProps {}

const Footer = (props: IFooterProps) => {
  return (
    <React.Fragment>
      <Jumbotron className="mt-5">
        <h3>CRUD React App</h3>
        <h5>Aplicación CRUD con React, React-Router, Json-Server</h5>
        <p>Todos los derechos reservados</p>
      </Jumbotron>
    </React.Fragment>
  );
};

export default Footer;
