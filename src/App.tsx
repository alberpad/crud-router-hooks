import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import {
  Productos,
  EditarProducto,
  AgregarProducto,
  Producto
} from "./components/productos";
import { Header, Footer } from "./layout";
import { IProducto } from "./data/types";

const initialStateProductos: IProducto[] = [];

const App: React.FC = () => {
  const [productos, setProductos] = useState(initialStateProductos);
  const [resetProductos, setResetProductos] = useState(true);

  useEffect(() => {
    if (resetProductos) {
      const consultarApi = async () => {
        const resultado = await axios.get("http://localhost:4000/restaurant");
        setProductos(resultado.data);
      };
      consultarApi();
      setResetProductos(false);
    }
  }, [resetProductos]);
  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route
            exact
            path="/productos"
            render={() => (
              <Productos
                productos={productos}
                resetProductos={setResetProductos}
              />
            )}
          />
          <Route
            exact
            path="/nuevo-producto"
            render={props => (
              <AgregarProducto {...props} resetProductos={setResetProductos} />
            )}
          />
          <Route exact path="/ver-producto/:id" component={Producto} />
          <Route
            exact
            path="/editar-producto/:id"
            render={props => (
              <EditarProducto {...props} resetProductos={setResetProductos} />
            )}
          />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
