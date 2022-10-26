import { useEffect, useState, useContext } from "react";

import { StudentsContext } from "context/studentsContext";

import Modal from "components/Modal";

import getAssistancesByProfessor from "services/getAssistancesByProfessor";
import getAssistedCourses from "services/getAssistedCoursesByUserId";
import addAssistance from "services/postAddAssistance";
import getAllAssistancesByProfessorID from "services/getAllAssistancesByProfesorID";
import Loading from "components/Loading";

const AddForm = ({ students }) => {
  const [student, setStudent] = useState(false);
  const [courses, setCourses] = useState(false);
  const [course, setCourse] = useState(false);
  const [module, setModule] = useState(false);
  const [material, setMaterial] = useState();
  const [date, setDate] = useState();
  const [present, setPresent] = useState(false);
  const [observation, setObservation] = useState("");
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

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
  const handleDate = ({ target }) => setDate(target.value);
  const handlePresent = ({ target }) => setPresent(!present);
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
      fecha: date,
      fechaCarga: today,
      presente: present,
      reprogramar: false,
      observaciones: observation,
      profesorId: profesorId,
      clase: material,
    };
    try {
      await addAssistance({ data: data });
      window.location.reload(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="mb-5 text-xl font-medium text-primary">Add assistance</h3>
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
          onChange={handleMaterial}
          min={0}
        />
        <label>Date</label>
        <input
          className="rounded-lg border border-neutral-400 px-2 py-1"
          type={"date"}
          onChange={handleDate}
          max={today}
        />
        <div className="flex items-center gap-5">
          <label>Present</label>
          <input
            className="rounded-lg border border-neutral-400 px-2 py-1"
            type={"checkbox"}
            onChange={handlePresent}
          />
        </div>
        <label>Observation</label>
        <textarea
          type={"textarena"}
          onChange={handleObservation}
          className="h-20 rounded-lg border border-neutral-400 px-2 py-1"
        />
        <button className="rounded-lg bg-accent px-2 py-1">Submit</button>
      </form>
      <Loading show={loading} message="Loading..." styles={"z-30"} />
    </>
  );
};

const Student = ({ data, assistances }) => {
  const filter = assistances.filter((e) => e.alumno === data.name);
  return (
    <div>
      <h3 className="mb-5 text-xl font-medium text-primary">{data?.name}</h3>
      <table className="w-full">
        <thead className="h-10 border-b-2 text-primary/80">
          <tr className="">
            <th className=" w-24 font-semibold">Date</th>
            <th className=" w-24 font-semibold">Course</th>
            <th className=" w-24 font-semibold">Module</th>
            <th className=" font-semibold">Class</th>
            <th className=" font-semibold">Assited</th>
          </tr>
        </thead>
        <tbody className="text-neutral-700">
          {filter.map((e) => (
            <tr key={e.id}>
              <th className="font-normal">{e.dia}</th>
              <th className="font-normal">{e.curso}</th>
              <th className="font-normal">{e.modulo}</th>
              <th className="font-normal">{e.clase}</th>
              <th className="font-normal">{e.presente}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Assistances = ({ assistances, open }) => {
  return assistances.map((assistance) => {
    return (
      <tr
        className="h-10 text-center"
        key={assistance.id}
        onClick={() => open(assistance)}
      >
        <td>{assistance.name}</td>
        <td>{assistance.course}</td>
        <td>{assistance.classes}</td>
        <td>{assistance.assisted}</td>
        <td>{assistance.percent}</td>
      </tr>
    );
  });
};

export default function AssistancePage() {
  const [filtered, setFiltered] = useState([]);
  const [assistances, setAssistances] = useState([]);
  const students = useContext(StudentsContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [student, setStudent] = useState();

  useEffect(() => {
    getAllAssistancesByProfessorID().then((response) =>
      setAssistances(response)
    );
    getAssistancesByProfessor().then((response) => setFiltered(response));
  }, []);

  return (
    <div className="w-full p-5">
      <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div>
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold text-primary">
              Assistances<span className="text-accent">.</span>
            </h1>
            <button
              className="rounded-lg bg-accent px-3 py-1"
              onClick={() => setOpenAdd(true)}
            >
              Add
            </button>
          </div>
        </div>
        <div className="w-full">
          <table className="w-full">
            <thead className="h-10 border-b-2 text-primary/60">
              <tr>
                <th className="font-semibold">Name</th>
                <th className="font-semibold">Course</th>
                <th className="font-semibold">Classes</th>
                <th className="font-semibold">Assisted</th>
                <th className="font-semibold">Percent</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              <Assistances
                assistances={filtered}
                open={(student) => {
                  setStudent(student);
                  setOpenStudent(true);
                }}
              />
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        styles={"w-[90%] max-w-sm"}
      >
        <AddForm students={students} />
      </Modal>
      <Modal open={openStudent} onClose={() => setOpenStudent(false)}>
        <Student data={student} assistances={assistances} />
      </Modal>
    </div>
  );
}
