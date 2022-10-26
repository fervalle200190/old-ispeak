import { Link } from "wouter";

import CourseIcons from "components/CourseIcons";

export default function CourseNavItems({ courseId, moduleId, materials = [] }) {
  return (
    <ol>
      {materials.map(({ id, nombre, completada }) => {
        return completada ? (
          <li
            key={id}
            className="flex items-center justify-between p-2 text-gray-500"
          >
            <Link
              className="flex items-center gap-3"
              href={`/courses/${courseId}/module/${moduleId}/material/${id}`}
            >
              <div className="flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-accent">
                <CourseIcons name="check" />
              </div>
              <h4 className="font-semibold">{nombre}</h4>
            </Link>
            {/* <span>{cls.video.duration}</span> */}
          </li>
        ) : (
          <li key={id} className="flex items-center justify-between p-2">
            <Link
              className="flex items-center gap-3"
              href={`/courses/${courseId}/module/${moduleId}/material/${id}`}
            >
              <div className="flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-accent opacity-10">
                <CourseIcons name="play" />
              </div>
              <h4 className="font-semibold">{nombre}</h4>
            </Link>
            {/* <span>{cls.video.duration}</span> */}
          </li>
        );
      })}
    </ol>
  );
}
