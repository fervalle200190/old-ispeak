import { API_URL, USER_ID } from "./settings";

export default function getAdditionalMaterialByUser() {
  const URL = `${API_URL}/MaterialRefuerzo/GetAllByAlumnoCurso/${USER_ID}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
