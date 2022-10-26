import { API_URL } from "./settings";

export default function addFollowUp({ data }) {
  const URL = `${API_URL}/Seguimientos/Create`;

  return fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}
