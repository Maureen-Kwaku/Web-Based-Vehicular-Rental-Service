import { Link } from "react-router-dom";
import * as React from "react";
import cn from "classnames";
import { routes } from "../navigation";

const NavLink = ({ pathname }) => {
  return (
    <>
      {routes.map((link, i) => (
        <Link
          key={i}
          to={link.path}
          className={cn(
            "text-white rounded-md py-2 px-3 inline-flex items-center text-sm font-medium",
            {
              "bg-gray-700 text-white": pathname === link.path,
              "text-gray-300 hover:bg-gray-700 hover:text-white": !(
                pathname === link.path
              ),
              "ml-5": i > 0,
            }
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default NavLink;
