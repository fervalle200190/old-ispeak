import CourseIcons from "components/CourseIcons";
import { CoursesContext } from "context/coursesContext";
import { useContext, useState } from "react";
import { Link } from "wouter";

const ContentReview = () => {};

const CourseCard = ({ title, courses }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="flex h-fit w-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:max-w-fit">
      <div onClick={() => setIsActive(!isActive)}>
        <h3 className="mb text-xl font-semibold text-primary">{title}</h3>
      </div>
      <ul
        className={
          isActive ? "mt-5 flex flex-col gap-2" : "max-h-0 overflow-hidden"
        }
      >
        {courses.map(({ id, nombre, porcentajeCompletado }) => (
          <Link key={id} href={`/courses/${id}`}>
            <li className="flex flex-col gap-2 rounded-xl border border-gray-200 p-5 shadow-md">
              <div className="h-5 w-full rounded-xl bg-primary/30">
                <div
                  className="flex h-full min-w-fit items-center rounded-xl bg-primary px-2 text-right text-gray-50"
                  style={{ width: porcentajeCompletado + "%" }}
                >
                  <span className="w-full">{porcentajeCompletado}%</span>
                </div>{" "}
              </div>
              <h4 className="text-primary">{nombre}</h4>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const LearningCard = ({ title, courses }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="flex h-fit w-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:max-w-fit">
        <div onClick={() => setIsActive(!isActive)}>
          <h3 className="mb text-xl font-semibold text-primary">{title}</h3>
        </div>
        <ul
          className={
            isActive ? "mt-5 flex flex-col gap-2" : "max-h-0 overflow-hidden"
          }
        >
          {courses.map(({ modulos }) =>
            modulos.map(({ id, cursoId, clases }) => {
              const moduleID = id;
              const courseID = cursoId;
              return clases.map(({ id, nombre, completada }) => {
                if (completada) return <></>;
                return (
                  <Link
                    key={id}
                    href={`/courses/${courseID}/module/${moduleID}/material/${id}`}
                  >
                    <li className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 p-5 shadow-md">
                      <div className="flex items-center justify-center rounded-full bg-primary/30 p-2">
                        <CourseIcons name="play" />
                      </div>
                      <h4 className="text-primary">{nombre}</h4>
                    </li>
                  </Link>
                );
              });
            })
          )}
          {/* {courses.map(({ id, nombre }) => (
            <Link key={id} href={`/courses/${id}`}>
              <li className="flex flex-col gap-2 rounded-xl border border-gray-200 p-5 shadow-md">
                <h4 className="text-primary">{nombre}</h4>
              </li>
            </Link>
          ))} */}
        </ul>
      </div>
    </>
  );
};

export default function DashboardCourses() {
  const COURSES = useContext(CoursesContext);
  const learningPath = COURSES.filter((course) => course.duracion !== 0);
  const onDemand = COURSES.filter((course) => course.duracion === 0);

  return (
    <div className="flex w-full flex-wrap gap-5 p-5">
      <LearningCard title="Personalized Learning Path" courses={learningPath} />
      {/* <CourseCard title="Personalized Learning Path" courses={learningPath} /> */}
      <CourseCard title="Learn at your own pace" courses={onDemand} />
    </div>
  );
}
