import { API_URL } from "./settings";

export default function getCommentsByMaterialId({ id }) {
  const URL = `${API_URL}/Comentarios/getComentariosByClase/${id}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
