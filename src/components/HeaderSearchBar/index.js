import React from "react";

import HeaderIcons from "../HeaderIcons";

export default function HeaderSearchBar() {
  return (
    <>
      <form className="flex h-[36px] items-center overflow-hidden rounded-md  border-gray-200 md:w-1/2 md:border md:shadow-sm">
        <HeaderIcons name="search" />
        <input
          type="text"
          className="hidden h-full w-full px-1 text-xs outline-none md:inline-block"
          placeholder="Search Course or Instructor"
        />
      </form>
    </>
  );
}
