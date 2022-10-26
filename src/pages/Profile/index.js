import { useEffect, useState } from "react";
import getUser from "services/getUser";

export default function ProfilePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser().then((response) => setUser(response));
  }, []);

  return (
    <section className="lg:pd-10 flex flex-col p-5">
      <h2 className="mb-5 text-2xl font-semibold text-primary">My Profile</h2>
      <div className="flex w-full max-w-lg rounded-xl bg-primary p-5">
        <form className="flex w-full flex-col gap-2">
          <div className="mb-3 w-full">
            <label className="inline-block w-1/3 pr-2 text-right font-semibold text-gray-50">
              Name
            </label>
            <input
              type="text"
              value={user.nombre}
              className="border-b  border-accent bg-transparent px-2 text-gray-50"
            ></input>
          </div>
          <div className="mb-3 w-full">
            <label className="inline-block w-1/3 pr-2 text-right font-semibold text-gray-50">
              Email
            </label>
            <input
              type="text"
              value={user.email}
              className="border-b  border-accent bg-transparent px-2 text-gray-50"
            ></input>
          </div>
          <div className="mb-3 w-full">
            <label className="inline-block w-1/3 pr-2 text-right font-semibold text-gray-50">
              Password
            </label>
            <input
              type="password"
              value={user.password}
              className="border-b  border-accent bg-transparent px-2 text-gray-50"
            ></input>
          </div>
          <div className="mb-3 w-full">
            <label className="inline-block w-1/3 pr-2 text-right font-semibold text-gray-50">
              Cellphone Number
            </label>
            <input
              type="text"
              value={user.telefono}
              className="border-b  border-accent bg-transparent px-2 text-gray-50"
            ></input>
          </div>
          <div className="mb-3 w-full">
            <label className="inline-block w-1/3 pr-2 text-right font-semibold text-gray-50">
              Occupation
            </label>
            <input
              type="text"
              value={user.ocupacion}
              className="border-b  border-accent bg-transparent px-2 text-gray-50"
            ></input>
          </div>
          <div className="mb-3 w-full">
            <label className="inline-block w-1/3 pr-2 text-right font-semibold text-gray-50">
              Address
            </label>
            <input
              type="text"
              value={user.direccionCompleta}
              className="border-b  border-accent bg-transparent px-2 text-gray-50"
            ></input>
          </div>
          <div className="mb-3 w-full">
            <label className="inline-block w-1/3 pr-2 text-right font-semibold text-gray-50">
              Country
            </label>
            <input
              type="text"
              value={user.ciudad}
              className="border-b  border-accent bg-transparent px-2 text-gray-50"
            ></input>
          </div>
          <div className="mb-3 w-full">
            <label className="inline-block w-1/3 pr-2 text-right font-semibold text-gray-50">
              City
            </label>
            <input
              type="text"
              value={user.ciudad}
              className="border-b  border-accent bg-transparent px-2 text-gray-50"
            ></input>
          </div>
          <div className="flex w-full justify-end">
            <button className=" w-28 rounded-lg bg-accent p-1">Save</button>
          </div>
        </form>
      </div>
    </section>
  );
}
