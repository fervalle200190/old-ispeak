import DashboardResume from "../DashboardResume";
import DashboardInfo from "../DashboardInfo";
import placeholder from "assets/placeholder.png";

export default function DashboardSection() {
  return (
    <section className="flex flex-wrap-reverse justify-between gap-5 p-5 md:p-10 lg:grid lg:grid-cols-2">
      <DashboardResume />
      <DashboardInfo />
    </section>
  );
}
