import { useState } from "react";
import getMaterialById from "services/getMaterialById";
import { API_URL } from "services/settings";

export default function UpdateMaterial() {
  const [id, setId] = useState();
  const [cursoId, setCursoId] = useState();
  const [moduloId, setModuloID] = useState();
  const [claseNumero, setClase] = useState();
  const [linkVideo, setLink] = useState();
  const [linkVideo2, setLink2] = useState();
  const [activo, setActivo] = useState();
  const [soloProfesor, setProfesor] = useState();
  const [archivoPDF, setPdf] = useState();
  const [planClases, setPlan] = useState();
  const [materialAdicional1, setAdicional] = useState();
  const [materialAdicional2, setAdicional2] = useState();
  const [imagenPreview, setImagen] = useState();
  const [nombre, setNombre] = useState();
  const [ready, setReady] = useState(false);

  const handleGetData = (event) => {
    event.preventDefault();
    getMaterialById({ id: id }).then((res) => {
      setCursoId(res.cursoId);
      setModuloID(res.moduloId);
      setClase(res.claseNumero);
      setLink2(res.linkVideo2);
      setActivo(res.activo);
      setProfesor(res.soloProfesor);
      setAdicional(res.materialAdicional1);
      setAdicional2(res.materialAdicional2);
      setPdf(res.archivoPDF);
      setPlan(res.planClases);
      setImagen(res.imagenPreview);
      setNombre(res.nombre);
      setReady(true);
    });
  };

  const handleNewLink = (event) => {
    event.preventDefault();
    if (!ready) return;

    const data = {
      id,
      cursoId,
      moduloId,
      claseNumero,
      linkVideo,
      linkVideo2,
      activo,
      soloProfesor,
      archivoPDF,
      planClases,
      materialAdicional1,
      materialAdicional2,
      imagenPreview,
      nombre,
    };
    fetch(`${API_URL}/MaterialEstudios/Update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => setReady(false));
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-primary p-10">
      <div className="rounded bg-gray-200 p-5">
        <h1>UPDATE MATERIAL</h1>
        <form className="flex flex-col gap-5" onSubmit={handleGetData}>
          <label>ID</label>
          <input
            type={"number"}
            value={id}
            onChange={({ target }) => setId(parseInt(target.value))}
          />
          <button className="rounded border border-primary">Get data</button>
        </form>
        <form className="mt-5 flex flex-col gap-2" onSubmit={handleNewLink}>
          <label>New Link</label>
          <input
            type={"text"}
            value={linkVideo}
            onChange={({ target }) => setLink(target.value)}
            required
          />
          <button
            className="round border bg-accent disabled:bg-red-500"
            disabled={ready ? false : true}
          >
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}
