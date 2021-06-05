import { Fragment } from "react";
import cn from "classnames";
// import { format } from "date-fns";

const AdminCard = ({ data, view, edit }) => {
  return (
    <Fragment>
      <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="flex-1 flex flex-col p-8">
          <div className={"relative "}>
            {data?.featured && (
              <div
                className={
                  "absolute right-0 rounded text-xs bg-yellow-600 text-white px-3 py-1"
                }
              >
                Featured
              </div>
            )}
            <img
              className="w-32 h-32 flex-shrink-0 mx-auto rounded-md"
              src={data?.images?.[0]}
              alt=""
            />
          </div>
          <h3 className="mt-6 text-gray-900 truncate text-sm font-medium">
            {data?.model} - {data?.plateNumber}
          </h3>
          <dl className="mt-1 flex-grow flex flex-col justify-between">
            <dt className="sr-only">Role</dt>
            <dd className="mt-1">
              <span
                className={cn("px-2 py-1  text-xs font-medium  rounded-full", {
                  "text-green-800 bg-green-100": data?.status === "Available",
                  "text-yellow-800 bg-yellow-100": data?.status === "Rented",
                })}
              >
                {data?.status}
              </span>
            </dd>
          </dl>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="-ml-px w-0 flex-1 flex">
              <button
                onClick={view}
                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>

                <span className="ml-3">View</span>
              </button>
              <button
                onClick={edit}
                className="relative w-0 border-l flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium  rounded-br-lg hover:text-gray-500"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>

                <span className="ml-3">Edit</span>
              </button>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default AdminCard;
