import { useState, useEffect } from "react";

import getAdditionalMaterialByUser from "services/getAdditionalMaterialByUser";

import Accordion from "components/Accordion";

export default function AdditionalMaterialPage() {
  const [refuerzo, setRefuerzo] = useState([]);

  useEffect(() => {
    getAdditionalMaterialByUser().then((response) => {
      setRefuerzo(response);
    });
  }, []);

  return (
    <section className="flex flex-col gap-5 p-5 md:p-10">
      <h2 className="text-2xl font-semibold text-primary">
        Additional Material
      </h2>
      <Accordion items={refuerzo} />
    </section>
  );
}
