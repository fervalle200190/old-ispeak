import { API_URL } from "./settings";

export default function setMaterialComplete({ materialId, classNum }) {
  const USER_ID = JSON.parse(localStorage.getItem("loggedAppUser")).id;
  const URL = `${API_URL}/MaterialEstudios/SetMaterialCompletado/${materialId}/${classNum}/${USER_ID}`;

  fetch(URL);
}
