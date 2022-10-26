import { API_URL } from "./settings";

export default function getAssistancesByProfessor() {
  const id = JSON.parse(localStorage.getItem("loggedAppUser")).id;
  const URL = `${API_URL}/Asistencias/GetAllByProfesor/${id}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      const assistances = [];

      data.forEach((e) => {
        let i = assistances.findIndex(
          (x) => x.name === e.alumno && x.course === e.curso
        );
        if (i <= -1)
          assistances.push({
            name: e.alumno,
            course: e.curso,
            classes: 0,
            percent: "",
            assisted: 0,
          });
      });

      data.forEach((e) => {
        let i = assistances.findIndex(
          (x) => x.name === e.alumno && x.course === e.curso
        );
        if (i >= 0) assistances[i].classes++;
        if (i >= 0 && e.presente === "Si") assistances[i].assisted++;
      });

      assistances.forEach(
        (e) => (e.percent = `${Math.round((e.assisted * 100) / e.classes)}%`)
      );

      return assistances;
    });
}
