export default function Modal({ open, onClose, children, styles }) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/50"
        onClick={onClose}
      ></div>
      <div
        className={`relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-5 shadow-md ${styles}`}
      >
        {children}
      </div>
    </>
  );
}
