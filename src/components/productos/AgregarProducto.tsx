import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { IProducto } from "../../data/types";
import { RouteComponentProps } from "react-router";
import { History } from "history";

export interface IAgregarProductoProps extends RouteComponentProps {
  resetProductos: (reset: boolean) => void;
}

const AgregarProducto = (props: IAgregarProductoProps) => {
  const [nombrePlatillo, setNombrePlatillo] = useState("");
  const [precioPlatillo, setPrecioPlatillo] = useState("");
  const [categoria, setCategoria] = useState("");

  const guardarProducto = async (e: React.FormEvent, history: History) => {
    e.preventDefault();
    const producto: Partial<IProducto> = {
      nombrePlatillo,
      precioPlatillo,
      categoria
    };
    try {
      const resultado = await axios.post(
        "http://localhost:4000/restaurant",
        producto
      );
      if (resultado.status === 201) {
        Swal.fire({
          title: "Producto Guardado Correctamente",
          text: "¿Quieres crear otro Producto?",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, crear otro!",
          cancelButtonText: "No, volver a productos"
        }).then(result => {
          if (result.value) {
            setNombrePlatillo("");
            setPrecioPlatillo("");
            setCategoria("");
          } else {
            props.resetProductos(true);
            history.push("/productos");
          }
        });
      }
    } catch (error) {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Algo falló!"
      });
    }
  };

  const estaIncompleto = (): boolean => {
    if (!nombrePlatillo || !precioPlatillo || !categoria) return true;
    else return false;
  };

  return (
    <div className="col-md-8 mx-auto ">
      <h1 className="text-center">Agregar Nuevo Producto</h1>

      <form className="mt-5" onSubmit={e => guardarProducto(e, props.history)}>
        <div className="form-group">
          <label>Nombre Platillo</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            placeholder="Nombre Platillo"
            value={nombrePlatillo}
            onChange={e => setNombrePlatillo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Precio Platillo</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            placeholder="Precio Platillo"
            value={precioPlatillo}
            onChange={e => setPrecioPlatillo(e.target.value)}
          />
        </div>

        <legend className="text-center">Categoría:</legend>
        <div className="text-center">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="categoria"
              value="postre"
              onChange={e => setCategoria(e.target.value)}
            />
            <label className="form-check-label">Postre</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="categoria"
              value="bebida"
              onChange={e => setCategoria(e.target.value)}
            />
            <label className="form-check-label">Bebida</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="categoria"
              value="cortes"
              onChange={e => setCategoria(e.target.value)}
            />
            <label className="form-check-label">Cortes</label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="categoria"
              value="ensalada"
              onChange={e => setCategoria(e.target.value)}
            />
            <label className="form-check-label">Ensalada</label>
          </div>
        </div>

        <input
          type="submit"
          className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
          value="Agregar Producto"
          disabled={estaIncompleto()}
        />
      </form>
    </div>
  );
};

export default AgregarProducto;
