export default function DashboardIcons({ name }) {
  const ICONS = {
    play: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 78.9 105.14"
        className="h-5 w-5 fill-white"
      >
        <path d="M73.08,42.81l-58.35-40A14.24,14.24,0,0,0,7.06,0C2.7,0,0,3.51,0,9.37V95.78c0,5.86,2.7,9.36,7.05,9.36a14.07,14.07,0,0,0,7.63-2.84l58.38-40c3.76-2.58,5.84-6,5.84-9.77S76.84,45.38,73.08,42.81Z" />
      </svg>
    ),
  };

  return <>{ICONS[name]}</>;
}
