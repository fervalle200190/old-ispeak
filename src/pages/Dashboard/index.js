import React, { useContext } from "react";

import DashboardSection from "components/DashboardSection";
import DashboardCourses from "components/DashboardCourses";
import { CoursesContext } from "context/coursesContext";
import { StudentsContext } from "context/studentsContext";

const RenderProfessor = () => {
  const user = JSON.parse(localStorage.getItem("loggedAppUser"));
  const username = user.nombre.split(" ").slice(0, 1);
  const students = useContext(StudentsContext);

  return (
    <div className="flex w-full flex-col gap-5 p-5">
      <div>
        <div className="flex w-full flex-col rounded-xl bg-primary p-5">
          <span className="text-xl font-semibold text-white">
            Welcome back, {username}
            <span className="text-accent">.</span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex h-24 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <span className="text-xl font-semibold text-primary">
            Active students<span className="text-accent">.</span>
          </span>
          <span className="w-full text-right text-2xl text-primary">
            {students.length}
          </span>
        </div>
        <div className="flex h-24 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <span className="text-xl font-semibold text-primary">
            Courses in progress<span className="text-accent">.</span>
          </span>
          <span className="w-full text-right text-2xl text-primary"></span>
        </div>
      </div>
      <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <span className="text-xl font-semibold text-primary">
          My Students<span className="text-accent">.</span>
        </span>
      </div>
      <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <span className="text-xl font-semibold text-primary">
          My Courses<span className="text-accent">.</span>
        </span>
      </div>
    </div>
  );
};

const RenderStudent = ({ courses }) => {
  return (
    <div className="max-w-7xl">
      <DashboardSection />
      <DashboardCourses />
    </div>
  );
};

export default function DashboardPage() {
  const userInfo = JSON.parse(localStorage.getItem("loggedAppUser"));
  const courses = useContext(CoursesContext);

  // useEffect(() => {
  //   getCoursesByUserId().then((courses) => setMyCourses(courses));
  // }, []);

  return userInfo.rol === "Profesor" ? (
    <RenderProfessor />
  ) : (
    <RenderStudent courses={courses} />
  );
}
