import * as React from "react";
import cn from "classnames";
import { ClassicSpinner } from "react-spinners-kit";

const REQUESTED = "requested";
const PAID = "paid";
const ACCEPTED = "accepted";
const PICKEDUP = "pickedup";
const DROPPEDOFF = "droppedoff";
const CANCELLED = "cancelled";

const PFZRequests = ({ data, loading }) => {
  const [tab, setTab] = React.useState(REQUESTED);
  return (
    <React.Fragment>
      <div className={"bg-white w-full p-4 h-full"}>
        <h1 className="text-2xl font-medium">Rentals Count</h1>

        <div className={"mt-3"}>
          <Tabs tab={tab} setTab={setTab} />
        </div>

        <div className={"h-32 flex justify-center items-center w-full"}>
          <span className={"font-bold text-3xl"}>
            {loading && <ClassicSpinner size={15} color={"#000"} />}
            {tab === REQUESTED
              ? data?.statistics?.requestedRentals
              : tab === PAID
              ? data?.statistics?.paidRentals
              : tab === ACCEPTED
              ? data?.statistics?.acceptedRentals
              : tab === PICKEDUP
              ? data?.statistics?.pickedUpRentals
              : tab === DROPPEDOFF
              ? data?.statistics?.droppedOffRentals
              : data?.statistics?.cancelledRentals}
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

  return (
    <React.Fragment>
      <div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <span
                onClick={() => setTab(REQUESTED)}
                className={getClassNameForSpan(REQUESTED)}
              >
                <span>Requested</span>
              </span>
              <span
                onClick={() => setTab(PAID)}
                className={getClassNameForSpan(PAID)}
              >
                <span>Paid</span>
              </span>
              <span
                onClick={() => setTab(ACCEPTED)}
                className={getClassNameForSpan(ACCEPTED)}
                aria-current="page"
              >
                <span>Accepted</span>
              </span>
              <span
                onClick={() => setTab(PICKEDUP)}
                className={getClassNameForSpan(PICKEDUP)}
                aria-current="page"
              >
                <span>Picked Up</span>
              </span>
              <span
                onClick={() => setTab(DROPPEDOFF)}
                className={getClassNameForSpan(DROPPEDOFF)}
                aria-current="page"
              >
                <span>Dropped Off</span>
              </span>
              <span
                onClick={() => setTab(CANCELLED)}
                className={getClassNameForSpan(CANCELLED)}
                aria-current="page"
              >
                <span>Cancelled</span>
              </span>
            </nav>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PFZRequests;
