import * as React from "react";
import { useOutsideListener } from "../hooks";
import { useHistory } from "react-router-dom";
import { Transition } from "@headlessui/react";

const UserMenu = ({ onClickLogout }) => {
  const { push } = useHistory();
  //for handling dropdown
  const wrapperContainer = React.useRef(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  useOutsideListener(wrapperContainer, () => setShowDropdown(false));

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <React.Fragment>
      {/* <!-- User account dropdown --> */}
      <div
        ref={wrapperContainer}
        className="px-3 relative inline-block text-left"
      >
        {/* <!-- Dropdown menu toggle, controlling the show/hide state of dropdown menu. --> */}
        <div>
          <span
            onClick={toggleDropdown}
            className=" flex text-sm text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            id="user-menu"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <div className={"bg-gray-800 rounded-full mr-2"}>
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ah3lxr8uqw&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className={"flex flex-col items-start"}>
              <h1 className={"font-medium"}>Maureen Kwaku</h1>
              <h1 className={"text-xs font-light"}>Admin</h1>
            </div>
          </span>
        </div>
        <Transition
          show={showDropdown}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <span
              onClick={() => {
                push("/settings?tab=profile");
                setShowDropdown(false);
              }}
              className="block py-2 cursor-pointer px-4 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Your Profile
            </span>

            <span
              onClick={() => {
                push("/settings?tab=security");
                setShowDropdown(false);
              }}
              className="block py-2 cursor-pointer px-4 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Security Settings
            </span>

            <span
              onClick={() => {
                onClickLogout();
                setShowDropdown(false);
              }}
              className="block py-2 cursor-pointer px-4 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </span>
          </div>
        </Transition>
      </div>
    </React.Fragment>
  );
};

export default UserMenu;
