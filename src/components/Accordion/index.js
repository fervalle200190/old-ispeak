import AccordionItem from "components/AccordionItem";

export default function Accordion({ items = [] }) {
  return (
    <>
      <ol className="flex flex-col items-center gap-5">
        {items.map((item) => (
          <AccordionItem item={item} key={item.id} />
        ))}
      </ol>
    </>
  );
}
