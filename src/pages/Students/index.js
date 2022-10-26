import Modal from "components/Modal";
import { StudentsContext } from "context/studentsContext";
import { useState, useEffect, useContext } from "react";
import getStudentsData from "services/getStudentsData";

const Student = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h3 className="mb-5 text-xl font-medium text-primary">{data.name}</h3>
      <table className="w-full">
        <thead className="h-10 border-b-2 text-primary/80">
          <tr className="">
            <th className=" w-24 font-semibold">Course</th>
            <th className=" w-24 font-semibold">Progress</th>
            <th className=" w-24 font-semibold"></th>
          </tr>
        </thead>
        <tbody className="text-neutral-700">
          {data.courses.map(({ id, nombre, porcentajeCompletado }) => (
            <tr key={id}>
              <th className="font-normal">{nombre}</th>
              <th className="font-normal">
                {porcentajeCompletado <= 100
                  ? porcentajeCompletado + "%"
                  : "100%"}
              </th>
              <th className="font-normal"></th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function StudentsPage() {
  const students = useContext(StudentsContext);
  const [data, setData] = useState();
  const [studentsData, setStudentData] = useState([]);
  const [openStudent, setOpenStudent] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getStudentsData({ students: students });
        console.log(response);
        setStudentData(response);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [students]);

  return (
    <div className="w-full p-5">
      <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div>
          <h1 className="text-xl font-semibold text-primary">
            Students<span className="text-accent">.</span>
          </h1>
        </div>
        <table className="w-full">
          <thead className="h-10 border-b-2 text-primary/60">
            <tr>
              <th className="font-semibold">Name</th>
              <th className="font-semibold">Courses</th>
              <th className="font-semibold">Completed</th>
            </tr>
          </thead>
          <tbody className="text-neutral-700">
            {studentsData.map(({ id, name, courses, completed }) => {
              return (
                <tr
                  className="h-10 text-center"
                  key={id}
                  onClick={() => {
                    setOpenStudent(true);
                    setData({ id, name, courses });
                  }}
                >
                  <th className="font-normal">{name}</th>
                  <th className="font-normal">{courses.length}</th>
                  <th className="font-normal">{completed}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal open={openStudent} onClose={() => setOpenStudent(false)}>
        <Student data={data} />
      </Modal>
    </div>
  );
}
