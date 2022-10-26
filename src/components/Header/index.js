import { useContext } from "react";
import { Link } from "wouter";

import HeaderIcons from "components/HeaderIcons";
import HeaderSearchBar from "components/HeaderSearchBar";
import { SideBarContext } from "context/sideBarContext";

export default function Header() {
  const { setIsOpen } = useContext(SideBarContext);
  const user = JSON.parse(localStorage.getItem("loggedAppUser"));
  const username = user.nombre.split(" ").slice(0, 1);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedAppUser");
    window.location.reload()
  };

  return (
    <>
      <header className="flex h-[72px] w-full items-center justify-between bg-white px-10 py-5 shadow-sm">
        <div className="flex h-full items-center">
          <button className="md:hidden" onClick={() => setIsOpen(true)}>
            <HeaderIcons name="hamburguer" />
          </button>
          <Link
            href="/"
            className=" text-4xl font-light text-primary md:hidden"
          >
            i<span className="text-accent">.</span>speak
          </Link>
        </div>
        <div className="flex md:w-full md:justify-between">
          <HeaderSearchBar />
          <div className="flex gap-5">
            <div className="flex items-center">
              <HeaderIcons name="profile" />
              <span className="hidden font-medium text-primary md:inline">
                {username}
              </span>
            </div>
            <button onClick={handleLogout} className="text-primary">
              Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
