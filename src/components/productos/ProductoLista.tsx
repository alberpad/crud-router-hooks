import React from "react";
import axios from "axios";
import { IProducto } from "../../data/types";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export interface IProductoListaProps extends RouteComponentProps {
  producto: IProducto;
  resetProductos: (reset: boolean) => void;
}

const ProductoLista = (props: IProductoListaProps) => {
  const borrarProducto = async (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No se puede deshacer la acción",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Eliminar!",
      cancelButtonText: "No Eliminar"
    }).then(async result => {
      if (result.value) {
        try {
          const response = await axios.delete(
            `http://localhost:4000/restaurant/${id}`
          );
          if (response.status === 200) {
            Swal.fire(
              "¡Eliminado!",
              "El producto ha sido eleminado.",
              "success"
            );
            props.resetProductos(true);
            props.history.push("/productos");
          } else {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: "Algo ha fallado!",
              footer: "No se ha podido eliminar"
            });
            props.history.push("/productos");
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Algo ha fallado!",
            footer: "No se ha podido eliminar"
          });
          props.history.push("/productos");
        }
      }
    });
  };

  const { producto } = props;
  return (
    <React.Fragment>
      <tr>
        <td className="align-middle">{producto.id}</td>
        <td className="align-middle">{producto.nombrePlatillo}</td>
        <td className="align-middle">{producto.categoria}</td>
        <td className="text-right align-middle">{producto.precioPlatillo}</td>
        <td className="text-right">
          <Link to={`/editar-producto/${producto.id}`}>
            <Button variant="link">
              <i className="material-icons">edit</i>
            </Button>
          </Link>
          <Button variant="link" onClick={() => borrarProducto(producto.id)}>
            <i className="material-icons">delete</i>
          </Button>
        </td>
      </tr>
    </React.Fragment>
    // <li className="list-group-item d-flex justify-content-between align-items-center">
    //   <p></p>
    // </li>
  );
};

export default withRouter(ProductoLista);
