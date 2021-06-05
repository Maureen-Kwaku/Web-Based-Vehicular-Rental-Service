import * as React from "react";
import cn from "classnames";
import { ClassicSpinner } from "react-spinners-kit";

const ALL = "all";
const AVAILABLE = "available";
const RENTED = "rented";

const PFZRequests = ({ data, loading }) => {
  const [tab, setTab] = React.useState(ALL);
  return (
    <React.Fragment>
      <div className={"bg-white w-full p-4 h-full"}>
        <h1 className="text-2xl font-medium">Cars Count</h1>

        <div className={"mt-3"}>
          <Tabs tab={tab} setTab={setTab} />
        </div>

        <div className={"h-32 flex justify-center items-center w-full"}>
          <span className={"font-bold text-3xl"}>
            {loading && <ClassicSpinner size={15} color={"#000"} />}
            {tab === ALL
              ? data?.statistics?.cars
              : tab === AVAILABLE
              ? data?.statistics?.availableCars
              : data?.statistics?.rentedOutCars}
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

const Tabs = ({ setTab, tab: activeTab }) => {
  const getClassNameForSpan = (tab) =>
    cn(
      " group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm cursor-pointer",
      {
        "border-primary-500 text-primary-600": activeTab === tab,
        "border-transparent text-gray-500 hover:text-gray-700":
          activeTab !== tab,
      }
    );

  const getClassNameForSVG = (tab) =>
    cn("-ml-0.5 mr-2 h-5 w-5", {
      "text-primary-500": activeTab === tab,
      "text-gray-400 group-hover:text-gray-500": activeTab !== tab,
    });
  return (
    <React.Fragment>
      <div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <span
                onClick={() => setTab(ALL)}
                className={getClassNameForSpan(ALL)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={getClassNameForSVG(ALL)}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>

                <span>All</span>
              </span>
              <span
                onClick={() => setTab(AVAILABLE)}
                className={getClassNameForSpan(AVAILABLE)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={getClassNameForSVG(AVAILABLE)}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span>Available</span>
              </span>
              <span
                onClick={() => setTab(RENTED)}
                className={getClassNameForSpan(RENTED)}
                aria-current="page"
              >
                <svg
                  className={getClassNameForSVG(RENTED)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>

                <span>Rented</span>
              </span>
            </nav>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PFZRequests;
