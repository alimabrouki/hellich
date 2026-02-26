import type { menuProps } from "../../utils/menuProps";
import logo from "../../assets/images/logo.svg";

function Logo({ menuOpen }: menuProps) {
  return (
    <img
      className={`w-35 rounded-[3px] mr-auto lg:mr-5 ${menuOpen && "bg-black"}`}
      src={logo}
      alt=""
    />
  );
}

export default Logo;
