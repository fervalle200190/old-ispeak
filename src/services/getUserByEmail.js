import { API_URL } from "./settings";

export default function getUserByEmail(email) {
  const URL = `${API_URL}/Usuario/GetByUserName/${email}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      return true;
    })
    .catch((err) => false);
}
