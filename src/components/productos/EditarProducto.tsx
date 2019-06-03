import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { History } from "history";
import { RouteComponentProps } from "react-router-dom";
import { IProducto } from "../../data/types";
import { Button, Spinner } from "react-bootstrap";

export interface IEditarProductoProps
  extends RouteComponentProps<{ id: string }> {
  resetProductos: (reset: boolean) => void;
}

const EditarProducto = (props: IEditarProductoProps) => {
  // PARA USAR REF
  // const precioPlatilloRef = useRef<HTMLInputElement>(null);
  // const nombrePlatilloRef = useRef<HTMLInputElement>(null);

  const [nombrePlatillo, setNombrePlatillo] = useState("");
  const [precioPlatillo, setPrecioPlatillo] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    const consultarApi = async () => {
      const response = await axios.get<IProducto>(
        `http://localhost:4000/restaurant/${props.match.params.id}`
      );
      setNombrePlatillo(response.data.nombrePlatillo);
      setPrecioPlatillo(response.data.precioPlatillo);
      setCategoria(response.data.categoria);
    };
    consultarApi();
  }, []);

  const guardarProducto = async (e: React.FormEvent, history: History) => {
    e.preventDefault();
    const producto: Partial<IProducto> = {
      nombrePlatillo,
      precioPlatillo,
      categoria
    };
    try {
      const response = await axios.put(
        `http://localhost:4000/restaurant/${props.match.params.id}`,
        producto
      );
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          type: "success",
          title: "Producto modificado",
          showConfirmButton: false,
          timer: 500
        });
        props.resetProductos(true);
        history.push("/productos");
      } else {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Status: ${response.status.toString}`
        });
        history.push("/productos");
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

  if (!categoria)
    return (
      <div className="text-center">
        <Spinner animation="grow" variant="primary" />
      </div>
    );

  return (
    <div className="col-md-8 mx-auto ">
      <h1 className="text-center">Modificar Producto</h1>

      <form className="mt-5" onSubmit={e => guardarProducto(e, props.history)}>
        <div className="form-group">
          <label>Nombre Platillo</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            placeholder="Nombre Platillo"
            defaultValue={nombrePlatillo}
            onChange={e => setNombrePlatillo(e.target.value)}
            // ref={nombrePlatilloRef}
          />
        </div>

        <div className="form-group">
          <label>Precio Platillo</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            placeholder="Precio Platillo"
            defaultValue={precioPlatillo}
            onChange={e => setPrecioPlatillo(e.target.value)}
            // ref={precioPlatilloRef}
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
              defaultChecked={categoria === "postre"}
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
              defaultChecked={categoria === "bebida"}
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
              defaultChecked={categoria === "cortes"}
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
              defaultChecked={categoria === "ensalada"}
              onChange={e => setCategoria(e.target.value)}
            />
            <label className="form-check-label">Ensalada</label>
          </div>
        </div>

        <div className="text-center mt-5">
          <input
            type="submit"
            className="font-weight-bold text-uppercase btn btn-primary  "
            value="Guardar Producto"
            disabled={estaIncompleto()}
          />
          <Button
            onClick={() => props.history.push("/productos")}
            className="ml-2 text-uppercase"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditarProducto;
