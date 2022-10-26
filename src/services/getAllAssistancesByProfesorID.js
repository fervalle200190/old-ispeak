import { API_URL } from "./settings";

export default function getAllAssistancesByProfessorID() {
  const id = JSON.parse(localStorage.getItem("loggedAppUser")).id;
  const URL = `${API_URL}/Asistencias/GetAllByProfesor/${id}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
