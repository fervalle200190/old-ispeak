import { useState, useEffect } from "react";

import getCoursesByProfessor from "services/getCoursesByProfessorId";

import CourseListSection from "components/CoursesSection";
import CoursesHeader from "components/CoursesHeader";

export default function ProfessorCoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCoursesByProfessor().then((courses) => setCourses(courses));
  }, []);

  return (
    <>
      <section className="flex w-full flex-col gap-5 p-5 md:p-10">
        <CoursesHeader coursesNum={courses.length} />
        <CourseListSection courses={courses} />
      </section>
    </>
  );
}
