import * as React from "react";

const FooterHeader = ({
  negativeLabel,
  negativeAction,
  positiveAction,
  showPositive,
  positiveLabel,
}) => {
  return (
    <React.Fragment>
      <div
        className={
          "h-16 bg-gray-50 flex flex-row items-center justify-between px-4 border-t border-gray-100"
        }
      >
        <button
          onClick={negativeAction}
          type="button"
          className="relative inline-flex items-center px-4 py-3 rounded-none border border-red-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
        >
          <span className="sr-only">Previous</span>

          <span>{negativeLabel}</span>
        </button>
        <div className={"flex flex-row items-center"}>
          {showPositive && (
            <button
              onClick={positiveAction}
              type="submit"
              className="-ml-px relative inline-flex items-center px-3 py-3 rounded-none  bg-yellow-600 text-white text-sm font-medium hover:bg-yellow-800 focus:z-10 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <span className="sr-only">Next</span>

              <span>{positiveLabel}</span>
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

FooterHeader.defaultProps = {
  negativeLabel: "Cancel",
};

export default FooterHeader;
