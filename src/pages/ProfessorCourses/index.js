import { useEffect, useState } from "react";
import getCoursesByProfessor from "services/getCoursesByProfessorId";

const Courses = ({ courses }) => {
  return courses.map((course) => {
    return (
      <tr className="h-10 text-center" key={course.id}>
        <td className="text-left">{course.nombre}</td>
        <td>{course.cantidadModulos}</td>
        <td>{course.cantidadAlumnos}</td>
        <td>{course.duracion} months</td>
      </tr>
    );
  });
};

export default function ProfessorCoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCoursesByProfessor().then((response) => setCourses(response));
  }, []);

  return (
    <div className="w-full p-5">
      <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div>
          <h1 className="text-primary text-xl font-semibold">
            My courses<span className="text-accent">.</span>
          </h1>
        </div>
        <div className="w-full">
          <table className="w-full">
            <thead className="text-primary/60 h-10 border-b-2">
              <tr>
                <th className="text-left font-semibold">Name</th>
                <th className="font-semibold">Modules</th>
                <th className="font-semibold">Students</th>
                <th className="font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              <Courses courses={courses} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
