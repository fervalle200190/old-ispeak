import Loading from "components/Loading";
import Modal from "components/Modal";
import { StudentsContext } from "context/studentsContext";
import { useState, useContext, useEffect } from "react";
import getAssistedCourses from "services/getAssistedCoursesByUserId";
import getFollowUpsByStudentID from "services/getFollowUpByStudentID";
import addFollowUp from "services/postAddFollowUp";

const Student = ({ data }) => {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    getFollowUpsByStudentID({ id: data.id }).then((response) =>
      setFollowUps(response)
    );
  }, [data]);

  return (
    <>
      <h3 className="mb-5 text-xl font-medium text-primary">{data?.nombre}</h3>
      <table className="w-full">
        <thead className="h-10 border-b-2 text-primary/80">
          <tr className="">
            <th className=" w-24 font-semibold">Date</th>
            <th className=" w-24 font-semibold">Course</th>
            <th className=" w-24 font-semibold">Module</th>
            <th className=" font-semibold">Class</th>
            <th className=" font-semibold">Follow Up</th>
          </tr>
        </thead>
        <tbody className="text-neutral-700">
          {followUps.map((followup) => (
            <tr key={followup.id}>
              <th className="font-normal">{followup.date}</th>
              <th className="font-normal">{followup.course}</th>
              <th className="font-normal">{followup.module}</th>
              <th className="font-normal">{followup.class}</th>
              <th className="font-normal">{followup.followup}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const AddFollowUp = ({ students }) => {
  const [student, setStudent] = useState(false);
  const [courses, setCourses] = useState(false);
  const [course, setCourse] = useState(false);
  const [module, setModule] = useState(false);
  const [material, setMaterial] = useState();
  const [observation, setObservation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStudent = ({ target }) => {
    if (target.value === "false") {
      setCourse(false);
      setCourses(false);
      setStudent(false);
      return;
    }
    setStudent(target.value);
    getAssistedCourses({ id: target.value }).then((res) => setCourses(res));
  };

  const handleCourse = ({ target }) => {
    if (target.value === "false") return setCourse(false);
    if (target.value) setCourse(JSON.parse(target.value));
  };

  const handleModule = ({ target }) => setModule(JSON.parse(target.value));
  const handleObservation = ({ target }) => setObservation(target.value);
  const handleMaterial = ({ target }) => setMaterial(target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const profesorId = JSON.parse(localStorage.getItem("loggedAppUser")).id;
    const today = new Date().toISOString().slice(0, 10);
    const data = {
      id: 0,
      alumnoId: student,
      cursoId: course.id,
      moduloId: module.id,
      fechaCarga: today,
      correcciones: observation,
      profesorId: profesorId,
      clase: material,
    };
    try {
      await addFollowUp({ data: data });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="mb-5 text-xl font-medium text-primary">Add follow up</h3>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label>Student</label>
        <select
          onChange={handleStudent}
          className="rounded-lg border border-gray-400 px-2 py-1"
        >
          <option value={false}></option>
          {students.map(({ id, nombre }) => (
            <option key={id} value={id}>
              {nombre}
            </option>
          ))}
        </select>
        <label>Course</label>
        {courses ? (
          <select
            onChange={handleCourse}
            className="rounded-lg border border-gray-400 px-2 py-1"
          >
            <option value={false}></option>
            {courses.map((course) => (
              <option key={course.id} value={JSON.stringify(course)}>
                {course.nombre}
              </option>
            ))}
          </select>
        ) : (
          <select
            disabled
            className="rounded-lg border border-gray-400 bg-neutral-200 px-2 py-1"
          ></select>
        )}
        <label>Module</label>
        {course ? (
          <select
            onChange={handleModule}
            className="rounded-lg border border-gray-400 px-2 py-1"
          >
            <option value={""}></option>
            {course.modulos.map((module) => (
              <option key={module.id} value={JSON.stringify(module)}>
                {module.nombre}
              </option>
            ))}
          </select>
        ) : (
          <select
            disabled
            className="rounded-lg border border-gray-400 bg-neutral-200 px-2 py-1"
          ></select>
        )}
        <label>Class</label>
        <input
          className="rounded-lg border border-neutral-400 px-2 py-1"
          type={"number"}
          min={0}
          onChange={handleMaterial}
        />

        <label>Observation</label>
        <textarea
          type={"textarena"}
          onChange={handleObservation}
          className="h-20 rounded-lg border border-neutral-400 px-2 py-1"
        />
        <button className="rounded-lg bg-accent px-2 py-1">Submit</button>
      </form>
      <Loading show={loading} message={"Loading..."} />
    </>
  );
};

export default function FollowUpPage() {
  const students = useContext(StudentsContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [data, setData] = useState();

  return (
    <div className="w-full p-5">
      <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold text-primary">
            Follow Up<span className="text-accent">.</span>
          </h1>
          <button
            className="rounded-lg bg-accent px-3 py-1"
            onClick={() => setOpenAdd(true)}
          >
            Add
          </button>
        </div>
        <div className="w-full">
          <table className="w-full">
            <thead className="h-10 border-b-2 text-primary/60">
              <tr>
                <th className="font-semibold">Student</th>
                <th className="font-semibold">Course</th>
                <th className="font-semibold">Progress</th>
                <th className="font-semibold">Completed</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="h-10 text-center"
                  onClick={() => {
                    setData(student);
                    setOpenStudent(true);
                  }}
                >
                  <th className="font-medium">{student.nombre}</th>
                  <th className="font-medium">{student.curso}</th>
                  <th className="font-medium">{student.avance}</th>
                  <th className="font-medium">
                    {student.porcentajeCompletado}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        styles={"w-[90%] max-w-sm"}
      >
        <AddFollowUp students={students} />
      </Modal>
      <Modal
        open={openStudent}
        onClose={() => setOpenStudent(false)}
        styles={"w-[calc(100%-1.25rem)]"}
      >
        <Student data={data} />
      </Modal>
    </div>
  );
}
