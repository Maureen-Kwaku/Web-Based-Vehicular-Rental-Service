import { Fragment } from "react";
import { format } from "date-fns";
import cn from "classnames";
import ExternalLink from "../../../components/external-link";

const AdminCard = ({ data, view }) => {
  return (
    <Fragment>
      <tr>
        <td className="px-6 py-4 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
          <div className="flex items-center space-x-3 lg:pl-2">
            <ExternalLink
              href={
                data?.photo ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ah3lxr8uqw&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              className={"bg-gray-800 rounded-full"}
            >
              <img
                className="h-7 w-7 rounded-full"
                src={
                  data?.photo ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ah3lxr8uqw&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
                alt=""
              />
            </ExternalLink>
            <span>{data?.name || "N/A"}</span>
          </div>
        </td>
        <td className="px-6 py-3 text-sm text-gray-500 font-medium">
          {data?.email || "N/A"}
        </td>
        <td className="px-6 py-3 text-sm text-gray-500 font-medium">
          {data?.phone || "N/A"}
        </td>
        <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
          <span
            className={cn(
              "inline-flex items-center bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium"
            )}
          >
            Active
          </span>
        </td>
        <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
          {format(new Date(data?.createdAt), "MMMM dd, yyyy")}
        </td>
        <td className="pr-6">
          <div className=" flex justify-end items-center">
            <button
              onClick={view}
              id="project-options-menu-0"
              aria-haspopup="true"
              type="button"
              className="w-8 h-8 bg-white inline-flex items-center justify-center text-blue-400 rounded-full hover:text-blue-500 mx-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="sr-only">Open options</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
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
            </button>
            {/* <button
              id="project-options-menu-0"
              aria-haspopup="true"
              type="button"
              className="w-8 h-8 bg-white inline-flex items-center justify-center text-blue-400 rounded-full hover:text-blue-500 mx-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="sr-only">Open options</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button> */}
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default AdminCard;
