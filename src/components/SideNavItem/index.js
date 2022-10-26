import { Link } from "wouter";

export default function SideNavItem({ title, icon, url = "/" }) {
  return (
    <Link
      href={url}
      className="text-md group w-full border-accent py-5 pl-10 text-white hover:border-l-[3px] hover:bg-gray-100 hover:font-bold hover:text-primary"
    >
      {icon}
      {title}
    </Link>
  );
}
