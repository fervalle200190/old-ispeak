import getUserByEmail from "./getUserByEmail";
import { API_URL } from "./settings";

export default async function postRegisterUser({
  name,
  birthday,
  phone,
  country,
  city,
  occupation,
  email,
  password,
  programID,
}) {
  const URL = `${API_URL}/Usuario/RegistrarAlumno/1234`;

  const userInfo = {
    id: 0,
    nombre: name,
    fechaNacimiento: birthday,
    telefono: phone,
    pais: "",
    paisId: country,
    ciudad: city,
    ocupacion: occupation,
    email: email,
    password: password,
    programaId: programID,
  };
  console.log(userInfo);
  const res = await getUserByEmail(email);
  if (res) {
    alert("email already exist");
    return false;
  }

  try {
    const register = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    return register;
  } catch (err) {
    console.error(err);
  }

  // res ? alert("email already exist")
  //     : fetch(URL, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(userInfo),
  //     });
}
