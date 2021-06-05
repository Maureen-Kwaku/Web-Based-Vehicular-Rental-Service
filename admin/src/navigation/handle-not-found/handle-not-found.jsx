import * as React from "react";

const HandleNotFound = () => {
  return (
    <React.Fragment>
      <div
        className={
          "h-screen w-screen bg-yellow-400 flex justify-center items-center flex-col"
        }
      >
        <h1 className={"text-9xl text-white font-bold"}>404</h1>
        <span className={"text-white"}>Oops, Page Not Found</span>
        <div className={"w-56 mt-1"}>
          <button className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-none text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-yellow-400 group-hover:text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </span>
            Go Home
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HandleNotFound;
