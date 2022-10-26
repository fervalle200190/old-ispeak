// const Assistances = ({ assistances }) => {
//   return assistances.map((assistance) => {
//     return (
//       <tr className="h-10 text-center" key={assistance.id}>
//         <td className="text-left">{assistance.id}</td>
//         <td>{assistance.alumno}</td>
//         <td>{assistance.curso}</td>
//         <td>{assistance.modulo}</td>
//         <td>{assistance.clase}</td>
//         <td>{assistance.dia}</td>
//         <td>{assistance.presente}</td>
//       </tr>
//     );
//   });
// };

export default function ProgressPage() {
  return (
    <div className="w-full p-5">
      <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div>
          <h1 className="text-primary text-xl font-semibold">
            Assistances<span className="text-accent">.</span>
          </h1>
        </div>
        <div className="w-full">
          <table className="w-full">
            <thead className="text-primary/60 h-10 border-b-2">
              <tr>
                <th className="text-left font-semibold">ID</th>
                <th className="font-semibold">Student</th>
                <th className="font-semibold">Course</th>
                <th className="font-semibold">Date of submission</th>
                <th className="font-semibold">Diagnostic level</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {/* <Fo assistances={assistances} /> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
