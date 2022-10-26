import { API_URL } from "./settings";

export default function addAssistance({ data }) {
  const URL = `${API_URL}/Asistencias/Create`;

  // const body = {
  //   id: 0,
  //   alumnoId: data.student,
  //   cursoId: data.course.id,
  //   moduloId: data.module.id,
  //   fecha: data.date,
  //   fechaCarga: today,
  //   presente: data.present,
  //   profesorId: profesorId,
  //   clase: data.material,
  // };

  return fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}
