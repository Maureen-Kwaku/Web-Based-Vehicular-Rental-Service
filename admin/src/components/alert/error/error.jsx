import * as React from "react";

const ErrorAlert = ({
  mainMessage,
  subMessage,
  buttonAction,
  buttonLabel,
  buttonAvail,
}) => {
  return (
    <React.Fragment>
      <div
        className={"h-2/3 w-11/12  flex justify-center items-center flex-col"}
      >
        {/* <div> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={" h-32 w-32 text-red-600"}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <h1 className={"font-bold text-2xl text-center text-red-500"}>
          {mainMessage}
        </h1>
        <span className={"text-center mt-5 text-yellow-700"}>{subMessage}</span>
        {buttonAvail && (
          <div className={"mt-2"}>
            <button
              onClick={buttonAction}
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-red-600 shadow-sm text-sm font-medium rounded-none text-yellow-900 bg-white hover:text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:order-1 sm:ml-3"
            >
              <svg
                className={"h-5 w-5 mr-2"}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>

              {buttonLabel}
            </button>
          </div>
        )}
      </div>
      {/* </div> */}
    </React.Fragment>
  );
};

ErrorAlert.defaultProps = {
  mainMessage: "Oops, don't fret! let's take another shot",
  buttonAvail: false,
};

export default ErrorAlert;
