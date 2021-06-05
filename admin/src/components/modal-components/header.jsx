import * as React from "react";

const ModalHeader = ({ close, label, icon: Icon }) => {
  return (
    <React.Fragment>
      <div
        className={
          "h-16 bg-yellow-600 w-full flex justify-between items-center px-3"
        }
      >
        <div className={"flex flex-row "}>
          <svg
            className={"h-5 w-5 text-white"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <Icon />
          </svg>
          <span className={"text-white ml-2"}>{label}</span>
        </div>
        <div>
          <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4 ">
            <div
              onClick={close}
              className={
                "bg-yellow-800 cursor-pointer hover:bg-yellow-700 rounded-full flex justify-center items-center p-2"
              }
            >
              <span
                className="text-white hover:text-white focus:outline-none focus:text-white transition ease-in-out duration-150"
                aria-label="Close"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalHeader;
