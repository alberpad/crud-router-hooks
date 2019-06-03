import React from "react";
import Table from "react-bootstrap/Table";
import { IProducto } from "../../data/types";
import ProductoLista from "./ProductoLista";

export interface IProductosProps {
  productos: IProducto[];
  resetProductos: (reset: boolean) => void;
}

const Productos: React.FC<IProductosProps> = props => {
  const { productos } = props;
  return (
    <div>
      <h1 className="text-center mb-5">Listado de Productos</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th className="text-right">Precio</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <ProductoLista
              key={producto.id}
              producto={producto}
              resetProductos={props.resetProductos}
            />
          ))}
        </tbody>
        {/* <ul className="list-group mt-5">
        {productos.map(producto => (
          <ProductoLista key={producto.id} producto={producto} />
        ))}
      </ul> */}
      </Table>
    </div>
  );
};

export default Productos;
