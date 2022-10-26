import { API_URL } from "./settings";

export default function getCountries() {
  const URL = `${API_URL}/Usuario/GetPaises`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
