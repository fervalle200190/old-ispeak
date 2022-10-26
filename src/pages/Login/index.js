import { useState } from "react";
import postLogin from "services/postLogin";

import "./styles.css";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    postLogin({ email, password }).then((data) => {
      if (data === false) {
        setEmail("");
        setPassword("");
        setIsError(true);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      window.location.reload(false);
    });
  };

  const handleEmail = ({ target }) => setEmail(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex h-96 w-4/12 min-w-[24rem] max-w-md flex-col items-center justify-between gap-5 rounded-3xl bg-primary p-10 shadow-md"
      >
        <h1 className=" font-Barlow text-6xl text-white">
          i<span className="text-accent">.</span>speak
        </h1>
        <div className="flex flex-col gap-1">
          <label className="font-Barlow text-white">Email</label>
          <input
            className="rounded-sm p-1"
            type="text"
            name="email"
            placeholder="example@mail.com"
            value={email}
            onChange={handleEmail}
          />
          <label className="font-Barlow text-white">Password</label>
          <input
            className="rounded-sm p-1"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        {!isError ? (
          <></>
        ) : (
          <span className=" text-red-400">Error de email o contrasena</span>
        )}
        {!isLoading ? (
          <button className="flex h-11 w-40 items-center justify-center rounded-3xl bg-accent p-2 font-Barlow text-primary">
            Login
          </button>
        ) : (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </form>
    </div>
  );
}
