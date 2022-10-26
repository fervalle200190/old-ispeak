const AccordionItemTitle = ({ title }) => {
  return (
    <h2 className="mr-5 font-Barlow text-xl font-semibold text-primary">
      {title}
    </h2>
  );
};

const AccordionItemContent = ({ content }) => {
  if (Array.isArray(content)) {
    return content.map((item) => <h4 className="px-5">{item.nombre}</h4>);
  }

  return (
    <div className="pl-5 pt-5">
      <a
        className="group flex max-w-fit gap-1 overflow-hidden rounded-xl border border-gray-300 hover:bg-primary"
        href={content.pathAcceso}
        target="_blank"
        rel="noreferrer"
      >
        <span className="flex items-center border-gray-300 bg-accent p-2 font-semibold text-primary">
          {content.tipoContenido}
        </span>
        <div className="p-2 group-hover:text-white">
          <h5 className="font-semibold">{content.nombre}</h5>
          <span>{content.pathAcceso}</span>
        </div>
      </a>
    </div>
  );
};

export default function AccordionItem({ item }) {
  return (
    <li className="w-full max-w-5xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-10">
      <AccordionItemTitle title={item.curso} />
      {item.archivos.map((file) => {
        return <AccordionItemContent content={file} key={file.id} />;
      })}
    </li>
  );
}
