import CourseCard from "components/CourseCard";

export default function CourseList({ courses }) {
  return (
    <div className="flex flex-wrap gap-5">
      {courses.map(
        ({
          id,
          nombre,
          cantidadAlumnos,
          duracion,
          profesor,
          porcentajeCompletado,
        }) => {
          return (
            <CourseCard
              key={id}
              id={id}
              title={nombre}
              students={cantidadAlumnos}
              duration={duracion}
              professor={profesor}
              progress={porcentajeCompletado}
            />
          );
        }
      )}
    </div>
  );
}
