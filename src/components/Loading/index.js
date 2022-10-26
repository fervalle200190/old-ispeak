import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function Loading({ show, styles, message }) {
  if (!show) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50"></div>
      <div
        className={`absolute top-1/2 left-1/2 w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-5 py-10 shadow-md ${styles} flex flex-col items-center gap-5`}
      >
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="animate-spin text-3xl text-primary"
        />
        <h2>{message}</h2>
      </div>
    </>
  );
}
