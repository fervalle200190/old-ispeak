import { API_URL } from "./settings";

export default async function getFollowUpsByStudentID({ id }) {
  const URL = `${API_URL}/Seguimientos/GetAllByAlumno/${id}`;

  const followUps = await fetch(URL).then((response) => response.json());
  return Promise.all(
    followUps.map((followup) => {
      return fetch(`${API_URL}/Seguimientos/GetById/${followup.id}`)
        .then((res) => res.json())
        .then((res) => {
          const data = {
            id: followup.id,
            course: followup.curso,
            module: followup.modulo,
            class: res.clase,
            followup: res.correcciones,
            date: followup.fechaCarga.split("T")[0],
          };
          return data;
        });
    })
  );
}
