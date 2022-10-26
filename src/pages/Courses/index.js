import React, { useContext } from "react";

// import getCoursesByUserId from "services/getCoursesByUserId";
import { CoursesContext } from "context/coursesContext";

import CourseListSection from "components/CoursesSection";
import CoursesHeader from "components/CoursesHeader";

export default function CoursesPage() {
  // const [courses, setCourses] = useState([]);
  const courses = useContext(CoursesContext);

  // useEffect(() => {
  //   getCoursesByUserId().then((courses) => setMyCourses(courses));
  // }, []);

  return (
    <>
      <section className="flex w-full flex-col gap-5 p-5 md:p-10">
        <CoursesHeader coursesNum={courses.length} />
        <CourseListSection courses={courses} />
      </section>
    </>
  );
}
