import CourseNavItems from "components/CourseNavItems";

export default function CourseNav({ courseId, units = [] }) {
  return (
    <div className=" max-h-[45vh] scrollbar scrollbar-thin scrollbar-track-blue-900 scrollbar-thumb-gray-300 rtl">
      <div className="ltr pl-10">
        <nav className="flex flex-col gap-5">
          {units.map(({id, nombre, clases}) => (
            <div key={id} className="flex flex-col">
            <h2 className="pb-2">{nombre}</h2>
            <CourseNavItems courseId={courseId} materials={clases} moduleId={id} />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}