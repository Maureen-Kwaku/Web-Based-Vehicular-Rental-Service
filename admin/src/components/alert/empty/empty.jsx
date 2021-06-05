import * as React from "react";

const EmptyAlert = ({
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
          className={" h-40 w-40 text-primary-900"}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
          />
        </svg>
        <h1 className={"font-bold text-2xl text-center"}>{mainMessage}</h1>
        <span className={"text-center mt-5"}>{subMessage}</span>
        {buttonAvail && (
          <div className={"mt-2"}>
            <button
              onClick={buttonAction}
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-blue-900 shadow-sm text-sm font-medium rounded-none text-blue-900 bg-white hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1 sm:ml-3"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
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

EmptyAlert.defaultProps = {
  mainMessage: "Its lonely in here",
  buttonAvail: false,
};

export default EmptyAlert;
