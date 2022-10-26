import React from "react";

export default function CoursesIcons({name}) {
    const ICONS = {
        search: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 154.78 154.77"
            className="h-5 fill-accent px-2"
          >
            <path d="M113.58,99.9A63.11,63.11,0,1,0,99.9,113.58l41.2,41.19,13.68-13.68Zm-50.7,6.51a43.53,43.53,0,1,1,43.53-43.53A43.58,43.58,0,0,1,62.88,106.41Z" />
          </svg>
        ),
    }

    return <>{ICONS[name]}</>
}