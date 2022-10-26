import { useState, useEffect } from "react";
import getCountries from "services/getCountries";
import { API_URL } from "services/settings";
import Loading from "components/Loading";
import { ErrorModal } from "components/ErrorModal";
import { SnackBarComponent } from "components/SnackbarComponent";
import Snackbar from "awesome-snackbar";
import { useLocation } from "wouter";


export default function ExternalRegisterPage({ params }) {
     const [location, setLocation] = useLocation()
     const [countries, setCountries] = useState([]);
     const [name, setName] = useState("");
     const [birthday, setBirthday] = useState("");
     const [phone, setPhone] = useState("");
     const [country, setCountry] = useState("");
     const [city, setCity] = useState("");
     const [occupation, setOccupation] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const today = new Date().toISOString().slice(0, 10);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(false);
     const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

     const handleName = ({ target }) => setName(target.value);
     const handleBirthday = ({ target }) => setBirthday(target.value);
     const handlePhone = ({ target }) => setPhone(target.value);
     const handleCountry = ({ target }) => setCountry(target.value);
     const handleCity = ({ target }) => setCity(target.value);
     const handleOccupation = ({ target }) => setOccupation(target.value);
     const handleEmail = ({ target }) => setEmail(target.value);
     const handlePassword = ({ target }) => setPassword(target.value);

     const handleSnackbar = () => setIsSnackbarOpen(!isSnackbarOpen);

     const handleSubmit = async (event) => {
          event.preventDefault();
          setLoading(true);
          const userInfo = {
               nombre: name,
               fechaNacimiento: birthday,
               telefono: phone,
               pais: "",
               paisId: country,
               ciudad: city,
               ocupacion: occupation,
               email: email,
               password: password,
               programaId: parseInt(params.courseid),
          };

          console.log(params);

          fetch(`${API_URL}/Usuario/RegistrarAlumno`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(userInfo),
          })
               .then((res) => res.json())
               .then((res) => {
                    if (res?.id) {
                         setLoading(false);
                         handleSnackbar();
                         new Snackbar(`Usuario creado con éxito`, {
                              theme: "light",
                              actionText: "cerrar",
                              position: "bottom-right",
                         });
                         setTimeout(() => {
                              setLocation('/')
                         }, 2000);
                    } else {
                         setError(true);
                         alert("Error al crear el usuario");
                    }
               })
               .catch((err) => {
                    console.log(err, "hola");
               })
               .finally(() => setLoading(false));

          // try {
          //   const response = await fetch(`${API_URL}/Usuario/RegistrarAlumno`, {
          //     method: "POST",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify(userInfo),
          //   });
          //   const data = await response.json();
          //   console.log(data);
          //   // if (response?.status === 201) {
          //   //   console.log(response);
          //   //   alert("Usuario Creado");
          //   //   window.location.replace("https://ispeakteam.com");
          //   // }
          // } catch (err) {
          //   console.error(err);
          //   // alert("Error al crear el usuario");
          //   // window.location.reload(false);
          // }
     };

     useEffect(() => {
          getCountries().then((response) => setCountries(response));
          console.log("componente montado");
     }, []);

     return (
          <>
               <div className="flex w-screen items-center justify-center bg-gray-100 p-10">
                    <div className="flex min-w-[20rem] flex-col items-center justify-center rounded-xl border-gray-200 bg-white p-5 px-10 shadow-sm">
                         <h1 className=" font-Barlow text-primary m-1 text-5xl font-medium">
                              i<span className="text-accent">.</span>speak
                         </h1>
                         <h2 className="m-1 text-2xl">Registro de Alumno</h2>
                         <span>
                              Completa tus datos y crea tu usuario y contraseña
                              para acceder al portal.
                         </span>
                         <form
                              className="mt-2 flex w-full flex-col gap-1"
                              onSubmit={handleSubmit}
                         >
                              <label className="font-medium">
                                   Nombre y Apellido
                              </label>
                              <input
                                   className="min-h-[2rem] rounded-sm border border-gray-200 px-2"
                                   type="text"
                                   name="name"
                                   value={name}
                                   onChange={handleName}
                                   required
                              />
                              <label className="font-medium">
                                   Fecha de Nacimiento
                              </label>
                              <input
                                   type="date"
                                   className="min-h-[2rem] rounded-sm border border-gray-200 px-2"
                                   name="birthday"
                                   value={birthday}
                                   onChange={handleBirthday}
                                   max={today}
                                   min="1950-01-01"
                                   required
                              />
                              <label className="font-medium">Celular</label>
                              <input
                                   className="min-h-[2rem] rounded-sm border border-gray-200 px-2"
                                   type="tel"
                                   name="phone"
                                   value={phone}
                                   onChange={handlePhone}
                                   required
                              />
                              <label className="font-medium">Pais</label>
                              <select
                                   className="min-h-[2rem] rounded-sm border border-gray-200 px-2"
                                   name="country"
                                   onChange={handleCountry}
                                   required
                              >
                                   <option value={''}>Selecciona un pais</option>
                                   {countries.map((country) => (
                                        <option
                                             key={country.id}
                                             value={country.id}
                                        >
                                             {country.nombre}
                                        </option>
                                   ))}
                              </select>
                              <label className="font-medium">Ciudad</label>
                              <input
                                   className="min-h-[2rem] rounded-sm border border-gray-200 px-2"
                                   type="text"
                                   name="city"
                                   value={city}
                                   onChange={handleCity}
                                   required
                              />
                              <label className="font-medium">Ocupacion</label>
                              <input
                                   className="min-h-[2rem] rounded-sm border border-gray-200 px-2"
                                   type="text"
                                   name="occupation"
                                   value={occupation}
                                   onChange={handleOccupation}
                                   required
                              />
                              <label className="font-medium">Email</label>
                              <input
                                   className="min-h-[2rem] rounded-sm border border-gray-200 px-2"
                                   type="email"
                                   name="email"
                                   value={email}
                                   onChange={handleEmail}
                                   required
                              />
                              <label className="font-medium">Contraseña</label>
                              <input
                                   className="min-h-[2rem] rounded-sm border border-gray-200 px-2"
                                   type="password"
                                   name="password"
                                   value={password}
                                   onChange={handlePassword}
                                   required
                              />
                              <div className="flex w-full justify-center">
                                   <button className="bg-accent font-Barlow text-primary mt-5 flex h-11 w-40 items-center justify-center rounded-3xl p-2">
                                        registrar
                                   </button>
                              </div>
                         </form>
                    </div>
               </div>
               <Loading message={"Cargando..."} show={loading} />
               <ErrorModal
                    show={error}
                    message={
                         "Hubo un problema al asignar el programa, por favor contactar con soporte"
                    }
               />
          </>
     );
}
