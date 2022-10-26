import { API_URL } from "./settings";

export default function getAdditionalMaterialByCourse({ id }) {
  const URL = `${URL}MaterialRefuerzo/GetAllByCurso/${id}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
